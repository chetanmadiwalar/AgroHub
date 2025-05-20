import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Badge } from 'react-bootstrap';

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const StatusContainer = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const StatusHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const StatusTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const StatusBadge = styled(Badge)`
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: white;
  animation: ${(props) =>
    props.status === 'Pending'
      ? pendingPulse
      : props.status === 'Processing'
      ? processingGlow
      : props.status === 'Completed'
      ? completedBounce
      : 'none'} 1.5s infinite;

  background: ${(props) =>
    props.status === 'Pending'
      ? '#ffc107'
      : props.status === 'Processing'
      ? '#17a2b8'
      : props.status === 'Completed'
      ? '#28a745'
      : '#6c757d'};
`;

const pendingPulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.5); }
  50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 193, 7, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 193, 7, 0); }
`;

const processingGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(23, 162, 184, 0.5); }
  50% { box-shadow: 0 0 20px rgba(23, 162, 184, 0.8); }
  100% { box-shadow: 0 0 5px rgba(23, 162, 184, 0.5); }
`;

const completedBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

const TimelineContainer = styled.div`
  position: relative;
  margin: 2rem 0 1rem;
  padding-left: 50px;
`;

const TimelineBar = styled.div`
  position: absolute;
  left: 25px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #e9ecef;
  z-index: 1;
  height: 85%;
`;

const TimelineProgress = styled.div`
  position: absolute;
  left: 25px;
  top: 0;
  width: 4px;
  background: #28a745;
  height: ${props => props.progress}%;
  z-index: 2;
  transition: height 0.8s ease;
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  min-height: 60px;

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const TimelineDot = styled.div`
  position: absolute;
  left: -40px;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? '#28a745' : '#e9ecef'};
  color: ${props => props.active ? 'white' : '#6c757d'};
  font-weight: bold;
  z-index: 3;
  border: 3px solid white;
  box-shadow: 0 0 0 3px ${props => props.active ? 'rgba(40, 167, 69, 0.3)' : '#e9ecef'};
`;

const TimelineContent = styled.div`
  padding-left: 1rem;
`;

const TimelineTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.active ? '#2c3e50' : '#6c757d'};
  margin-bottom: 0.5rem;
`;

const TimelineDate = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0.5rem;
`;

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const OrderStatus = ({ order }) => {
  // Calculate progress based on order status
  const progress = order.isPaid ? 28 : 0;
  const status = order.isPaid ? 'Processing' : 'Pending';

  return (
    <StatusContainer>
      <StatusHeader>
        <StatusTitle>Order Status</StatusTitle>
        <StatusBadge status={status} pill>{status}</StatusBadge>
      </StatusHeader>

      <TimelineContainer>
        <TimelineBar />
        <TimelineProgress progress={progress} />
        
        <TimelineItem>
          <TimelineDot active={progress >= 28}>
            {progress >= 28 ? '✓' : '1'}
          </TimelineDot>
          <TimelineContent>
            <TimelineTitle active={progress >= 28}>Payment</TimelineTitle>
            <TimelineDate>
              {order.isPaid ? formatDate(order.paidAt) : 'Pending || '}{<TimelineDate style={{'display':'inline'}}>{formatDate(order.createdAt)}</TimelineDate>}
            </TimelineDate>
            <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: 0 }}>
              {order.isPaid ? 'Payment has been confirmed.' : 'Complete your payment to proceed.'}
            </p>
          </TimelineContent>
        </TimelineItem>

        {/* Order Placement - Second in the flow */}
        <TimelineItem>
          <TimelineDot active={progress >= 50}>
            {progress >= 50 ? '✓' : '2'}
          </TimelineDot>
          <TimelineContent>
            <TimelineTitle active={progress >= 50}>Order Confirmation</TimelineTitle>
            <TimelineDate>Not confirmed yet</TimelineDate>
            <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: 0 }}>
              {order.isPaid ? 'Your order has been confirmed.' : 'Order will be confirmed after payment.'}
            </p>
          </TimelineContent>
        </TimelineItem>

        {/* Shipping Step */}
        <TimelineItem>
          <TimelineDot active={false}>3</TimelineDot>
          <TimelineContent>
            <TimelineTitle active={false}>Shipping</TimelineTitle>
            <TimelineDate>Not shipped yet</TimelineDate>
            <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: 0 }}>
              Your order will be prepared for shipment.
            </p>
          </TimelineContent>
        </TimelineItem>

        {/* Delivery Step */}
        <TimelineItem>
          <TimelineDot active={false}>4</TimelineDot>
          <TimelineContent>
            <TimelineTitle active={false}>Delivery</TimelineTitle>
            <TimelineDate>Not delivered yet</TimelineDate>
            <p style={{ fontSize: '0.85rem', color: '#6c757d', marginBottom: 0 }}>
              Your order will be delivered after shipping.
            </p>
          </TimelineContent>
        </TimelineItem>
      </TimelineContainer>
    </StatusContainer>
  );
};

export default OrderStatus;