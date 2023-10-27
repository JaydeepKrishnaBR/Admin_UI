import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditUserDialog = ({ open, onClose, user, handleEditNameChange, handleSave, handleCancelEdit }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={user.name}
          onChange={(e) => handleEditNameChange(user.id, e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
        <Button onClick={handleCancelEdit} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;