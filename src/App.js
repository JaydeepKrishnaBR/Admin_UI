import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import "./App.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  

  useEffect(() => {
    // Fetch user data from the API
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const filteredUsers = users.filter((user) => {
    return (
      user.id.includes(searchText) ||
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.role.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

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

  const deleteSelectedRows = () => {
    if (selectedRows.length === 1) {
      const updatedUsers = users.filter((user) => user.id !== selectedRows[0]);
      setUsers(updatedUsers);
      setSelectedRows([]);
    }
  };

  const deleteAllSelectedRows = () => {
    if (selectedRows.length === 0) {
      return;
    }
  
    const updatedUsers = users.filter((user) => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setSelectedRows([]); 
  };
  

  const selectAllRows = () => {
    if (selectedRows.length === filteredUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredUsers.map((user) => user.id));
    }
  };

  const getPaginatedUsers = () => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  };

  const handleEditNameChange = (userId, newName) => {
    // Create a copy of the users array with the updated name
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        return { ...user, name: newName };
      }
      return user;
    });
  
    // Update the state with the new user data
    setUsers(updatedUsers);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleEdit = (userId) => {
    setEditUserId(userId);
  };

  const handleSave = (userId) => {
    // Implement code to save edited data to your data source
    // For this example, we'll just exit edit mode
    setEditUserId(null);
  };

  const handleCancelEdit = () => {
    setEditUserId(null);
  };

  return (
    <div className='allItems'>
      <TextField
        size="small"
        variant="outlined"
        label="Search by name, email or role"
        placeholder='Search by name, email or role'
        fullWidth
        value={searchText}
        onChange={handleSearch}
      />
      <TableContainer>
        <Table className='table'>
          <TableHead>
            <TableRow>
              <TableCell size="small">
                <Checkbox
                  size="small"
                  className='checkBox'
                  checked={selectedRows.length === filteredUsers.length}
                  onChange={selectAllRows}
                />
              </TableCell>
              <TableCell className='tableHead' size="small"><b>Name</b></TableCell>
              <TableCell className='tableHead' size="small"><b>Email</b></TableCell>
              <TableCell className='tableHead' size="small"><b>Role</b></TableCell>
              <TableCell className='tableHead' size="small"><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getPaginatedUsers().map((user) => (
              <TableRow key={user.id}>
                <TableCell size="small">
                  <Checkbox
                    size="small"
                    className='checkBox'
                    checked={selectedRows.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                  />
                </TableCell>
                <TableCell size="small">
                  {editUserId === user.id ? (
                    <TextField
                      value={user.name}
                      onChange={(e) => handleEditNameChange(user.id, e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell size="small">{user.email}</TableCell>
                <TableCell size="small">{user.role}</TableCell>
                <TableCell size="small">
                  {editUserId === user.id ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSave(user.id)}
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
                    <Button
                      size="small"
                      startIcon={<EditOutlinedIcon />}
                      color='primary'
                      onClick={() => handleEdit(user.id)}
                      // disabled={!selectedRows.includes(user.id)}
                    >
                    </Button>
                  )}
                  <Button
                    size="small"
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    color='secondary'
                    onClick={() => deleteSelectedRows(user.id)}
                    // disabled={!selectedRows.includes(user.id)}
                  >
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
      <div className="left-buttons"> 
        <Button
          className='deleteAllButton'
          style={{borderRadius: '20px', float: 'left'}}
          variant="contained"
          color="secondary"
          onClick={() => deleteAllSelectedRows()}
          // disabled={selectedRows.length <= 1}
        >
          Delete Selected
        </Button>
      </div>
      <div className="center-buttons" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {/* First Page and Previous Page */}
        <Button
        variant='contained'
        color='primary'
        style={{ borderRadius: "100px", marginRight: "5px" }}
        onClick={() => handlePageChange(1)}
        startIcon={<FirstPageIcon />}
        disabled={currentPage === 1}
        />
        <Button
        variant='contained'
        color='primary'
        style={{ borderRadius: "100px", width: "40px", height: "40px", marginRight: "5px" }}
        onClick={() => handlePageChange(currentPage - 1)}
        startIcon={<NavigateBeforeIcon />}
        disabled={currentPage === 1}
        />

        {/* Page Numbers */}
        {[...Array(totalPages).keys()].map((page) => (
        <Button
        variant='contained'
        color='primary'
        style={{ padding: "0px", borderRadius: "100px", width: "40px", height: "40px", marginRight: "5px" }}
        key={page + 1}
        onClick={() => handlePageChange(page + 1)}
        disabled={currentPage === page + 1}
        >
          {page + 1}
        </Button>
        ))}

        {/* Next Page and Last Page */}
        <Button
        variant='contained'
        color='primary'
        style={{ borderRadius: "100px", width: "40px", height: "40px", marginRight: "5px" }}
        onClick={() => handlePageChange(currentPage + 1)}
        startIcon={<NavigateNextIcon />}
        disabled={currentPage === totalPages}
        ></Button>
        <Button
        variant='contained'
        color='primary'
        style={{ borderRadius: "100px", width: "40px", height: "40px" }}
        onClick={() => handlePageChange(totalPages)}
        startIcon={<LastPageIcon />}
        disabled={currentPage === totalPages}
        ></Button>
      </div>
    </div>
  </div>
  );
};

export default AdminPanel;
