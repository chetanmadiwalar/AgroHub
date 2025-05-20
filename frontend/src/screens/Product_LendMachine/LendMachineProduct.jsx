import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {
    Col,
    Container,
    Row,
    Image,
    ListGroup,
    Card,
    Button,
    Form
} from 'react-bootstrap';
import styled, { keyframes, css } from 'styled-components';
import { listLendMachineProductsDetails, deleteLendMachineProduct } from './../../actions/productLendMachinesActions'
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import Meta from '../../components/Helmet/Meta';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const ProductScreenContainer = styled.div`
  padding: 2rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%);
  min-height: 100vh;
  width: 100%;
  margin-top: 60px;
`;

const GoBackButton = styled(Link)`
  background: linear-gradient(135deg, #6c757d, #495057);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  margin-bottom: 2rem;
  margin-top: 1rem;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    color: white;
  }
`;

const AnimatedRow = styled(Row)`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin: 1rem 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  animation: ${fadeIn} 0.5s ease-out;
`;

const ProductImage = styled(Image)`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 10px;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const ProductCard = styled(Card)`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  height: 100%;
`;

const underlinePulse = keyframes`
  0% { transform: translateX(-50%) scaleX(0.2); }
  50% { transform: translateX(-50%) scaleX(1); }
  100% { transform: translateX(-50%) scaleX(0.2); }
`;

const ProductTitle = styled.h2`
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  padding-bottom: 8px;
  cursor: default;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #27ae60, #2ecc71);
    border-radius: 3px;
    transform: translateX(-50%) scaleX(0.2);
    transform-origin: center;
    animation: ${underlinePulse} 2s ease-in-out infinite;
  }
`;

const DetailItem = styled(ListGroup.Item)`
  padding: 1.25rem 1.5rem;
  border-left: none;
  border-right: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
  
  strong {
    color: #495057;
    min-width: 100px;
    display: inline-block;
  }
`;

const ActionButton = styled(Button)`
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: none;
  width: 100%;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

const LendMachineProduct = ({ history, match }) => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch()

    const productLendMachinesDetails = useSelector(state => state.productLendMachinesDetails)
    const { loading, error, productLendMachines } = productLendMachinesDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    

    useEffect(() => {
        dispatch(listLendMachineProductsDetails(match.params.id))
    }, [dispatch, match])

    const addtoCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    
    const deleteProductHandler = () => {
        if (window.confirm('Are you sure you want to delete this machine?')) {
            dispatch(deleteLendMachineProduct(match.params.id))
             .then(() => {
                // After successful deletion, redirect
                history.push('/supplier/mymachines');
            })
            .catch(error => {
                console.error('Delete error:', error);
            });
        }
    };
    
    const redirectPath = userInfo?.role === 'Farmer' ? '/farmers/lendMachines' : '/supplier/mymachines';

    return (
        <ProductScreenContainer>
            <Meta
                title="AgroHub | Machine"
            />
            <Container>
                <GoBackButton to={redirectPath} className='text-decoration-none'>
                    ← GO BACK
                </GoBackButton>
                {
                    loading
                        ? <Loader />
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : (
                                <Col md={12}>
                                    <ProductCard>
                                        <Row>
                                            {/* Product Image Column */}
                                            <Col md={5} className="p-4">
                                                <ProductImage 
                                                    src={productLendMachines.image} 
                                                    alt={productLendMachines.name}
                                                    className="img-fluid"
                                                    style={{ maxHeight: "400px", objectFit: "contain" }}
                                                />
                                            </Col>

                                            {/* Product Details Column */}
                                            <Col md={7} className="p-4">
                                                <ListGroup variant="flush">
                                                    {/* Product Title */}
                                                    <DetailItem className="border-bottom">
                                                        <ProductTitle>{productLendMachines.name}</ProductTitle>
                                                    </DetailItem>

                                                    {/* Price */}
                                                    <DetailItem className="border-bottom">
                                                        <Row>
                                                            <Col><h4 style={{ color: '#e74c3c' }}>Price:</h4></Col>
                                                            <Col><h4 style={{ color: '#e74c3c' }}> ₹{productLendMachines.price}</h4> (per day)</Col>
                                                        </Row>
                                                    </DetailItem>

                                                    {/* Quantity Available */}
                                                    <DetailItem>
                                                        <Row>
                                                            <Col><strong>Quantity Available:</strong></Col>
                                                            <Col>{productLendMachines.quantity}</Col>
                                                        </Row>
                                                    </DetailItem>

                                                    {/* Additional Details (Machine Power, Target Plant) */}
                                                    <DetailItem>
                                                        <Row>
                                                            <Col><strong>Machine Power:</strong></Col>
                                                            <Col>{productLendMachines.machine_power}</Col>
                                                        </Row>
                                                    </DetailItem>
                                                    <DetailItem>
                                                        <Row>
                                                            <Col><strong>Target Plant:</strong></Col>
                                                            <Col>{productLendMachines.target_plant}</Col>
                                                        </Row>
                                                    </DetailItem>

                                                    {/* Quantity Selection */}
                                                    {productLendMachines.quantity > 0 && (
                                                        <DetailItem>
                                                            <Row className="align-items-center">
                                                                <Col md={6}><strong>Qty:</strong></Col>
                                                                <Col md={6}>
                                                                    <Form.Control 
                                                                        as='select' 
                                                                        value={qty} 
                                                                        onChange={(e) => setQty(Number(e.target.value))}
                                                                        style={{
                                                                            width: "80px",
                                                                            borderRadius: '50px',
                                                                            padding: '6px 12px',
                                                                            backgroundColor: '#f8f9fa',
                                                                            border: '1px solid #ced4da',
                                                                        }}
                                                                    >
                                                                        {[...Array(productLendMachines.quantity).keys()]
                                                                            .map(x =>
                                                                                <option key={x + 1} value={x + 1}>
                                                                                    {x + 1}
                                                                                </option>
                                                                            )
                                                                        }
                                                                    </Form.Control>
                                                                </Col>
                                                            </Row>
                                                        </DetailItem>
                                                    )}

                                                    {/* Description */}
                                                    <DetailItem className="border-top">
                                                        <div className="mt-3">
                                                            <strong>Description:</strong>
                                                            <div className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
                                                                {productLendMachines.description}
                                                            </div>
                                                        </div>
                                                    </DetailItem>

                                                    {/* Action Buttons */}
                                                    <Row className="mt-4">
                                                        {userInfo?.role === 'Farmer' ? (
                                                            <Col md={6} className="mx-auto">
                                                                <ActionButton 
                                                                    variant="success"
                                                                    onClick={addtoCartHandler}
                                                                    disabled={productLendMachines.quantity === 0}
                                                                    style={{ maxWidth: "300px" }}
                                                                >
                                                                    {productLendMachines.quantity > 0 ? 'Add To Cart' : 'Out of Stock'}
                                                                </ActionButton>
                                                            </Col>
                                                        ) : (
                                                            <>
                                                                <Col md={6} className="mb-3">
                                                                    <ActionButton 
                                                                        variant="warning" 
                                                                        onClick={() => history.push(`/admin/productlist/machine/${match.params.id}/edit`)}
                                                                    >
                                                                        Update Machine
                                                                    </ActionButton>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <ActionButton 
                                                                        variant="danger" 
                                                                        onClick={deleteProductHandler}
                                                                    >
                                                                        Delete Machine
                                                                    </ActionButton>
                                                                </Col>
                                                            </>
                                                        )}
                                                    </Row>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </ProductCard>
                                </Col>
                            )
                }
            </Container>
        </ProductScreenContainer>
    )
}

export default LendMachineProduct;