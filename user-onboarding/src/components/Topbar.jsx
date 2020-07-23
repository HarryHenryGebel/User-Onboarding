import React, { useState } from 'react';
import { AppBar,
         IconButton,
         Toolbar,
         Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import EntryDialog from './EntryDialog';

export default function Topbar (props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  return(
    <AppBar position="sticky">
          <Toolbar>
            <IconButton onClick={() => setIsDialogOpen(true)}>
              <AddIcon/>
            </IconButton>
            <EntryDialog isOpen={isDialogOpen}
                         setIsOpen={setIsDialogOpen}/>
            <Typography variant="h6">New User Registration</Typography>
          </Toolbar>
    </AppBar>
  );
}

//  LocalWords:  AddCircleOutlineOutlined EntryDialog
