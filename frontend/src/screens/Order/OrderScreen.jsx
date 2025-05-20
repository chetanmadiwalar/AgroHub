import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import {
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Loader from './../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { getOrderDetails, payOrder, deliverOrder } from './../../actions/orderAction';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from './../../constants/orderConstant';
import Meta from '../../components/Helmet/Meta';
import OrderStatus from './orderStatus';
import dayjs from 'dayjs';

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
  margin-top: 80px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: calc(100vh - 80px);
  padding: 1.5rem 0;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    margin-top: 70px;
    padding: 1rem 0;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    border-radius: 10px;
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  margin-top: 1rem;
  width: 100%;
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  white-space: nowrap;

  &:hover {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SummaryText = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.5rem;
  word-break: break-word;

  strong {
    color: #2c3e50;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const PriceRow = styled(Row)`
  font-size: 0.95rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0.5rem 0;

  & > Col:last-child {
    text-align: right;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const OrderItemRow = styled(Row)`
  align-items: center;
  padding: 0.75rem 0;

  @media (max-width: 576px) {
    padding: 0.5rem 0;
  }
`;

const OrderItemImage = styled(Image)`
  width: 50px;
  height: 50px;
  object-fit: cover;

  @media (max-width: 576px) {
    width: 40px;
    height: 40px;
  }
`;

const OrderItemName = styled(Col)`
  padding-left: 1rem;
  font-size: 0.95rem;

  @media (max-width: 576px) {
    padding-left: 0.5rem;
    font-size: 0.85rem;
  }
`;

const OrderItemPrice = styled(Col)`
  font-size: 0.95rem;
  text-align: right;

  @media (max-width: 576px) {
    font-size: 0.85rem;
  }
`;

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, successDeliver, history, userInfo]);

  const onSuccessPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <PageContainer>
      <Meta title="AgroHub | Order" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Title>Order ID: {order._id}</Title>
          
          {/* Order Status Component */}
          {order && <OrderStatus order={order} />}
          
          <Row>
            <Col lg={8} md={7} className="mb-4">
              <StyledCard>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <SectionTitle>Shipping</SectionTitle>
                    <SummaryText>
                      <strong>Name: </strong>
                      {order.user.name}
                    </SummaryText>
                    <SummaryText>
                      <strong>Email: </strong>
                      <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </SummaryText>
                    <SummaryText>
                      <strong>Address: </strong>
                      {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                      {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </SummaryText>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <SectionTitle>Payment Method</SectionTitle>
                    <SummaryText>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </SummaryText>
                    {order.isPaid && (
                      <SummaryText>
                        <strong>Paid on: </strong>
                        {dayjs(order.paidAt).format('DD/MM/YYYY hh:mm A')}
                      </SummaryText>
                    )}
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <SectionTitle>Order Items</SectionTitle>
                    {order.orderItems.length === 0 ? (
                      <Message>Order is empty</Message>
                    ) : (
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <OrderItemRow>
                              <Col xs={2}>
                                <OrderItemImage src={item.image} alt={item.name} fluid rounded />
                              </Col>
                              <OrderItemName xs={5}>{item.name}</OrderItemName>
                              <OrderItemPrice xs={5}>
                                {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                              </OrderItemPrice>
                            </OrderItemRow>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </StyledCard>
            </Col>
            
            <Col lg={4} md={5}>
              <StyledCard>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <SectionTitle>Order Summary</SectionTitle>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <PriceRow>
                      <Col>Items</Col>
                      <Col>₹{(order.totalPrice - (order.taxPrice + order.shippingPrice)).toFixed(2)}</Col>
                    </PriceRow>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <PriceRow>
                      <Col>Shipping</Col>
                      <Col>₹{order.shippingPrice.toFixed(2)}</Col>
                    </PriceRow>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <PriceRow>
                      <Col>Tax</Col>
                      <Col>₹{order.taxPrice.toFixed(2)}</Col>
                    </PriceRow>
                  </ListGroup.Item>
                  
                  <ListGroup.Item>
                    <PriceRow>
                      <Col><strong>Total</strong></Col>
                      <Col><strong>₹{order.totalPrice.toFixed(2)}</strong></Col>
                    </PriceRow>
                  </ListGroup.Item>
                  
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        <div style={{ width: '100%' }}>
                          <PayPalButton 
                            amount={order.totalPrice} 
                            onSuccess={onSuccessPaymentHandler} 
                            style={{
                              layout: 'vertical',
                              color: 'gold',
                              shape: 'rect',
                              label: 'paypal'
                            }}
                          />
                        </div>
                      )}
                    </ListGroup.Item>
                  )}
                  
                  {loadingDeliver && <Loader />}
                  {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <ListGroup.Item>
                      <StyledButton type="button" onClick={deliverHandler}>
                        Mark as Delivered
                      </StyledButton>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </StyledCard>
            </Col>
          </Row>
        </Container>
      )}
    </PageContainer>
  );
};

export default OrderScreen;