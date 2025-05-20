import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { FaUsers } from 'react-icons/fa';
import Message from './../../../../components/Message/Message';
import Loader from './../../../../components/Loader/Loader';
import { listUsers } from './../../../../actions/userActions';

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

const LineChart = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  // Process user data for chart
  const processUserData = () => {
    if (!users || users.length === 0) return null;

    // Group users by month
    const monthlyUsers = users.reduce((acc, user) => {
      const date = new Date(user.createdAt);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      const key = `${month} ${year}`;
      
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key]++;
      return acc;
    }, {});

    // Sort by date
    const sortedMonths = Object.keys(monthlyUsers).sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    return {
      labels: sortedMonths,
      datasets: [
        {
          label: 'New Users',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(74, 140, 62, 0.2)',
          borderColor: '#4a8c3e',
          borderWidth: 2,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#4a8c3e',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: sortedMonths.map(month => monthlyUsers[month])
        }
      ]
    };
  };

  const chartData = processUserData();

  return (
    <ChartContainer>
      <ChartTitle>
        <FaUsers /> User Growth
      </ChartTitle>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : chartData ? (
        <Line 
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: 'top',
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
                ticks: {
                  precision: 0
                }
              }
            }
          }}
        />
      ) : (
        <Message variant='info'>No user data available</Message>
      )}
    </ChartContainer>
  );
};

export default LineChart;