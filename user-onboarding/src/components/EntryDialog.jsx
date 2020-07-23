import React, { useState } from 'react';
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
import Yup from 'yup';
import PasswordStrengthBar from 'react-password-strength-bar';

const roles =['Lead', 'Designer', 'Front End', 'Back End'];

export default function EntryDialog (props) {
  const {isOpen, setIsOpen} = props,
        emptyValue = {name: '',
                      email: '',
                      password: '',
                      passwordScore: 0,
                      tosChecked: false},
        [entryValue, setEntryValue] = useState(emptyValue),
        [tosChecked, setTOSChecked] = useState(false);

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
    onClose();
  }

  function validate() {
    return entryValue.tosChecked && entryValue.passwordScore >= 3;
  }

  return (
    <Dialog open={isOpen} onClose={onClose} >
      <DialogTitle>{'User information'}</DialogTitle>
      <DialogContent>
        <TextField autoFocus
                   label='Name'
                   margin='normal'
                   onChange={(event) => processInput('name', event)}
                   required
                   value={entryValue.name}/>
        <Divider orientation='vertical' flexItem />
        <TextField label='Email address'
                   margin='normal'
                   onChange={(event) => processInput('email', event)}
                   required
                   type='email'
                   value={entryValue.email}/>
        <Divider orientation='vertical' flexItem />
        <TextField label={entryValue.passwordScore >= 3 ?
                          'Password' :
                          'Password (Too weak)'}
                   margin='normal'
                   onChange={(event) => processInput('password', event)}
                   required
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

//  LocalWords:  TeamMember tosChecked
