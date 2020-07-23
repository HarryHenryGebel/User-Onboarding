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
                      passwordScore: '',
                      tosChecked: false},
        [entryValue, setEntryValue] = useState(emptyValue),
        [tosChecked, setTOSChecked] = useState(false);

  function onClose() {
    setIsOpen(false);
    setEntryValue(emptyValue);
  }

  function processCheck(event) {
    debugger;
    setEntryValue({...entryValue, tosChecked: event.target.checked});
  }

  function processInput(field, event) {
    setEntryValue({...entryValue, [field]: event.target.value});
  }

  function submit() {
    onClose();
  }

  return (
    <Dialog open={isOpen} onClose={onClose} >
      <DialogTitle>{'New user registration'}</DialogTitle>
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
        <TextField label='Password'
                   margin='normal'
                   onChange={(event) => processInput('password', event)}
                   required
                   type='password'
                   value={entryValue.password}/>
        <PasswordStrengthBar password={entryValue.password}
                             onChange={processCheck}/>
        <Divider orientation='vertical' flexItem />
        <FormControlLabel
          control={<Checkbox checked={entryValue.tosChecked}
                             color="primary"
                             onChange={
                               (event) => processCheck(event)}
                             name="tosChecked" />}
          label="I have read the Terms of Service.ppp"/>
        <Typography />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={submit} >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

//  LocalWords:  TeamMember
