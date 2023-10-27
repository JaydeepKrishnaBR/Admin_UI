import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Checkbox, Button, TextField } from '@mui/material';
import UserRow from './UserRow';

const AdminTable = ({ users, selectedRows, toggleSelect, editUserId, handleEditNameChange, handleEdit, handleSave, handleCancelEdit, deleteRow }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              size="small"
              checked={selectedRows.length === users.length}
              onChange={toggleSelect}
            />
          </TableCell>
          <TableCell><b>Name</b></TableCell>
          <TableCell><b>Email</b></TableCell>
          <TableCell><b>Role</b></TableCell>
          <TableCell><b>Action</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            selectedRows={selectedRows}
            toggleSelect={() => toggleSelect(user.id)}
            editUserId={editUserId}
            handleEditNameChange={handleEditNameChange}
            handleEdit={() => handleEdit(user.id)}
            handleSave={() => handleSave(user.id)}
            handleCancelEdit={handleCancelEdit}
            deleteRow={() => deleteRow(user.id)}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminTable;