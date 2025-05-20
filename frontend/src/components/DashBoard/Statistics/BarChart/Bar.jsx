import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { FaBox } from 'react-icons/fa';
import Message from '../../../Message/Message';
import Loader from '../../../Loader/Loader';
import { listOrders } from '../../../../actions/orderAction';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin: 2rem 0;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;
  border-left: 4px solid #4a8c3e;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ChartTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    color: #4a8c3e;
  }
`;

const BarChart = ({ history }) => {
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

  // Process orders for chart
  const processOrderData = () => {
    if (!orders || orders.length === 0) return null;

    const monthlyOrders = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});

    const sortedMonths = Object.keys(monthlyOrders).sort((a, b) => new Date(a) - new Date(b));

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'Orders',
          backgroundColor: 'rgba(74, 140, 62, 0.2)',
          borderColor: '#4a8c3e',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(74, 140, 62, 0.4)',
          hoverBorderColor: '#4a8c3e',
          data: sortedMonths.map(month => monthlyOrders[month])
        }
      ]
    };
  };

  const chartData = processOrderData();

  return (
    <ChartContainer>
      <ChartTitle>
        <FaBox /> Orders Overview
      </ChartTitle>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: 'top'
              },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.dataset.label}: ${context.raw}`
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { precision: 0 }
              }
            }
          }}
        />
      ) : (
        <Message variant="info">No order data available</Message>
      )}
    </ChartContainer>
  );
};

export default BarChart;
