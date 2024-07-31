import React, { useState } from 'react'; // Import useState for managing search input
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form } from 'react-bootstrap'; // Import Form for search input
import { useListUsersQuery, useDeleteUserMutation } from '../slices/adminApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Swal from 'sweetalert2'; // Import SweetAlert2

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  const { data: users = [], isLoading, isError, error } = useListUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  // Filter users based on the search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteHandler = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id).unwrap(); // Make sure to handle any errors if needed
        Swal.fire(
          'Deleted!',
          'The user has been deleted.',
          'success'
        );
      } catch (err) {
        Swal.fire(
          'Error!',
          'There was a problem deleting the user.',
          'error'
        );
      }
    }
  };

  const createUserHandler = () => {
    navigate('/admin/user/create');
  };

  const editUserHandler = (id) => {
    navigate(`/admin/user/edit/${id}`);
  };

  return (
    <>
      <h1>Users</h1>
      <Button className='my-3' onClick={createUserHandler}>
        <i className='fas fa-plus'></i> Create User
      </Button>

      {/* Search Input */}
      <Form className='my-3'>
        <Form.Group controlId='search'>
          <Form.Control
            type='text'
            placeholder='Search users...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
        </Form.Group>
      </Form>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{error?.data?.message || 'An error occurred'}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  <Button
                    variant='warning'
                    className='btn-sm me-5'
                    onClick={() => editUserHandler(user._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default DashboardScreen;
