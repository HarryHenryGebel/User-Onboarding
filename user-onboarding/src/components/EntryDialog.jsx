import React, { useState, useEffect } from 'react';
import { Button,
         Checkbox,
         Dialog,
         DialogActions,
         DialogContent,
         DialogTitle,
         Divider,
         FormControlLabel,
         InputLabel,
         MenuItem,
         Select,
         TextField,
         Typography} from '@material-ui/core';
import * as yup from 'yup';
import PasswordStrengthBar from 'react-password-strength-bar';
import requester from 'easier-requests';

import RegistrationData from '../RegistrationData';

const roles =['Lead', 'Designer', 'Front End', 'Back End'];
const emptyErrors = {}; // having a specific empty object makes for
                        // easier logical operations

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Required'),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Required")
});

export default function EntryDialog (props) {
  const {isOpen, setIsOpen, addRegistationData} = props,
        emptyValue = {name: '',
                      email: '',
                      password: '',
                      passwordScore: 0,
                      tosChecked: false},
        [entryValue, setEntryValue] = useState(emptyValue),
        [tosChecked, setTOSChecked] = useState(false),
        [validationErrors, setValidationErrors] = useState({});

  // Ei! Liewer Gott Im Himmel!
  useEffect(() => {
    validationSchema.validate(entryValue, {abortEarly: false})
      .then((response) => {
        if (validationErrors) // don't trigger a rerender for no reason
          setValidationErrors(emptyErrors);
      })
      .catch((error) => {
        const errors = {};
        error.inner.forEach((error) => errors[error.path] = error.message);
        setValidationErrors(errors);
      });
  }, [entryValue]);

  function onClose() {
    setIsOpen(false);
    setEntryValue(emptyValue);
  }

  function processCheck(event) {
    setEntryValue({...entryValue, tosChecked: event.target.checked});
  }

  function processInput(field, event) {
    setEntryValue({...entryValue, [field]: event.target.value});
  }

  function processScore(score) {
    // must be at least 3 to validate
    setEntryValue({...entryValue, passwordScore: score});
  }

  function submit() {
    const registationData = new RegistrationData(entryValue);

    async function _submit() {
      try {
        const id = requester.createUniqueID();
        await requester.post('https://reqres.in/api/users',
                             id,
                             registationData);
        const response = requester.response(id).data;
        const finalData = new RegistrationData(response);
        addRegistationData(finalData);
      } catch (error) {
        console.log(error);
        throw error;
      }

    }
    _submit();
    onClose();
  }

  function validate() {
    return entryValue.tosChecked &&
      entryValue.passwordScore >= 3 &&
      validationErrors === emptyErrors;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} >
      <DialogTitle>{'User information'}</DialogTitle>
      <DialogContent>
        <TextField autoFocus
                   label={"name" in validationErrors ?
                          `Name (${validationErrors.name})` :
                          'Name'}
                   margin='normal'
                   onChange={(event) => processInput('name', event)}
                   value={entryValue.name}/>
        <Divider orientation='vertical' flexItem />
        <TextField label={"email" in validationErrors ?
                          `Email (${validationErrors.email})` :
                          'Email'}
                   margin='normal'
                   onChange={(event) => processInput('email', event)}
                   type='email'
                   value={entryValue.email}/>
        <Divider orientation='vertical' flexItem />
        <TextField label={entryValue.passwordScore >= 3 ?
                          'Password' :
                          'Password (Too weak)'}
                   margin='normal'
                   onChange={(event) => processInput('password', event)}
                   type='password'
                   value={entryValue.password}/>
        <PasswordStrengthBar password={entryValue.password}
                             onChangeScore={processScore}/>
        <Divider orientation='vertical' flexItem />
        <FormControlLabel
          control={<Checkbox checked={entryValue.tosChecked}
                             color="primary"
                             onChange={
                               (event) => processCheck(event)}
                             name="tosChecked" />}
          label="I have read the Terms of Service."/>
        {!entryValue.tosChecked ?
         (<Typography color="secondary">Resistance is useless.</Typography>)
         : <Typography>Glad to be of service.</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!validate()} onClick={submit} >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

//  LocalWords:  TeamMember tosChecked RegistrationData
