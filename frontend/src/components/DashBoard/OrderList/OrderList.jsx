import React, { useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import Message from './../../../components/Message/Message';
import Loader from './../../../components/Loader/Loader';
import { listOrders } from './../../../actions/orderAction';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const StyledContainer = styled(Container)`
  animation: ${fadeIn} 0.5s ease-out;
  padding-bottom: 1rem;
`;

const StyledTable = styled(Table)`
  margin-bottom: 50px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: none;
  animation: ${fadeIn} 0.6s ease-out;
  
  thead {
    background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
    color: white;
    
    th {
      border: none;
      padding: 1rem;
      font-weight: 600;
    }
  }
  
  tbody {
    tr {
      transition: all 0.2s ease;
      
      &:hover {
        background-color: rgba(75, 108, 183, 0.05);
        transform: translateX(5px);
      }
      
      td {
        border: none;
        border-bottom: 1px solid #eee;
        padding: 1rem;
        vertical-align: middle;
      }
    }
  }
`;

const StatusIcon = styled.i.attrs(props => ({
  className: props.isPositive ? 'fas fa-check' : 'fas fa-times',
}))`
  color: ${props => props.isPositive ? '#2ecc71' : '#e74c3c'};
  font-size: 1.2rem;
`;

const DetailsButton = styled(Button)`
  background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
  border: none;
  border-radius: 25px;
  padding: 0.5rem 1.25rem;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #3a5a9c 0%, #0f1c30 100%);
    color: white;
    animation: ${pulse} 0.5s ease;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    return (
        <StyledContainer>
            
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <StyledTable striped bordered hover responsive className='table-sm text-center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>{formatPrice(order.totalPrice)}</td>
                                <td>
                                    {order.isPaid ? (
                                        new Date(order.paidAt).toLocaleDateString()
                                    ) : (
                                        <StatusIcon isPositive={false} />
                                    )}
                                </td>
                                <td>
                                    {order.isDelivered ? (
                                        order.deliveredAt ? 
                                        new Date(order.deliveredAt).toLocaleDateString() : 
                                        "Shipped"
                                    ) : (
                                        <StatusIcon isPositive={false} />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}/edit`}>
                                        <DetailsButton variant="primary">
                                            Details
                                        </DetailsButton>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            )}
        </StyledContainer>
    );
};

export default OrderListScreen;