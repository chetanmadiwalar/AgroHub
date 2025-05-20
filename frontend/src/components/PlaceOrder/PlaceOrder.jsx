import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Spinner
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaShoppingCart, FaTruck, FaCreditCard } from 'react-icons/fa';
import Message from '../../components/Message/Message';
import { createOrder } from '../../actions/orderAction';
import Meta from '../Helmet/Meta';
import { listConsumerProducts } from '../../actions/consumerProductAction';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { listSeedProducts } from '../../actions/productSeedActions';
import { listLendMachineProducts } from '../../actions/productLendMachinesActions';


// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(40, 167, 69, 0); }
  100% { box-shadow: 0 0 0 0 rgba(40, 167, 69, 0); }
`;

// Styled Components
const PageContainer = styled.div`
  margin-top: 90px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: calc(100vh - 100px);
  padding: 2rem 0;
  animation: ${fadeIn} 0.5s ease-out;
`;

const StickyCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  position: sticky;
  top: 100px;

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const StyledButton = styled.button`
  background: #28a745;
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  margin-top: 1rem;
  width: 100%;
  color: white;
  border-radius: 50px;

  &:hover {
    background: #218838;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(39, 174, 96, 0.4);
  }

  &:disabled {
    background: #6c757d;
    animation: none;
    cursor: not-allowed;
  }
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

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 3rem;
  position: relative;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  flex: 1;
`;

const StepIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.active ? '#28a745' : '#e0e0e0'};
  color: ${props => props.active ? 'white' : '#888'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.3s ease;
  position: relative;
`;

const StepLabel = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: ${props => props.active ? '#28a745' : '#888'};
  font-weight: ${props => props.active ? '600' : '400'};
  text-align: center;
  transition: all 0.3s ease;
