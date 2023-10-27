import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Grid } from '@mui/material';
import { PAGE_SIZE } from './components/common/constants';
import { fetchUsers } from './components/common/api';
import AdminTable from './components/AdminPanel/AdminTable';
import EditUserDialog from './components/AdminPanel/EditUserDialog';


import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data));
  }, []);

  const filteredUsers = users.filter((user) => (
    user.id.includes(searchText) ||
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.role.toLowerCase().includes(searchText.toLowerCase())
  ));

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + PAGE_SIZE);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const toggleSelect = (userId) => {
    if (selectedRows.includes(userId)) {
      setSelectedRows(selectedRows.filter((id) => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === paginatedUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedUsers.map((user) => user.id));
    }
  };

  const handleEditNameChange = (userId, newName) => {
    setUsers((prevUsers) => (
      prevUsers.map((user) => (user.id === userId ? { ...user, name: newName } : user))
    ));
  };

  const handleEdit = (userId) => {
    setEditUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setEditUser(userToEdit);
  };

  const handleSave = () => {
    // Save the changes (in memory)
    setEditUserId(null);
    setEditUser(null);
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
    setEditUser(null);
  };

  const deleteRow = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setSelectedRows((prevSelected) => prevSelected.filter((id) => id !== userId));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const deleteSelectedRows = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => !selectedRows.includes(user.id)));
    setSelectedRows([]);
  };

  return (
    <Container className='App'>
      <TextField
        variant="outlined"
        label="Search by name, email or role"
        fullWidth
        value={searchText}
        onChange={handleSearch}
      />
      <AdminTable
        users={paginatedUsers}
        selectedRows={selectedRows}
        toggleSelect={toggleSelect}
        editUserId={editUserId}
        handleEditNameChange={handleEditNameChange}
        handleEdit={handleEdit}
        handleSave={handleSave}
        handleCancelEdit={handleCancelEdit}
        deleteRow={deleteRow}
      />
      <Grid container marginTop="10px">
  <Grid item style={{ display: 'flex', alignItems: 'center' }}>
    <Button
      style={{ borderRadius: '20px', float: 'left', marginRight: "5px" }}
      variant="contained"
      color="secondary"
      onClick={deleteSelectedRows}
      disabled={selectedRows.length === 0}
    >
      Delete Selected
    </Button>
  </Grid>
  <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Button
      className='roundButtonStyle'
      variant="contained"
      style={{ borderRadius: 100, width: 40, height: 40, fontSize: "10px", marginRight: "5px" }}
      color="primary"
      onClick={() => handlePageChange(1)}
      startIcon={<FirstPageIcon />}
      disabled={currentPage === 1}
    />
    <Button
      variant="contained"
      color="primary"
      style={{ borderRadius: 100, width: 40, height: 40, marginRight: "5px" }}
      onClick={() => handlePageChange(currentPage - 1)}
      startIcon={<NavigateBeforeIcon />}
      disabled={currentPage === 1}
    />
    {[...Array(totalPages).keys()].map((page) => (
      <Button
        key={page + 1}
        variant="contained"
        color="primary"
        style={{ borderRadius: 100, width: 40, height: 40, marginRight: "5px" }}
        onClick={() => handlePageChange(page + 1)}
        disabled={currentPage === page + 1}
      >
        {page + 1}
      </Button>
    ))}
    <Button
      variant="contained"
      color="primary"
      style={{ padding: 0, borderRadius: 100, width: 40, height: 40, marginRight: "5px" }}
      onClick={() => handlePageChange(currentPage + 1)}
      startIcon={<NavigateNextIcon />}
      disabled={currentPage === totalPages}
    />
    <Button
      variant="contained"
      color="primary"
      style={{ borderRadius: 100, width: 40, height: 40, marginRight: "5px" }}
      onClick={() => handlePageChange(totalPages)}
      startIcon={<LastPageIcon />}
      disabled={currentPage === totalPages}
    />
  </Grid>
</Grid>

      <EditUserDialog
        open={!!editUser}
        onClose={() => setEditUser(null)}
        user={editUser || { id: '', name: '', email: '', role: '' }}
        handleEditNameChange={handleEditNameChange}
        handleSave={handleSave}
        handleCancelEdit={handleCancelEdit}
      />
    </Container>
  );
}

export default App;