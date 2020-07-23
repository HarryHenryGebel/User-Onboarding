import React from 'react';
import {Card, CardContent, Typography} from  '@material-ui/core';

export default function RegistrationCard (props) {
  const {registation} = props;

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>Name: {registation.name}</Typography>
        <Typography>Email: {registation.email}</Typography>
        <Typography>Password: {registation.password}</Typography>
        <Typography>Agreed To TOS: {registation.tosAccepted}</Typography>
        <Typography>Registration Date: {registation.since}</Typography>
      </CardContent>
    </Card>);
}