`;

const ProgressLine = styled.div`
  position: absolute;
  height: 2px;
  background: #28a745;
  top: 20px;
  left: 0;
  width: ${props => props.progress}%;
  transition: width 0.5s ease;
  z-index: 0;
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

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    { id: 1, label: 'Sign In', icon: <FaShoppingCart />, active: step1 },
    { id: 2, label: 'Shipping', icon: <FaTruck />, active: step2 },
    { id: 3, label: 'Payment', icon: <FaCreditCard />, active: step3 },
    { id: 4, label: 'Place Order', icon: <FaCheck />, active: step4 }
  ];

  const activeStep = [step1, step2, step3, step4].filter(Boolean).length;
  const progress = ((activeStep - 1) / (steps.length - 1)) * 100;

  return (
    <StepsContainer>
      <ProgressLine progress={progress} />
      {steps.map((step) => (
        <Step key={step.id}>
          <StepIcon active={step.active}>
            {step.id < activeStep ? <FaCheck /> : step.icon}
          </StepIcon>
          <StepLabel active={step.active}>{step.label}</StepLabel>
        </Step>
      ))}
    </StepsContainer>
  );
};

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();
  const [validationError, setValidationError] = useState(null);

  const cart = useSelector((state) => state.cartSeed);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const consumerProductList = useSelector(state => state.consumerProductList);
  const { loading: productsLoading, consumerProducts } = consumerProductList;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading: orderLoading, order, success, error } = orderCreate;

  const prodcutSeedList = useSelector(state => state.prodcutSeedList);
  const { loading, productSeeds } = prodcutSeedList;
  console.log('Product Seeds:', productSeeds);

  const productLendMachinesList = useSelector(state => state.productLendMachinesList);
  const {productLendMachines } = productLendMachinesList;
  console.log('Product machines:', productLendMachines);

  // Filter cart items for the logged-in user
  const userCartItems = cart.cartItems.filter(
    (item) => item.user === userInfo?._id
  );

  // Calculate Prices for display (consumer view)
  const calculatePrices = () => {
    const itemsPrice = userCartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2);
    const shippingPrice = itemsPrice > 100 ? 0 : 100;
    const taxPrice = (Number(itemsPrice) * 0.15).toFixed(2);
    const totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2);
  
    return {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice
    };
  };

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculatePrices();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    dispatch(listConsumerProducts());
    dispatch(listSeedProducts());
    dispatch(listLendMachineProducts());
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success, order]);

  const validateOrderItems = (items) => {
    if (items.length === 0) {
      throw new Error('Your cart is empty');
    }

    items.forEach(item => {
      if (!item.farmerId) {
        throw new Error(`Farmer ID missing for product: ${item.name}`);
      }
      if (item.qty <= 0) {
        throw new Error(`Invalid quantity for product: ${item.name}`);
      }
      if (item.price <= 0) {
        throw new Error(`Invalid price for product: ${item.name}`);
      }
    });
  };

  const placeOrder = async () => {
    try {
      setValidationError(null);
  
      if (!userCartItems.length) {
        throw new Error('Your cart is empty');
      }
  
      // Create combined products array
      const combinedProducts = [
        ...(consumerProducts || []),
        ...(productSeeds || []),
        ...(productLendMachines || [])
      ];
  
      // Group cart items by farmer
      const itemsByFarmer = {};
      userCartItems.forEach((item) => {
        // Search in combined products array
        const product = combinedProducts.find(p => 
          p._id === item.product || 
          (p.seed && item.seed && p.seed.toString() === item.seed.toString()) ||
          (p._id === item.seed) || // For seed products
          (p._id === item.machine) || // For machine products
          p.prod_name === item.name
        );
  
        if (!product) {
          console.error('Product not found details:', {
            item,
            combinedProducts,
            matchingAttempts: {
              byProductId: combinedProducts.some(p => p._id === item.product),
              bySeedId: combinedProducts.some(p => p.seed === item.seed),
              byMachineId: combinedProducts.some(p => p._id === item.machine),
              byName: combinedProducts.some(p => p.prod_name === item.name)
            }
          });
          throw new Error(`Product "${item.name}" not found in available products`);
        }
  
        if (!product.user) {
          console.error('Product missing farmer:', product);
          throw new Error(`Farmer information missing for product: ${item.name}`);
        }
  
        const farmerId = product.user;
        if (!itemsByFarmer[farmerId]) {
          itemsByFarmer[farmerId] = [];
        }
  
        itemsByFarmer[farmerId].push({
          name: item.name || product.prod_name,
          qty: item.qty,
          image: item.image || product.image,
          price: item.price || product.price,
          seed: item.seed,
          machine: item.machine,
          farmerId,
          product: item.product || product._id,
        });
      });
  
      // Rest of your placeOrder function remains the same...
      const orderGroupId = new Date().getTime().toString();
  
      const orderPromises = Object.entries(itemsByFarmer).map(async ([farmerId, items]) => {
        const farmerItemsPrice = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
        const farmerShippingPrice = farmerItemsPrice > 100 ? 0 : 10;
        const farmerTaxPrice = farmerItemsPrice * 0.15;
        const farmerTotalPrice = farmerItemsPrice + farmerShippingPrice + farmerTaxPrice;
  
        const orderData = {
          user: userInfo._id,
          farmer: farmerId,
          orderGroup: orderGroupId,
          orderItems: items,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: farmerItemsPrice.toFixed(2),
          shippingPrice: farmerShippingPrice.toFixed(2),
          taxPrice: farmerTaxPrice.toFixed(2),
          totalPrice: farmerTotalPrice.toFixed(2),
        };
  
        return dispatch(createOrder(orderData));
      });
  
      await Promise.all(orderPromises);
      history.push(`/order/${orderGroupId}`);
  
    } catch (error) {
      console.error('Full order creation error:', error);
      setValidationError(error.message);
      dispatch({
        type: 'ORDER_CREATE_FAIL',
        payload: error.message
      });
    }
  };

  if (!userInfo) {
    return null;
  }

  return (
    <PageContainer>
      <Container>
        <Meta title="AgroHub | Place Order" />
        <GoBackButton href="/payment" className='text-decoration-none'>
          ← GO BACK
        </GoBackButton>
        <CheckoutSteps step1 step2 step3 step4 />
        <Title>Place Order</Title>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush" className="mb-3 rounded">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Address: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {cart.paymentMethod}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {userCartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {userCartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row className="align-items-center">
                          <Col md={1}>
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              fluid 
                              rounded 
                              style={{ maxHeight: '50px' }}
                            />
                          </Col>
                          <Col md={5}>{item.name}</Col>
                          <Col md={4} className="text-end">
                            {item.qty} × ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <StickyCard>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col className="text-end">₹{itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col className="text-end">₹{shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax (15%)</Col>
                    <Col className="text-end">₹{taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col><strong>Total</strong></Col>
                    <Col className="text-end"><strong>₹{totalPrice}</strong></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant="danger">{error}</Message>}
                  {validationError && <Message variant="danger">{validationError}</Message>}
                  <StyledButton
                    type="button"
                    disabled={userCartItems.length === 0 || orderLoading || productsLoading}
                    onClick={placeOrder}
                  >
                    {orderLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Processing...
                      </>
                    ) : (
                      'Place Order'
                    )}
                  </StyledButton>
                </ListGroup.Item>
              </ListGroup>
            </StickyCard>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  );
};

export default PlaceOrder;