import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message/Message'
import Loader from '../Loader/Loader'
import FormContainer from '../FormContainer/FormContainer'
import { register } from '../../actions/userActions'
import Meta from '../Helmet/Meta'
import { FaUser, FaEnvelope, FaKey, FaTractor, FaShoppingBasket, FaUserShield, FaUserPlus } from 'react-icons/fa'
import styled, { keyframes } from 'styled-components'

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`

// Styled Components
const PageWrapper = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f1fe 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const FullPageContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  background: white;
  border-radius: 15px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 800px;
  margin-top: 5rem;
`

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: 0.5rem;
    color: #4facfe;
    font-size: 1.5rem;
  }
`

const ErrorMessage = styled(Message)`
  animation: ${pulse} 0.5s ease;
  max-width: 600px;
  margin: 0 auto 2rem auto;
`

const RoleOption = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  cursor: pointer;
  background: ${props => props.active ? '#e9f7fe' : 'transparent'};
  border: 1px solid ${props => props.active ? '#4facfe' : '#ddd'};
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;
    color: ${props => props.active ? '#4facfe' : '#6c757d'};
  }
`
const buttonGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(79, 172, 254, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(79, 172, 254, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 172, 254, 0); }
`

const SubmitButton = styled(Button)`
   width: 100%;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(0,0,0,0.15);
    animation: ${buttonGlow} 1.5s infinite;
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    background: #6c757d;
    transform: none;
    box-shadow: none;
    animation: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
    transition: all 0.3s ease;
    opacity: 0;
  }
  
  &:hover::after {
    opacity: 1;
  }
`

const Register = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Farmer')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [address, setAddress] = useState('')
    const [phonenumber, setPhone] = useState('')

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password, role, address, phonenumber))
        }
    }

    return (
        <PageWrapper>
            <FullPageContainer>
                <Meta title="Agrohub | Register" />
                
                <Title>
                    <FaUserPlus /> Sign Up
                </Title>

                {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='name' className="mb-3">
                                <Form.Label>Name <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='email' className="mb-3">
                                <Form.Label>Email Address <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='role' className="mb-3">
                                <Form.Label>Role <span style={{ color: 'red' }}>*</span></Form.Label>
                                <RoleOption 
                                    active={role === 'Farmer'} 
                                    onClick={() => setRole('Farmer')}
                                >
                                    <FaTractor /> Farmer
                                </RoleOption>
                                <RoleOption 
                                    active={role === 'Consumer'} 
                                    onClick={() => setRole('Consumer')}
                                >
                                    <FaShoppingBasket /> Consumer
                                </RoleOption>
                                <RoleOption 
                                    active={role === 'Supplier'} 
                                    onClick={() => setRole('Supplier')}
                                >
                                    <FaUserShield /> Supplier
                                </RoleOption>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='password' className="mb-3">
                                <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='confirmPassword' className="mb-3">
                                <Form.Label>Confirm Password <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='address' className="mb-3">
                                <Form.Label>Address<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Address (city)"
                                    value={address}
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='phone' className="mb-3">
                                <Form.Label>Phone number<span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Phone number"
                                    value={phonenumber}
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Group>

                            <SubmitButton 
                                type="submit" 
                                variant="primary" 
                                className="w-100 mt-3"
                            >
                                Register
                            </SubmitButton>

                            <div className="text-center mt-3">
                                <span>Have an Account? </span>
                                <Link 
                                    to={redirect ? `/login?redirect=${redirect}` : '/login'} 
                                    className="text-primary"
                                >
                                    Login
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </FullPageContainer>
        </PageWrapper>
    )
}

export default Register