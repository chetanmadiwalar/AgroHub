import React from 'react';
import { Modal, Button, ListGroup, Row, Col, Badge } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(0, 123, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
`;

// Styled Components
const StyledModal = styled(Modal)`
  .modal-content {
    border: none;
    border-radius: 12px;
    overflow: hidden;
    animation: ${fadeIn} 0.3s ease-out;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .modal-header {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 1.25rem 1.5rem;
  }

  .modal-title {
    font-weight: 600;
    color: #2c3e50;
    display: flex;
    align-items: center;
  }

  .modal-body {
    padding: 0;
  }

  .modal-footer {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding: 1rem 1.5rem;
  }
`;

const DetailBadge = styled(Badge)`
  background-color: ${({ status }) =>
    status === 'delivered' ? '#28a745' :
    status === 'paid' ? '#007bff' :
    '#ffc107'};
  color: ${({ status }) =>
    status === 'pending' ? 'black' : 'white'};
  font-size: 0.75rem;
  padding: 5px 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 50px;
  margin-left: 10px;
  animation: ${slideIn} 0.3s ease-out;
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;

const StyledListGroup = styled(ListGroup)`
  .list-group-item {
    border-left: none;
    border-right: none;
    padding: 1.25rem 1.5rem;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(248, 249, 250, 0.7);
    }
  }
`;

const PriceCell = styled(Col)`
  font-family: 'Roboto Mono', monospace;
  font-weight: 500;
`;

const ActionButton = styled(Button)`
  padding: 8px 20px;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.2s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const OrderDetailsModal = ({ order, show, handleClose, currentFarmerId }) => {
  // Filter items that belong to this farmer
  const farmerItems = order?.orderItems?.filter(
    item => item.farmerId && item.farmerId.toString() === currentFarmerId.toString()
  ) || [];

  // Calculate subtotal for farmer's items
  const farmerSubtotal = farmerItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <StyledModal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Order #{order?._id?.substring(0, 8)}
          <DetailBadge status={order?.isDelivered ? 'delivered' : order?.isPaid ? 'paid' : 'pending'}>
                {order?.isDelivered ? 'Delivered' : order?.isPaid ? 'Paid' : 'Pending'}
          </DetailBadge>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <StyledListGroup variant="flush">
          {/* Order Information */}
          <ListGroup.Item>
            <Row className="align-items-center">
              <Col md={3} className="fw-bold text-muted">Order Date:</Col>
              <Col md={9}>{new Date(order?.createdAt).toLocaleString()}</Col>
            </Row>
          </ListGroup.Item>

          {/* Shipping Information */}
          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold text-muted">Shipping To:</Col>
              <Col md={9}>
                <div className="fw-bold">{order?.shippingAddress?.address}</div>
                <div className="text-muted">
                  {order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}<br />
                  {order?.shippingAddress?.country}
                </div>
              </Col>
            </Row>
          </ListGroup.Item>

          {/* Payment Information */}
          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold text-muted">Payment:</Col>
              <Col md={9}>
                <span className="text-capitalize">{order?.paymentMethod}</span>
                {order?.isPaid && (
                  <div className="text-success small mt-1">
                    Paid on {new Date(order.paidAt).toLocaleDateString()}
                  </div>
                )}
              </Col>
            </Row>
          </ListGroup.Item>

          {/* Products Section */}
          <ListGroup.Item>
            <h5 className="mb-3 fw-bold">Your Products</h5>
            <StyledListGroup variant="flush">
              {farmerItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className="align-items-center">
                    <Col xs={3} md={2}>
                      <ProductImage 
                        src={item.image} 
                        alt={item.name} 
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60';
                        }}
                      />
                    </Col>
                    <Col xs={6} md={4}>
                      <div className="fw-bold">{item.name}</div>
                      <div className="text-muted small">Qty: {item.qty}</div>
                    </Col>
                    <PriceCell md={3} className="text-end">
                      ₹{item.price.toFixed(2)}
                    </PriceCell>
                    <PriceCell md={3} className="text-end fw-bold">
                      ₹{(item.qty * item.price).toFixed(2)}
                    </PriceCell>
                  </Row>
                </ListGroup.Item>
              ))}
            </StyledListGroup>
          </ListGroup.Item>

          {/* Order Summary */}
          <ListGroup.Item className="bg-light">
            <Row className="mb-2">
              <Col md={9} className="text-end text-muted">Subtotal:</Col>
              <PriceCell md={3} className="text-end">
                ₹{farmerSubtotal.toFixed(2)}
              </PriceCell>
            </Row>
            <Row className="mb-2">
              <Col md={9} className="text-end text-muted">Shipping:</Col>
              <PriceCell md={3} className="text-end">
                ₹{order?.shippingPrice?.toFixed(2)}
              </PriceCell>
            </Row>
            <Row className="mb-2">
              <Col md={9} className="text-end text-muted">Tax:</Col>
              <PriceCell md={3} className="text-end">
                ₹{order?.taxPrice?.toFixed(2)}
              </PriceCell>
            </Row>
            <Row className="mt-3 pt-2 border-top">
              <Col md={9} className="text-end fw-bold">Total:</Col>
              <PriceCell md={3} className="text-end fw-bold text-primary">
                ₹{order?.totalPrice?.toFixed(2)}
              </PriceCell>
            </Row>
          </ListGroup.Item>
        </StyledListGroup>
      </Modal.Body>
      
      <Modal.Footer>
        <ActionButton variant="primary" onClick={handleClose}>
          Close
        </ActionButton>
      </Modal.Footer>
    </StyledModal>
  );
};

export default OrderDetailsModal;