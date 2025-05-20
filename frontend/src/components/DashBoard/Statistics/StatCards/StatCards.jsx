import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { 
  FaUsers, 
  FaShoppingCart, 
  FaTruck,
  FaChartLine,
  FaMoneyBillWave
} from 'react-icons/fa';
import { listUsers } from '../../../../actions/userActions';
import { listOrders } from '../../../../actions/orderAction';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const StatsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;               // No wrapping, all in one row
  overflow-x: auto;                // Enables horizontal scrolling
  gap: 1rem;
  margin: 2rem 0;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;



const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  min-width: 210px;                 // Fixed width for scroll effect
  flex: 0 0 auto;                   // Prevent shrinking/growing
  border-left: 4px solid ${props => props.color || '#4a8c3e'};
  animation: ${float} 3s ease infinite;
  animation-delay: ${props => props.delay || '0s'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;



const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.bgColor || '#e8f4ea'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: ${props => props.color || '#4a8c3e'};
  font-size: 1.2rem;
`;

const StatTitle = styled.h5`
  font-size: 0.9rem;
  font-weight: 500;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StatValue = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const StatChange = styled.div`
  font-size: 0.8rem;
  color: ${props => props.positive ? '#27ae60' : '#e74c3c'};
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

const StatCards = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    delivered: 0,
    revenue: 0,
    userChange: 0,
    orderChange: 0
  });

  const userList = useSelector(state => state.userList);
  const { users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector(state => state.orderList);
  const { orders } = orderList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history]);

  useEffect(() => {
    if (users && orders) {
      // Calculate delivered orders
      const deliveredOrders = orders.filter(order => order.isDelivered).length;
      
      // Calculate total revenue
      const revenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      
      // Calculate month-over-month changes (simplified)
      const currentMonth = new Date().getMonth();
      const prevMonthUsers = users.filter(user => 
        new Date(user.createdAt).getMonth() === currentMonth - 1
      ).length;
      
      const currentMonthUsers = users.filter(user => 
        new Date(user.createdAt).getMonth() === currentMonth
      ).length;
      
      const userChange = prevMonthUsers > 0 ? 
        ((currentMonthUsers - prevMonthUsers) / prevMonthUsers * 100).toFixed(1) : 100;
      
      const prevMonthOrders = orders.filter(order => 
        new Date(order.createdAt).getMonth() === currentMonth - 1
      ).length;
      
      const currentMonthOrders = orders.filter(order => 
        new Date(order.createdAt).getMonth() === currentMonth
      ).length;
      
      const orderChange = prevMonthOrders > 0 ? 
        ((currentMonthOrders - prevMonthOrders) / prevMonthOrders * 100).toFixed(1) : 100;

      setStats({
        users: users.length,
        orders: orders.length,
        delivered: deliveredOrders,
        revenue,
        userChange,
        orderChange
      });
    }
  }, [users, orders]);

  return (
    <StatsContainer>
      <StatCard color="#3498db" delay="0s">
        <StatIcon bgColor="#ebf5fb" color="#3498db">
          <FaUsers />
        </StatIcon>
        <StatTitle>Total Users</StatTitle>
        <StatValue>{stats.users}</StatValue>
        <StatChange positive={stats.userChange >= 0}>
          {stats.userChange >= 0 ? '↑' : '↓'} {Math.abs(stats.userChange)}% from last month
        </StatChange>
      </StatCard>

      <StatCard color="#9b59b6" delay="0.2s">
        <StatIcon bgColor="#f5eef8" color="#9b59b6">
          <FaShoppingCart />
        </StatIcon>
        <StatTitle>Total Orders</StatTitle>
        <StatValue>{stats.orders}</StatValue>
        <StatChange positive={stats.orderChange >= 0}>
          {stats.orderChange >= 0 ? '↑' : '↓'} {Math.abs(stats.orderChange)}% from last month
        </StatChange>
      </StatCard>

      <StatCard color="#2ecc71" delay="0.4s">
        <StatIcon bgColor="#e8f8f5" color="#2ecc71">
          <FaTruck />
        </StatIcon>
        <StatTitle>Delivered</StatTitle>
        <StatValue>{stats.delivered}</StatValue>
        <StatChange positive={true}>
          {((stats.delivered / stats.orders) * 100 || 0).toFixed(0)}% success rate
        </StatChange>
      </StatCard>

      <StatCard color="#e67e22" delay="0.6s">
        <StatIcon bgColor="#fef5e7" color="#e67e22">
          <FaMoneyBillWave />
        </StatIcon>
        <StatTitle>Total Revenue</StatTitle>
        <StatValue>₹{stats.revenue.toLocaleString()}</StatValue>
        <StatChange positive={stats.orderChange >= 0}>
          <FaChartLine /> Tracking {stats.orderChange >= 0 ? 'up' : 'down'}
        </StatChange>
      </StatCard>
    </StatsContainer>
  );
};

export default StatCards;