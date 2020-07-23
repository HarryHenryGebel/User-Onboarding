import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import './App.css';
import 'fontsource-roboto';

import Topbar from './components/Topbar';
import requester from 'easier-requests';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

requester.setOptions({throwOnFailure: true});

export default function App() {
  const [teamMembers, setTeamMembers] = useState([]);

  // function addTeamMember(newMember) {
  //   setTeamMembers([...teamMembers, newMember]);
  // }

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={{height: "100vh"}}>
        <Topbar />
      </Paper>
    </ThemeProvider>
  );
}

//  LocalWords:  Topbar MembersDisplay roboto
