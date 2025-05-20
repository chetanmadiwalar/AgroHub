import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled, { keyframes, css } from 'styled-components';
import { listMyOrders } from '../../actions/orderAction';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import Meta from '../../components/Helmet/Meta';
import { 
    FaReceipt, 
    FaRupeeSign, 
    FaCalendarAlt, 
    FaCheck, 
    FaTimes, 
    FaSeedling, 
    FaShoppingBasket,
    FaTractor,
    FaLeaf
  } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const PageContainer = styled.div`
  margin-top: 90px;
  background: linear-gradient(-45deg, #f5f7fa, #e4e8f0, #f0f4f9, #e8ecf2);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  min-height: calc(100vh - 100px);
  padding: 3rem 0;
`;

const TitleContainer = styled.div`
  margin-bottom: 2.5rem;
  text-align: center;
`;

const underlinePulse = keyframes`
  0% {
    transform: translateX(-50%) scaleX(0.2);
  }
  50% {
    transform: translateX(-50%) scaleX(1);
  }
  100% {
    transform: translateX(-50%) scaleX(0.2);
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

const Subtitle = styled.p`
  color: #6c757d;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  animation: ${fadeIn} 1s ease-out;
`;

const StyledTable = styled(Table)`
  background: white;
  border-radius: 15px;
  // box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: ${fadeIn} 0.8s ease-out;
  transition: all 0.3s ease;
  
  thead {
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
    
    th {
      border: none;
      padding: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  
  tbody {
    tr {
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      td {
        padding: 1.2rem 1rem;
        vertical-align: middle;
        border-color: rgba(0, 0, 0, 0.05);
      }
    }
  }
`;

const StatusIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.paid ? '#28a74520' : '#dc354520'};
  color: ${props => props.paid ? '#28a745' : '#dc3545'};
  margin-right: 8px;
`;

const StatusText = styled.span`
  font-weight: ${props => props.paid ? '600' : '500'};
  color: ${props => props.paid ? '#28a745' : '#dc3545'};
`;

const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  color: white;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
  animation: ${props => props.pulse ? css`${pulse} 2s infinite` : 'none'};

  &:hover {
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.8s ease-out;
`;

const EmptyTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  color: #6c757d;
  margin-bottom: 2rem;
`;

const OrderRow = styled.tr`
  animation: ${slideIn} 0.5s ease-out;
  animation-fill-mode: both;
  
  ${props => css`
    animation-delay: ${props.delay * 0.1}s;
  `}
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  animation: ${fadeIn} 0.8s ease-out;
  max-width: 600px;
  margin: 0 auto;
`;

const EmptyStateIcon = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.farmer ? 'linear-gradient(135deg, #e6f5e6, #c8e6c9)' : 'linear-gradient(135deg, #f0f8ff, #d1e7ff)'};
  border-radius: 50%;
  color: ${props => props.farmer ? '#2e7d32' : '#1565c0'};
  font-size: 3rem;
  animation: ${pulse} 2s infinite;
`;

const EmptyStateTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const EmptyStateText = styled.p`
  color: #6c757d;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const EmptyStateLink = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  color: ${props => props.farmer ? '#2e7d32' : '#1565c0'};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  
  &:hover {
    color: ${props => props.farmer ? '#1b5e20' : '#0d47a1'};
    border-bottom-color: ${props => props.farmer ? '#2e7d32' : '#1565c0'};
    transform: translateY(-2px);
  }
`;

const MyOrdersScreen = ({ history }) => {
    const dispatch = useDispatch();
  
    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
  
    useEffect(() => {
      if (!userInfo) {
        history.push('/login');
      } else {
        dispatch(listMyOrders());
      }
    }, [dispatch, history, userInfo]);
  
    // Determine if user is farmer
    const isFarmer = userInfo && (userInfo.role === 'Farmer' || userInfo.isFarmer);

   
    return (
      <PageContainer>
        <Meta title="AgroHub | My Orders" />
        <Container>
          <TitleContainer>
            <Title>My Orders</Title>
            <Subtitle>
              {isFarmer ? 'Manage your farming purchases and equipment rentals' : 'Track your purchases and deliveries'}
            </Subtitle>
          </TitleContainer>
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : orders && orders.length === 0 ? (
            <EmptyStateContainer>
              <EmptyStateIcon farmer={isFarmer}>
                {isFarmer ? <FaTractor /> : <FaLeaf />}
              </EmptyStateIcon>
              <EmptyStateTitle>
                {isFarmer ? 'No Farming Orders Yet' : 'Your Order History is Empty'}
              </EmptyStateTitle>
              <EmptyStateText>
                {isFarmer 
                  ? 'You haven\'t placed any seed or equipment orders yet. Explore our agricultural products to enhance your farming.'
                  : 'You haven\'t made any purchases yet. Discover our fresh products for your needs.'
                }
              </EmptyStateText>
              <LinkContainer to={isFarmer ? "/farmers/purchaseSeeds" : "/consumer"}>
                <EmptyStateLink farmer={isFarmer}>
                  {isFarmer ? 'Browse Farming Products →' : 'Explore Our Products →'}
                </EmptyStateLink>
              </LinkContainer>
            </EmptyStateContainer>
          ) : (
            <StyledTable striped hover responsive>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <OrderRow key={order._id} delay={index}>
                    <td>{order._id.substring(0, 8)}...</td>
                    <td>
                      <FaCalendarAlt style={{ marginRight: '8px', color: '#6c757d' }} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <FaRupeeSign style={{ marginRight: '4px' }} />
                      {order.totalPrice.toFixed(2)}
                    </td>
                    <td>
                      {order.isPaid ? (
                        <div className="d-flex align-items-center">
                          <StatusIcon paid>
                            <FaCheck />
                          </StatusIcon>
                          <StatusText paid>
                            {new Date(order.paidAt).toLocaleDateString()}
                          </StatusText>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center">
                          <StatusIcon>
                            <FaTimes />
                          </StatusIcon>
                          <StatusText>Pending</StatusText>
                        </div>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        <div className="d-flex align-items-center">
                          <StatusIcon paid>
                            <FaCheck />
                          </StatusIcon>
                          <StatusText paid>
                            {new Date(order.deliveredAt).toLocaleDateString()}
                          </StatusText>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center">
                          <StatusIcon>
                            <FaTimes />
                          </StatusIcon>
                          <StatusText>Processing</StatusText>
                        </div>
                      )}
                    </td>
                    <td>
                        <StyledButton onClick={()=>{history.push(`/order/${order._id}`)}} variant="primary">
                          <FaReceipt /> Details
                        </StyledButton>
                    </td>
                  </OrderRow>
                ))}
              </tbody>
            </StyledTable>
          )}
        </Container>
      </PageContainer>
    );
  };
  
  export default MyOrdersScreen;
  