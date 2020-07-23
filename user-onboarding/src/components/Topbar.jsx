import React, { useState } from 'react';
import { AppBar,
         IconButton,
         Toolbar,
         Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import EntryDialog from './EntryDialog';

export default function Topbar (props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false),
        {addRegistationData} = props;


  return(
    <AppBar position="sticky">
          <Toolbar>
            <IconButton onClick={() => setIsDialogOpen(true)}>
              <AddIcon/>
            </IconButton>
            <EntryDialog isOpen={isDialogOpen}
                         setIsOpen={setIsDialogOpen}
                         addRegistationData={addRegistationData}/>
            <Typography variant="h6">
              Vogon Personnel Database New User Registration
            </Typography>
          </Toolbar>
    </AppBar>
  );
}

//  LocalWords:  AddCircleOutlineOutlined EntryDialog
