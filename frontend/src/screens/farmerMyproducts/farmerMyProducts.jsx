import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Alert, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ConsumerProducts from './../../components/ConsumerProducts/ConsumerProducts';
import { listConsumerProducts, createConsumer } from './../../actions/consumerProductAction.js';
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';
import { CONSUMER_CREATE_RESET } from './../../constants/productConstants';
import Meta from '../../components/Helmet/Meta';
import styled, { keyframes, css } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
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

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const ProductScreenContainer = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
  min-height: 100vh;
  margin-top:90px;
`;

const ScreenContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f0f8 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
`;

const DecorativeCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  z-index: 0;
`;

const TopRightCircle = styled(DecorativeCircle)`
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(46,204,113,0.1) 0%, rgba(46,204,113,0) 70%);
`;

const BottomLeftCircle = styled(DecorativeCircle)`
  bottom: -30px;
  left: -30px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(52,152,219,0.1) 0%, rgba(52,152,219,0) 70%);
`;

const AnimatedTitle = styled.h1`
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
  color: #7f8c8d;
  font-size: 1rem;
  margin-bottom: 0;
`;

const CreateProductButton = styled(Button)`
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border: none;
  padding: 12px 24px;
  font-weight: 600;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &:hover::after {
    transform: translateX(0);
  }
`;

const ShowMoreButton = styled(Button)`
  background: linear-gradient(135deg, #3498db, #2980b9);
  border: none;
  padding: 12px 24px;
  font-weight: 600;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  transition: all 0.3s ease;
  width: 200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(52, 152, 219, 0.4);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: -1;
  }

  &:hover::after {
    transform: translateX(0);
  }
`;


const AllLoadedAlert = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background: linear-gradient(135deg, #f39c12, #e67e22);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  width: 200px;
  margin: 2rem auto;
  animation: ${pulse} 2s infinite;
  text-align: center;
`;

const EmptyStateAlert = styled(Alert)`
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border: none;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  animation: ${fadeIn} 0.8s ease-out;
  text-align: center;

  h4 {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    color: #7f8c8d;
    margin-bottom: 0;
  }
`;

const ProductsRow = styled(Row)`
  margin: 2rem -15px;
  justify-content: center;
`;

const FarmerMyProducts = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const consumerProductList = useSelector(state => state.consumerProductList);
    const { loading, consumerProducts, error } = consumerProductList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const consumerCreate = useSelector(state => state.consumerCreate);
    const { 
        loading: createLoadingConsumer, 
        error: errorCreateConsumer, 
        success: successCreate, 
        product: consumerProduct 
    } = consumerCreate;

    const [numberOfItems, setNumberOfItems] = useState(6);

    useEffect(() => {
        dispatch({ type: CONSUMER_CREATE_RESET });

        if (!userInfo) {
            history.push('/login');
        } else {
            if (successCreate) {
                history.push(`/admin/productlist/consumer/${consumerProduct._id}/edit`);
            } else {
                dispatch(listConsumerProducts());
            }
        }
    }, [dispatch, history, userInfo, successCreate, consumerProduct]);

    const farmerProducts = consumerProducts
    ? consumerProducts.filter(product => product.user?.toString() === userInfo?._id?.toString()) : [];

    const showMore = () => {
        if (numberOfItems + 3 <= farmerProducts.length) {
            setNumberOfItems(numberOfItems + 3);
        } else {
            setNumberOfItems(farmerProducts.length);
        }
    };

    const createConsumerProductHandler = () => {
        dispatch(createConsumer());
    };

    return (
        <ProductScreenContainer>
            <Meta title="AgroHub | Farmer Products" />
            <ScreenContainer>
                <TopRightCircle />
                <BottomLeftCircle />
                
                <Row className="align-items-center mb-5" style={{ position: 'relative', zIndex: 1 }}>
                    <Col md={8}>
                        <AnimatedTitle>
                            My Farm Products
                        </AnimatedTitle>
                        <Subtitle>
                            Manage and showcase your agricultural products
                        </Subtitle>
                    </Col>
                    <Col md={4} className="text-md-right">
                        <CreateProductButton className='my-3' onClick={createConsumerProductHandler}>
                            <i className='fas fa-plus'></i> Add New Product
                        </CreateProductButton>
                    </Col>
                </Row>

                {createLoadingConsumer && <Loader />}
                {errorCreateConsumer && <Message variant='danger'>{errorCreateConsumer}</Message>}
                
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Row style={{ margin: '2rem 0' ,textAlign: 'center'}}>
                            {farmerProducts.length > 0 ? (
                                farmerProducts.slice(0, numberOfItems).map((product, index) => (
                                    <ConsumerProducts
                                        key={product._id}
                                        _id={product._id}
                                        prod_name={product.prod_name}
                                        seller_name={product.seller_name}
                                        image={product.image}
                                        price={product.price}
                                        prod_size={product.prod_size}
                                        avalaible_location={product.avalaible_location}
                                        quantity={product.quantity}
                                        style={css`
                                            animation: ${fadeInUp} 0.6s ease-out ${index * 0.1}s both;
                                            position: relative;
                                        `}
                                    />
                                ))
                            ) : (
                                <Col md={12} className="text-center">
                                    <EmptyStateAlert variant="info">
                                        <h4>No Products Yet</h4>
                                        <p>
                                            You haven't added any products yet. Click the button above to list your first product!
                                        </p>
                                    </EmptyStateAlert>
                                </Col>
                            )}
                        </Row>

                        {numberOfItems < farmerProducts.length ? (
                            <div className="text-center" style={{ margin: '2rem 0' }}>
                                <ShowMoreButton onClick={showMore}>
                                    Show More <i className="fas fa-chevron-down"></i>
                                </ShowMoreButton>
                            </div>
                        ) : farmerProducts.length > 0 ? (
                            <AllLoadedAlert>
                                All Products Loaded
                            </AllLoadedAlert>
                        ) : null}
                    </div>
                )}
            </ScreenContainer>
        </ProductScreenContainer>
    );
};

export default FarmerMyProducts;