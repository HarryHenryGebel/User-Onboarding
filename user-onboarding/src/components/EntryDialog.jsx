import React, { useState, useEffect } from 'react';
import { Button,
         Checkbox,
         Dialog,
         DialogActions,
         DialogContent,
         DialogTitle,
         Divider,
         FormControlLabel,
         TextField,
         Typography} from '@material-ui/core';
import * as yup from 'yup';
import PasswordStrengthBar from 'react-password-strength-bar';
import requester from 'easier-requests';

import RegistrationData from '../RegistrationData';

const emptyErrors = {}; // having a specific empty object makes for
                        // easier logical operations

// We validate the password with a specialized component that is
// better quality than the one built into yup. The checkbox is very
// simple and validates itself
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Required'),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Required")
});

// The dialog always exists, it just changes between visible and
// invisible depending on whether or not it is open.
export default function EntryDialog (props) {
  const {isOpen, setIsOpen, addRegistationData} = props,
        emptyValue = {name: '',
                      email: '',
                      password: '',
                      passwordScore: 0,
                      tosChecked: false},
        [entryValue, setEntryValue] = useState(emptyValue),
        [validationErrors, setValidationErrors] = useState({});

  // Ei! Liewer Gott Im Himmel! Completely unnecessary asynchronicity!
  useEffect(() => {
    validationSchema.validate(entryValue, {abortEarly: false})
      .then((response) => {
        setValidationErrors(emptyErrors);
      })
      .catch((error) => {
        // build an object with any error messages for each field
        const errors = {};
        error.inner.forEach((error) => errors[error.path] = error.message);
        setValidationErrors(errors);
      });
  }, [entryValue]);

  function onClose() {
    setIsOpen(false);
    setEntryValue(emptyValue);
  }

  // process TOS Checkbox
  function processCheck(event) {
    setEntryValue({...entryValue, tosChecked: event.target.checked});
  }

  // Process text fields
  function processInput(field, event) {
    setEntryValue({...entryValue, [field]: event.target.value});
  }

  // process strength analysis results from password strength bar component
  function processScore(score) {
    // must be at least 3 to validate
    setEntryValue({...entryValue, passwordScore: score});
  }

  // process submit button
  function submit() {
    // creating an instance strips properties that aren't relevant to
    // storage
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
    // start POST request then close dialog
    _submit();
    onClose();
  }

  // called by the submit button to determine if it should enable itself
  function validate() {
    return entryValue.tosChecked &&
      entryValue.passwordScore >= 3 &&
      validationErrors === emptyErrors;
  }

  // all labels check validation and adjust their text for any
  // validation errors
  return (
    <Dialog open={isOpen} onClose={onClose} >
      <DialogTitle>{'User information'}</DialogTitle>
      <DialogContent>
        <TextField autoFocus
                   id="name-field"
                   label={"name" in validationErrors ?
                          `Name (${validationErrors.name})` :
                          'Name'}
                   margin='normal'
                   onChange={(event) => processInput('name', event)}
                   value={entryValue.name}/>
        <Divider orientation='vertical' flexItem />
        <TextField id="email-field"
                   label={"email" in validationErrors ?
                          `Email (${validationErrors.email})` :
                          'Email'}
                   margin='normal'
                   onChange={(event) => processInput('email', event)}
                   type='email'
                   value={entryValue.email}/>
        <Divider orientation='vertical' flexItem />
        <TextField id="password-field"
                   label={entryValue.passwordScore >= 3 ?
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
                             id="tos-checkbox"
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
        <Button id="submit-button" disabled={!validate()} onClick={submit} >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

//  LocalWords:  TeamMember tosChecked RegistrationData nameField
