import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { useAdminLoginMutation } from '../slices/adminApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading: userLoading }] = useLoginMutation();
  const [adminLogin, { isLoading: adminLoading }] = useAdminLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(isAdminLogin ? '/admin/dashboard' : '/');
    }
  }, [navigate, userInfo, isAdminLogin]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = isAdminLogin
        ? await adminLogin({ email, password }).unwrap()
        : await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(isAdminLogin ? '/admin/dashboard' : '/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const toggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin);
  };

  return (
    <FormContainer>
      <h1>{isAdminLogin ? 'Admin Sign In' : 'Sign In'}</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={userLoading || adminLoading}
          type='submit'
          variant='primary'
          className='mt-3'
        >
          {isAdminLogin ? 'Admin Sign In' : 'Sign In'}
        </Button>
      </Form>

      {(userLoading || adminLoading) && <Loader />}

      <Row className='py-3'>
        <Col className='d-flex justify-content-between'>
          {!isAdminLogin && (
            <Link to='/register'>
              New Customer? Register
            </Link>
          )}
          <Button variant='link' onClick={toggleAdminLogin}>
            {isAdminLogin ? 'User Sign In' : 'Admin Sign In'}
          </Button>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
