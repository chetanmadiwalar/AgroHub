import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import { FaShoppingCart, FaEye, FaChartBar, FaBoxOpen, FaChartLine, FaChartPie, FaRegSadTear, FaTruck } from 'react-icons/fa';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { listOrders } from '../../actions/orderAction';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import Meta from '../../components/Helmet/Meta';
import OrderDetailsModal from '../../components/OrderDetailsModal';

// Color Theme - Earthy tones suitable for agriculture
const colors = {
  primary: '#4a8c3e',       // Healthy green
  secondary: '#8b5a2b',     // Earth brown
  success: '#5cb85c',       // Growth green
  info: '#5bc0de',          // Sky blue
  warning: '#f0ad4e',       // Harvest gold
  danger: '#d9534f',        // Alert red
  light: '#f8f9fa',
  dark: '#343a40',
  background: '#f5f5f0',    // Creamy background
  text: '#333333',
  highlight: '#e9f5e1'      // Light green highlight
};

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 ${colors.primary}33; }
  70% { box-shadow: 0 0 0 10px ${colors.primary}00; }
  100% { box-shadow: 0 0 0 0 ${colors.primary}00; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const DashboardContainer = styled.div`
  margin-top: 90px;
  min-height: calc(100vh - 100px);
  padding: 2rem 0;
  background: ${colors.background};
  animation: ${fadeIn} 0.5s ease-out;
`;

const DashboardCard = styled(Card)`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-bottom: 25px;
  overflow: hidden;
  background: white;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-3px);
  }

  .card-header {
    background: linear-gradient(135deg, ${colors.primary}, #63a355);
    color: white;
    border-bottom: none;
    padding: 1rem 1.5rem;
    font-weight: 600;
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

const DashboardTitle = styled.h1`
  display: inline-block;
  position: relative;
  font-size: 2.2rem;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 20px;
  padding-bottom: 8px;
  cursor: default;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 4px;
    background: ${colors.secondary};
    border-radius: 2px;
    transform: translateX(-50%) scaleX(0.2);
    transform-origin: center;
    animation: ${underlinePulse} 2s ease-in-out infinite;
  }
`;

const StatusBadge = styled(Badge)`
  font-size: 0.7rem;
  padding: 5px 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border-radius: 50px;
  transition: all 0.2s ease;
  background-color: ${({ status }) =>
    status === 'success' ? colors.success :
    status === 'primary' ? colors.primary :
    status === 'warning' ? colors.warning :
    colors.light};
  color: ${({ status }) =>
    status === 'warning' ? colors.dark : colors.light};
`;

const GraphContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  height: 100%;
  transition: all 0.3s ease;
  border-left: 4px solid ${colors.primary};

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .graph-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    color: ${colors.primary};
    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
      color: ${colors.secondary};
    }
  }
`;

const ActionButton = styled(Button)`
  background: ${colors.primary};
  border: none;
  padding: 8px 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-radius: 50px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  animation: ${pulse} 2s infinite;

  &:hover {
    background: #3d7533;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px ${colors.primary}33;
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    margin-right: 6px;
  }
`;

const SummaryCard = styled(DashboardCard)`
  text-align: center;
  border-top: 4px solid ${colors.primary};
  transition: all 0.4s ease;

  &:hover {
    animation: ${float} 3s ease infinite;
  }

  .card-body {
    padding: 1.5rem;
  }

  h5 {
    color: ${colors.secondary};
    font-weight: 500;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    color: ${colors.primary};
    font-weight: 700;
    margin: 0;
  }
`;

const EmptyStateContainer = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin: 1rem 0;
  border: 1px dashed ${colors.secondary}33;

  .empty-icon {
    font-size: 4rem;
    color: ${colors.secondary}66;
    margin-bottom: 1.5rem;
    animation: ${float} 3s ease infinite;
  }

  h4 {
    color: ${colors.secondary};
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    color: ${colors.text}aa;
    max-width: 500px;
    margin: 0 auto 1.5rem;
  }
