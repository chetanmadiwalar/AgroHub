import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaShoppingCart, FaTruck, FaCreditCard } from 'react-icons/fa';
import FormContainer from '../../components/FormContainer/FormContainer';
import { saveShippingAddress } from './../../actions/cartActions.js';
import Meta from '../../components/Helmet/Meta';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
  100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
`;

const underlinePulse = keyframes`
  0% {
    transform: translateX(-50%) scaleX(0.1);
  }
  50% {
    transform: translateX(-50%) scaleX(1);
  }
  100% {
    transform: translateX(-50%) scaleX(0.1);
  }
`;

const stepPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Styled components
const AnimatedFormContainer = styled(FormContainer)`
  animation: ${fadeIn} 0.6s ease-out forwards;
`;

const StyledForm = styled(Form)`
  background: #ffffff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const StyledButton = styled(Button)`
  background: #28a745;
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  margin-top: 1rem;
  border-radius: 50px;

  &:hover {
    background: #218838;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const RequiredStar = styled.span`
  color: #ff4757;
  margin-left: 3px;
`;

const FormLabel = styled(Form.Label)`
  font-weight: 500;
  color: #555;
  margin-bottom: 0.5rem;
  display: block;
`;

const FormControl = styled(Form.Control)`
  border-radius: 8px;
  padding: 12px 15px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;

  &:focus {
    border-color: #28a745;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
  }
`;

const PageContainer = styled.div`
  margin-top: 90px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: calc(100vh - 100px);
  padding: 2rem 0;
`;

const Title = styled.h1`
  display: inline-block;
  position: relative;
  font-size: 2.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
  padding-bottom: 8px;
  cursor: default;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #27ae60, #2ecc71);
    border-radius: 2px;
    transform: translateX(-50%) scaleX(0.2);
    transform-origin: center;
    animation: ${underlinePulse} 2s ease-in-out infinite;
  }
`;

// CheckoutSteps component styles
const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 3rem;
  position: relative;
`;

const Step = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // position: relative;
  z-index: 1;
  // flex: 1;
`;

const StepIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${(props) => (props.active ? '#28a745' : '#e0e0e0')};
  color: ${(props) => (props.active ? 'white' : '#888')};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.3s ease;
  animation: ${(props) => (props.active && !props.completed ? stepPulse : 'none')} 1.5s infinite;
  position: relative;

  ${(props) =>
    props.completed &&
    `
    background: #28a745;
    color: white;
  `}

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
  }
`;

const StepLabel = styled.span`
  margin-top: 10px;
  font-size: 14px;
  color: ${(props) => (props.active ? '#28a745' : '#888')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  text-align: center;
  transition: all 0.3s ease;

  ${(props) =>
    props.active &&
    `
    text-shadow: 0 2px 4px rgba(40, 167, 69, 0.3);
  `}
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #e0e0e0; /* Light color for future steps */
  z-index: 0;
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  height: 2px;
  background: #28a745; /* Darker color for completed steps */
  width: ${(props) => props.progress}%;
  transition: width 0.5s ease;
  z-index: 1;
`;

const GoBackButton = styled.a`
  background: linear-gradient(135deg, #6c757d, #495057);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  margin-left: -10px;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    color: white;
  }
`;

// CheckoutSteps component
const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { id: 1, label: 'Sign In', icon: <FaShoppingCart />, active: step1 },
    { id: 2, label: 'Shipping', icon: <FaTruck />, active: step2 },
    { id: 3, label: 'Payment', icon: <FaCreditCard />, active: step3 },
    { id: 4, label: 'Place Order', icon: <FaCheck />, active: step4 },
  ];

  const activeStep = [step1, step2, step3, step4].filter(Boolean).length;
  const progress = ((activeStep - 1) / (steps.length - 1)) * 100;

  return (
    <StepsContainer>
      <ProgressBarContainer />
      <ProgressLine progress={progress} />
      {steps.map((step) => (
        <Step key={step.id}>
          <StepIcon active={step.active} completed={step.id < activeStep}>
            {step.id < activeStep ? <FaCheck /> : step.icon}
          </StepIcon>
          <StepLabel active={step.active}>{step.label}</StepLabel>
        </Step>
      ))}
    </StepsContainer>
  );
};

// Main ShippingScreen component
const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cartSeed);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    };

    return (
        <PageContainer>
            <AnimatedFormContainer>
                <Meta title="AgroHub | Shipping" />
                <GoBackButton href="/cart" className='text-decoration-none'>
                    ← GO BACK
                </GoBackButton>
                <CheckoutSteps step1 step2 />
                <Title>Shipping Details</Title>
                <StyledForm onSubmit={submitHandler}>
                    <Form.Group controlId='address'>
                        <FormLabel>Address <RequiredStar>*</RequiredStar></FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter your full address"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='city'>
                        <FormLabel>City <RequiredStar>*</RequiredStar></FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter your city"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='postalCode'>
                        <FormLabel>Postal Code <RequiredStar>*</RequiredStar></FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter postal code"
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='country'>
                        <FormLabel>Country <RequiredStar>*</RequiredStar></FormLabel>
                        <FormControl
                            type="text"
                            placeholder="Enter your country"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </Form.Group>

                    <StyledButton type='submit' className="btn-block">
                        Continue to Payment
                    </StyledButton>
                </StyledForm>
            </AnimatedFormContainer>
        </PageContainer>
    );
};

export default ShippingScreen;