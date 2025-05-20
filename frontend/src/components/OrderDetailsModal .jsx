// src/components/OrderDetailsModal.jsx
import React from 'react';
import { Modal, Button, ListGroup, Row, Col, Badge } from 'react-bootstrap';
import styled from 'styled-components';

const StatusBadge = styled(Badge)`
  font-size: 0.8rem;
  padding: 5px 10px;
  margin-left: 5px;
`;

const OrderDetailsModal = ({ order, show, handleClose, currentFarmerId }) => {
  // Filter items that belong to the current farmer
  const farmerItems = order.orderItems.filter(
    item => item.farmerId && item.farmerId.toString() === currentFarmerId.toString()
  );

  const farmerTotal = farmerItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>
          Order # {order._id.substring(0, 8)}...
          {order.isDelivered ? (
            <StatusBadge bg="success">Delivered</StatusBadge>
          ) : order.isPaid ? (
            <StatusBadge bg="primary">Paid</StatusBadge>
          ) : (
            <StatusBadge bg="warning" text="dark">Pending</StatusBadge>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold">Order Date:</Col>
              <Col md={9}>{new Date(order.createdAt).toLocaleString()}</Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold">Customer:</Col>
              <Col md={9}>
                {order.user && order.user.name}
                {order.user && order.user.email && (
                  <div className="text-muted small">{order.user.email}</div>
                )}
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold">Shipping Address:</Col>
              <Col md={9}>
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                {order.shippingAddress.country}
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col md={3} className="fw-bold">Payment Method:</Col>
              <Col md={9} className="text-capitalize">
                {order.paymentMethod}
                {order.isPaid && (
                  <div className="text-success small">
                    Paid on {new Date(order.paidAt).toLocaleDateString()}
                  </div>
                )}
              </Col>
            </Row>
          </ListGroup.Item>

          <ListGroup.Item>
            <h5 className="mb-3">Your Products in this Order</h5>
            <ListGroup variant="flush">
              {farmerItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row className="align-items-center">
                    <Col md={1}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                      />
                    </Col>
                    <Col md={5}>
                      <div className="fw-bold">{item.name}</div>
                      <div className="text-muted small">Qty: {item.qty}</div>
                    </Col>
                    <Col md={3} className="text-end">
                      ₹{item.price.toFixed(2)}
                    </Col>
                    <Col md={3} className="text-end fw-bold">
                      ₹{(item.qty * item.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>

          <ListGroup.Item>
            <Row>
              <Col md={9} className="text-end">Subtotal:</Col>
              <Col md={3} className="text-end">
                ₹{farmerTotal.toFixed(2)}
              </Col>
            </Row>
            <Row>
              <Col md={9} className="text-end">Shipping:</Col>
              <Col md={3} className="text-end">
                ₹{order.shippingPrice.toFixed(2)}
              </Col>
            </Row>
            <Row>
              <Col md={9} className="text-end">Tax:</Col>
              <Col md={3} className="text-end">
                ₹{order.taxPrice.toFixed(2)}
              </Col>
            </Row>
            <Row className="mt-2">
              <Col md={9} className="text-end fw-bold">Total:</Col>
              <Col md={3} className="text-end fw-bold">
                ₹{order.totalPrice.toFixed(2)}
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {order.user && order.user.email && (
          <Button 
            variant="outline-primary"
            onClick={() => window.location.href = `mailto:${order.user.email}`}
          >
            <i className="fas fa-envelope"></i> Contact Customer
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;