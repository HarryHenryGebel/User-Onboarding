import React, { useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import './App.css';
import 'fontsource-roboto';

import Topbar from './components/Topbar';
import RegistrationCard from './components/RegistrationCard';
import requester from 'easier-requests';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

requester.setOptions({throwOnFailure: true});

export default function App() {
  const [registationData, setRegistationData] = useState([]);

  function addRegistationData(newData) {
    setRegistationData([...registationData, newData]);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={{height: "100vh"}}>
        <Topbar addRegistationData={addRegistationData}/>
        {(registationData ? registationData.map(
          (registation) => <RegistrationCard registation={registation}/>) :
          null)}
      </Paper>
    </ThemeProvider>
  );
}

//  LocalWords:  Topbar MembersDisplay roboto
