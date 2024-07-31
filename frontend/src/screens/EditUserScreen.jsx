import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import { useEditUserMutation, useListUsersQuery } from '../slices/adminApiSlice'; 
import { Form, Button } from 'react-bootstrap';       
import Loader from '../components/Loader'; 
import Message from '../components/Message'; 

const EditUserScreen = () => { 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const { data: user, isLoading, isError, error } = useListUsersQuery(); 
  const [editUser, { isLoading: isEditing }] = useEditUserMutation(); 

  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => { 
    if (user) { 
      const currentUser = user.find(user => user._id === id); 
      if (currentUser) { 
        setName(currentUser.name); 
        setEmail(currentUser.email); 
        setIsAdmin(currentUser.isAdmin); 
      } 
    } 
  }, [user, id]); 

  const submitHandler = async (e) => { 
    e.preventDefault(); 
    try { 
      await editUser({ id, data: { name, email, isAdmin } }).unwrap(); 
      navigate('/admin/dashboard'); 
    } catch (err) { 
      console.error(err); 
    } 
  }; 

  return ( 
    <> 
      <h1>Edit User</h1> 
      {isLoading || isEditing ? ( 
        <Loader /> 
      ) : isError ? ( 
        <Message variant='danger'>{error?.data?.message || 'An error occurred'}</Message> 
      ) : ( 
        <Form onSubmit={submitHandler}> 
          <Form.Group controlId='name'> 
            <Form.Label>Name</Form.Label> 
            <Form.Control 
              type='text' 
              placeholder='Enter name' 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            /> 
          </Form.Group> 
          <Form.Group controlId='email'> 
            <Form.Label>Email</Form.Label> 
            <Form.Control 
              type='email' 
              placeholder='Enter email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            /> 
          </Form.Group> 
          <Form.Group controlId='isAdmin'> 
            <Form.Check 
              type='checkbox' 
              label='Is Admin' 
              checked={isAdmin} 
              onChange={(e) => setIsAdmin(e.target.checked)} 
            /> 
          </Form.Group> 
          <Button type='submit' variant='primary'>Update</Button> 
        </Form> 
      )} 
    </> 
  ); 
};

export default EditUserScreen;
