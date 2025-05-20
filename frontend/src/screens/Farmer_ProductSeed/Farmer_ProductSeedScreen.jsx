import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Alert, Col } from 'react-bootstrap';
import PurchaseSeeds from '../../components/PurchaseSeeds/PurchaseSeeds';
import styled, { keyframes, css } from 'styled-components';
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';
import { listSeedProducts } from './../../actions/productSeedActions';
import Meta from '../../components/Helmet/Meta';

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
    transform: translateX(-50%) scaleX(0.2);
  }
  50% {
    transform: translateX(-50%) scaleX(1);
  }
  100% {
    transform: translateX(-50%) scaleX(0.2);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
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
    background: linear-gradient(90deg, #28a745, #5cb85c);
    border-radius: 2px;
    transform: translateX(-50%) scaleX(0.2);
    transform-origin: center;
    animation: ${underlinePulse} 2s ease-in-out infinite;
  }
`;

const MachineLendScreenContainer = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
  min-height: 100vh;
`;

const ScreenContainer = styled.div`
  width: 100%;
  margin: auto;
  padding: 30px;
  border-radius: 15px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f0f8 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  margin-top: 80px;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(40, 167, 69, 0.1) 0%, rgba(40, 167, 69, 0) 70%);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: -30px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(92, 184, 92, 0.1) 0%, rgba(92, 184, 92, 0) 70%);
    z-index: 0;
  }
`;

const ShowMoreButton = styled(Button)`
  background: linear-gradient(135deg, #3498db, #2980b9);
  border: none;
  padding: 12px 24px;
  font-weight: 600;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  transition: all 0.3s ease;
  width: 200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
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

const Farmer_ProductSeedScreen = () => {
    const dispatch = useDispatch();
    const prodcutSeedList = useSelector(state => state.prodcutSeedList);
    const { loading, error, productSeeds } = prodcutSeedList;
    const [numberOfItems, setNumberOfItems] = useState(6);

    useEffect(() => {
        dispatch(listSeedProducts());
    }, [dispatch]);

    const showMore = () => {
        if (numberOfItems + 3 <= productSeeds.length) {
            setNumberOfItems(numberOfItems + 3);
        } else {
            setNumberOfItems(productSeeds.length);
        }
    };

    return (
        <MachineLendScreenContainer>
            <Meta title="AgroHub | Trending Seeds" />
            <ScreenContainer>
                <Row className="align-items-center mb-5" style={{ position: 'relative', zIndex: 1 }}>
                    <Col>
                        <AnimatedTitle>Trending Seeds</AnimatedTitle>
                        <p style={{
                            color: '#7f8c8d',
                            fontSize: '1rem',
                            marginBottom: '0'
                        }}>
                            Discover our premium collection of high-quality seeds
                        </p>
                    </Col>
                </Row>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Row style={{ margin: '2rem 0' }}>
                            {productSeeds.length > 0 ? (
                                productSeeds
                                    .slice(0, numberOfItems)
                                    .map((seed, index) => (
                                        <PurchaseSeeds
                                            key={seed._id}
                                            _id={seed._id}
                                            name={seed.name}
                                            image={seed.image}
                                            rating={seed.rating}
                                            numReviews={seed.numReviews}
                                            price={seed.price}
                                            style={css` 
                                                animation: ${fadeInUp} 0.6s ease-out ${index * 0.1}s both;
                                                position: 'relative';`
                                            }
                                        />
                                    ))
                            ) : (
                                <Col md={12} className="text-center">
                                    <Alert variant="info" style={{
                                        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '2rem',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                        animation: 'fadeIn 0.8s ease-out'
                                    }}>
                                        <h4 style={{ color: '#2c3e50', fontWeight: '600' }}>No Seeds Available</h4>
                                        <p style={{ color: '#7f8c8d' }}>
                                            We currently don't have any seeds listed. Please check back later!
                                        </p>
                                    </Alert>
                                </Col>
                            )}
                        </Row>

                        {numberOfItems < productSeeds.length ? (
                            <div className="text-center" style={{ margin: '2rem 0' }}>
                                <ShowMoreButton onClick={showMore}>
                                    Show More <i className="fas fa-chevron-down"></i>
                                </ShowMoreButton>
                            </div>
                        ) : productSeeds.length > 0 ? (
                            <AllLoadedAlert>
                                All Seeds Loaded
                            </AllLoadedAlert>
                        ) : null}
                    </div>
                )}
            </ScreenContainer>
        </MachineLendScreenContainer>
    );
};

export default Farmer_ProductSeedScreen;