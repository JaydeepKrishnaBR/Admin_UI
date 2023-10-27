import React from 'react';
import { TableRow, TableCell, Checkbox, Button, TextField } from '@mui/material';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const UserRow = ({ user, selectedRows, toggleSelect, editUserId, handleEditNameChange, handleEdit, handleSave, handleCancelEdit, deleteRow }) => {
  const isSelected = selectedRows.includes(user.id);

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          size="small"
          checked={isSelected}
          onChange={toggleSelect}
        />
      </TableCell>
      <TableCell>
        {editUserId === user.id ? (
          <TextField
            value={user.name}
            onChange={(e) => handleEditNameChange(user.id, e.target.value)}
          />
        ) : (
          user.name
        )}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        {editUserId === user.id ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="default"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              color='primary'
              startIcon={<EditOutlinedIcon />}
              onClick={handleEdit}
            />
            <Button
              size="small"
              color='secondary'
              startIcon={<DeleteOutlineOutlinedIcon />}
              onClick={deleteRow}
            />
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserRow;
