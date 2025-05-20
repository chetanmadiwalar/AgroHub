import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Message/Message'
import Loader from '../Loader/Loader'
import FormContainer from '../FormContainer/FormContainer'
import { login } from '../../actions/userActions'
import Meta from '../Helmet/Meta'
import { FaUserShield, FaTractor, FaShoppingBasket, FaSignInAlt, FaUserCog } from 'react-icons/fa'
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

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
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

const StyledForm = styled(Form)`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  transition: all 0.3s ease;
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

const RoleCard = styled.div`
  background: ${props => props.active ? 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' : '#fff'};
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin: 0 5px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 5px 15px rgba(0,0,0,0.1)' : '0 2px 5px rgba(0,0,0,0.05)'};
  flex: 1;
  min-width: 100px;
  max-width: 150px; /* Limits maximum width of cards */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    animation: ${bounce} 0.5s ease;
  }

  @media (max-width: 768px) {
    padding: 10px;
    min-width: 80px;
    max-width: 120px;
  }

  @media (max-width: 576px) {
    padding: 8px;
    min-width: 70px;
    max-width: 100px;
    font-size: 0.9rem;
  }
`


const RoleIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: ${props => props.active ? '#4facfe' : '#6c757d'};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 576px) {
    font-size: 1.1rem;
  }
`

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: 0.5rem;
    color: #4facfe;
  }
`

const ErrorMessage = styled(Message)`
  animation: ${pulse} 0.5s ease;
  max-width: 600px;
  margin: 0 auto 1.5rem auto;
`

const RoleErrorMessage = styled(Message)`
  max-width: 600px;
  margin: 0 auto 1.5rem auto;
  background-color: #fff3cd;
  border-color: #ffeeba;
`

const RolesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 10px;
  flex-wrap: wrap; /* Allows cards to wrap on smaller screens */

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 576px) {
    gap: 5px;
  }
`

const LoginComponent = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState(null)
  const [roleError, setRoleError] = useState(null)

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, userInfo, error } = userLogin

  const queryParams = new URLSearchParams(location.search)
  const redirect = queryParams.get('redirect') || '/'

  const handleRoleClick = (role) => {
    setSelectedRole(role)
    setRoleError(null)
    history.replace(`/login?redirect=${role.toLowerCase()}`)
  }

  useEffect(() => {
    if (redirect && ['farmer', 'consumer', 'supplier', 'admin'].includes(redirect.toLowerCase())) {
      setSelectedRole(redirect)
    }
  }, [redirect])

  useEffect(() => {
    if (userInfo && !error) {
      if (redirect && userInfo.role.toLowerCase() !== redirect.toLowerCase()) {
        setRoleError(`You are registered as a ${userInfo.role}. Please login with the correct account type.`)
        return
      }
      
      if (userInfo.role === 'Farmer') {
        history.push('/farmer')
      } else if (userInfo.role === 'Consumer') {
        history.push('/consumer')
      } else if (userInfo.role === 'Supplier') {
        history.push('/supplier')
      } else if (userInfo.role === 'Admin') {
        history.push('/admin/dashboard')
      } else {
        history.push(redirect)
      }
    }
  }, [userInfo, error, history, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!selectedRole) {
      setRoleError('Please select your account type')
      return
    }
    dispatch(login(email.toLowerCase(), password))
  }

  return (
    <PageWrapper>
      <FullPageContainer>
        <Meta title="Agrohub | Sign In" />
        
        <Title>
          <FaSignInAlt /> Sign In
        </Title>

        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {roleError && <RoleErrorMessage variant='warning'>{roleError}</RoleErrorMessage>}
        {loading && <Loader />}

        <RolesContainer>
          <RoleCard 
            active={selectedRole === 'farmer'}
            onClick={() => handleRoleClick('farmer')}
          >
            <RoleIcon active={selectedRole === 'farmer'}>
              <FaTractor />
            </RoleIcon>
            <div>Farmer</div>
          </RoleCard>
          <RoleCard 
            active={selectedRole === 'consumer'}
            onClick={() => handleRoleClick('consumer')}
          >
            <RoleIcon active={selectedRole === 'consumer'}>
              <FaShoppingBasket />
            </RoleIcon>
            <div>Consumer</div>
          </RoleCard>
          <RoleCard 
            active={selectedRole === 'supplier'}
            onClick={() => handleRoleClick('supplier')}
          >
            <RoleIcon active={selectedRole === 'supplier'}>
              <FaUserShield />
            </RoleIcon>
            <div>Supplier</div>
          </RoleCard>
          <RoleCard 
            active={selectedRole === 'admin'}
            onClick={() => handleRoleClick('admin')}
          >
            <RoleIcon active={selectedRole === 'admin'}>
              <FaUserCog />
            </RoleIcon>
            <div>Admin</div>
          </RoleCard>
        </RolesContainer>

        {selectedRole && (
          <p className="text-center text-muted small mb-3">
            You'll be redirected to the {selectedRole === 'admin' ? 'Admin dashboard' : `${selectedRole} dashboard`} after login
          </p>
        )}

        <StyledForm onSubmit={submitHandler}>
          <Form.Group controlId='email' className="mb-3">
            <Form.Label>Email Address <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="py-2"
            />
          </Form.Group>

          <Form.Group controlId='password' className="mb-4">
            <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="py-2"
            />
          </Form.Group>

          <SubmitButton 
            type="submit" 
            variant="primary" 
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </SubmitButton>

          <Row className='py-3'>
            <Col className="text-center">
              <p className="mb-1">New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary">Register here</Link></p>
            </Col>
          </Row>
        </StyledForm>
      </FullPageContainer>
    </PageWrapper>
  )
}

export default LoginComponent