`;

const SupplierDashboard = ({ history }) => {
  const dispatch = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders = [] } = orderList;

  useEffect(() => {
    if (userInfo) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  // Filter orders containing products from this supplier
  const supplierOrders = orders.filter(order =>
    order.orderItems.some(item =>
      item.farmerId && item.farmerId.toString() === userInfo._id.toString()
    )
  );

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Calculate summary statistics
  const totalSales = supplierOrders.reduce((sum, order) => sum + order.totalPrice, 0);
  const averageOrderValue = supplierOrders.length > 0 ? totalSales / supplierOrders.length : 0;

  // Get product names for distribution chart
const productNames = supplierOrders.length > 0
  ? [
      ...new Set(
        supplierOrders.flatMap(order => 
          order.orderItems
            .filter(item => item.farmerId && item.farmerId.toString() === userInfo._id.toString())
            .map(item => item.name)
        )
      )
    ]
  : [];

// Prepare data for sales trend graph
const salesTrendData = supplierOrders.length > 0 
  ? {
      labels: Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (11 - i));
        return date.toLocaleString('default', { month: 'short' });
      }),
      datasets: [
        {
          label: 'Monthly Sales (₹)',
          data: Array.from({ length: 12 }, (_, i) => {
            const month = new Date();
            month.setMonth(month.getMonth() - (11 - i));
            return supplierOrders
              .filter(order => new Date(order.createdAt).getMonth() === month.getMonth())
              .reduce((sum, order) => sum + order.totalPrice, 0);
          }),
          borderColor: colors.primary,
          backgroundColor: `${colors.primary}20`,
          tension: 0.4,
          fill: true,
          borderWidth: 2
        }
      ]
    } 
  : null;

  const orderStatusData = supplierOrders.length > 0 ? {
    labels: ['Pending', 'Paid', 'Delivered'],
    datasets: [{
      label: 'Order Status Count',
      data: [
        supplierOrders.filter(order => !order.isPaid && !order.isDelivered).length,
        supplierOrders.filter(order => order.isPaid && !order.isDelivered).length,
        supplierOrders.filter(order => order.isDelivered).length
      ],
      backgroundColor: [
        `${colors.warning}cc`,
        `${colors.primary}cc`,
        `${colors.success}cc`
      ],
      borderColor: [
        colors.warning,
        colors.primary,
        colors.success
      ],
      borderWidth: 1
    }]
  } : null;

  const productDistributionData = supplierOrders.length > 0 ? {
    labels: productNames,
    datasets: [{
      data: productNames.map(productName => {
        return supplierOrders.reduce((sum, order) => {
          return sum + order.orderItems
            .filter(item => 
              item.farmerId && 
              item.farmerId.toString() === userInfo._id.toString() && 
              item.name === productName
            )
            .reduce((itemSum, item) => itemSum + item.qty, 0);
        }, 0);
      }),
      backgroundColor: [
        `${colors.primary}cc`,
        `${colors.secondary}cc`,
        `${colors.success}cc`,
        `${colors.info}cc`,
        `${colors.warning}cc`,
        `${colors.danger}cc`
      ],
      borderColor: [
        colors.primary,
        colors.secondary,
        colors.success,
        colors.info,
        colors.warning,
        colors.danger
      ],
      borderWidth: 1
    }]
  } : null;

  // Empty state components
  const renderEmptyOrdersTable = () => (
    <EmptyStateContainer>
      <FaShoppingCart className="empty-icon" />
      <h4>No Orders Yet</h4>
      <p>Your products haven't received any orders yet. When customers purchase your products, they'll appear here.</p>
    </EmptyStateContainer>
  );

  const renderEmptyGraph = (title, icon = <FaChartBar className="me-2" />, message = "No data available to display this chart. When you receive orders, analytics will appear here.") => (
    <GraphContainer>
      <div className="graph-title d-flex align-items-center">
        {icon}
        {title}
      </div>
      <EmptyStateContainer style={{ padding: '2rem 1rem', background: 'transparent', boxShadow: 'none' }}>
        <FaRegSadTear className="empty-icon" style={{ fontSize: '2.5rem' }} />
        <h4 style={{ fontSize: '1.2rem' }}>No Data Available</h4>
        <p>{message}</p>
      </EmptyStateContainer>
    </GraphContainer>
  );

  return (
    <DashboardContainer>
      <Meta title="AgroHub | Supplier Dashboard" />
      <Container>
        <DashboardTitle>
          <FaTruck className="me-2" />
          Supplier Dashboard
        </DashboardTitle>

        {/* Summary Cards */}
        <Row>
          <Col md={4}>
            <SummaryCard>
              <Card.Body>
                <h5><FaBoxOpen className="me-2" />Total Orders</h5>
                <h2>{supplierOrders.length}</h2>
              </Card.Body>
            </SummaryCard>
          </Col>
          <Col md={4}>
            <SummaryCard>
              <Card.Body>
                <h5><FaChartBar className="me-2" />Total Sales</h5>
                <h2>₹{totalSales.toFixed(2)}</h2>
              </Card.Body>
            </SummaryCard>
          </Col>
          <Col md={4}>
            <SummaryCard>
              <Card.Body>
                <h5><FaTruck className="me-2" />Avg. Order</h5>
                <h2>₹{averageOrderValue.toFixed(2)}</h2>
              </Card.Body>
            </SummaryCard>
          </Col>
        </Row>

        {/* Orders Table */}
        <Row>
          <Col md={12}>
            <DashboardCard>
              <Card.Header>
                <h5 className="mb-0 d-flex align-items-center">
                  <FaShoppingCart className="me-2" />
                  Your Product Orders
                </h5>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant="danger">{error}</Message>
                ) : supplierOrders.length === 0 ? (
                  renderEmptyOrdersTable()
                ) : (
                  <div className="table-responsive">
                    <Table striped bordered hover className="mb-0">
                      <thead>
                        <tr>
                          <th>ORDER ID</th>
                          <th>DATE</th>
                          <th>ITEMS</th>
                          <th>TOTAL</th>
                          <th>STATUS</th>
                          <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {supplierOrders.map((order) => {
                          const supplierItems = order.orderItems.filter(
                            item => item.farmerId && item.farmerId.toString() === userInfo._id.toString()
                          );
                          
                          return (
                            <tr key={order._id}>
                              <td>#{order._id.substring(0, 8)}</td>
                              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                              <td>
                                {supplierItems.map(item => item.name).join(', ')}
                              </td>
                              <td>₹{order.totalPrice.toFixed(2)}</td>
                              <td>
                                {order.isDelivered ? (
                                  <StatusBadge status="success">Delivered</StatusBadge>
                                ) : order.isPaid ? (
                                  <StatusBadge status="primary">Paid</StatusBadge>
                                ) : (
                                  <StatusBadge status="warning">Pending</StatusBadge>
                                )}
                              </td>
                              <td>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleShowDetails(order)}
                                >
                                  <FaEye className="me-1" /> View
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </DashboardCard>
          </Col>
        </Row>

        {/* Order Details Modal */}
        {selectedOrder && (
          <OrderDetailsModal 
            order={selectedOrder} 
            show={showModal} 
            handleClose={handleCloseModal}
            currentFarmerId={userInfo._id}
          />
        )}

        {/* Sales Analytics Section */}
        <Row className="mt-4">
          <Col md={8}>
            {salesTrendData ? (
              <GraphContainer>
                <div className="graph-title d-flex align-items-center">
                  <FaChartLine className="me-2" />
                  Monthly Sales Trend
                </div>
                <Line 
                  data={salesTrendData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => `₹${context.raw.toFixed(2)}`
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => `₹${value}`
                        }
                      }
                    }
                  }}
                />
              </GraphContainer>
            ) : (
              renderEmptyGraph("Monthly Sales Trend", <FaChartLine className="me-2" />)
            )}
          </Col>
          <Col md={4}>
            {orderStatusData ? (
              <GraphContainer>
                <div className="graph-title d-flex align-items-center">
                  <FaChartBar className="me-2" />
                  Order Status
                </div>
                <Bar
                  data={orderStatusData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false
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
              </GraphContainer>
            ) : (
              renderEmptyGraph("Order Status")
            )}
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={12}>
            {productDistributionData ? (
              <GraphContainer>
                <div className="graph-title d-flex align-items-center">
                  <FaChartPie className="me-2" />
                  Product Distribution
                </div>
                <div style={{ height: '400px' }}>
                  <Pie
                    data={productDistributionData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const label = context.label || '';
                              const value = context.raw || 0;
                              const total = context.dataset.data.reduce((a, b) => a + b, 0);
                              const percentage = Math.round((value / total) * 100);
                              return `${label}: ${value} units (${percentage}%)`;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </GraphContainer>
            ) : (
              renderEmptyGraph(
                "Product Distribution", 
                <FaChartPie className="me-2" />,
                "When customers order your products, you'll see a breakdown of which products are most popular here."
              )
            )}
          </Col>
        </Row>
      </Container>
    </DashboardContainer>
  );
};

export default SupplierDashboard;