import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from './../../constants/userConstants';
import Meta from '../../components/Helmet/Meta';

// Animation keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
`;

// Styled components
const Container = styled.div`
  opacity: ${props => props.fadeIn ? 1 : 0};
  transform: ${props => props.fadeIn ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.6s ease-out;
  margin-top: 120px;
`;

const underlineExpand = keyframes`
  0% {
    width: 0;
    left: 50%;
    right: 50%;
  }
  50% {
    width: 50%;  // Reduced from 100% to 60%
    left: 25%;   // Adjusted to maintain centering
    right: 21%;  // Adjusted to maintain centering
  }
  100% {
    width: 0;
    left: 50%;
    right: 50%;
  }
`;

const Header = styled.h1`
  font-weight: 700;
  color: #2c3e50;
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 30px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 3px;  // Slightly reduced height
    background: linear-gradient(90deg, #27ae60, #2ecc71);
    border-radius: 2px;
  }
`;

const BackButton = styled(Link)`
   background: linear-gradient(135deg, #6c757d, #495057);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  margin-bottom: 2rem;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    color: white;
  }
`;

const StyledForm = styled(Form)`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  margin-bottom: 50px;
  animation: ${props => props.shake ? shake : 'none'} 0.5s;
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled(Form.Label)`
  font-weight: 600;
  color: #34495e;
  margin-bottom: 0.5rem;
`;

const FormControl = styled(Form.Control)`
  border: 1px solid #dfe6e9;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #4b6cb7;
    box-shadow: 0 0 0 0.2rem rgba(75, 108, 183, 0.25);
  }
`;

const CheckboxLabel = styled(Form.Check.Label)`
  font-weight: 500;
  color: #2c3e50;
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.7;
  }
`;

const RequiredStar = styled.span`
  color: #e74c3c;
  margin-left: 0.2rem;
`;

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    const [fadeIn, setFadeIn] = useState(false);
    const [shake, setShake] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cropSelection, setCropSelection] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdate;

    useEffect(() => {
        setFadeIn(true);
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/admin/userList');
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setCropSelection(user.cropSelection);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, userId, dispatch, successUpdate, history]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name || !email) {
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }
        dispatch(updateUser({ _id: userId, name, email, cropSelection, isAdmin }));
    };

    return (
        <>
            <Meta title="AgroHub | Admin User Edit" />
            <Container fadeIn={fadeIn}>
                <FormContainer>
                    <Header>
                        Edit User
                    </Header>
                    <BackButton to='/admin/userList' className="my-2 text-decoration-none">
                        <i className="fas fa-arrow-left mr-2"></i> GO BACK
                    </BackButton>
                    
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                    
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <StyledForm onSubmit={submitHandler} shake={shake}>
                            <FormGroup controlId='name'>
                                <FormLabel>
                                    Name <RequiredStar>*</RequiredStar>
                                </FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup controlId='email'>
                                <FormLabel>
                                    Email Address / NIC <RequiredStar>*</RequiredStar>
                                </FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter email or NIC"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup controlId='cropSelection'>
                                <FormLabel>Crop Selection (optional)</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter crop"
                                    value={cropSelection}
                                    onChange={(e) => setCropSelection(e.target.value)}
                                />
                            </FormGroup>

                            <FormGroup controlId='isAdmin'>
                                <Form.Check
                                    type="checkbox"
                                    label={<CheckboxLabel>Is Admin</CheckboxLabel>}
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                />
                            </FormGroup>

                            <SubmitButton 
                                type="submit"
                                disabled={loadingUpdate}
                            >
                                {loadingUpdate ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                        Updating...
                                    </>
                                ) : (
                                    'Update User'
                                )}
                            </SubmitButton>
                        </StyledForm>
                    )}
                </FormContainer>
            </Container>
        </>
    );
};

export default UserEditScreen;