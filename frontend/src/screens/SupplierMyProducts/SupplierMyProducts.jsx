import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Button, Alert, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PurchaseSeeds from './../../components/PurchaseSeeds/PurchaseSeeds';
import { listSeedProducts, createSeedProducts } from './../../actions/productSeedActions';
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';
import { SEED_CREATE_RESET } from './../../constants/productConstants';
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
const ProductScreenContainer = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
  min-height: 100vh;
  margin-top: 90px;
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
  min-height: 100vh;

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

const CreateProductButton = styled(Button)`
  background: linear-gradient(135deg, #28a745, #5cb85c);
  border: none;
  padding: 12px 24px;
  font-weight: 600;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
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

const SupplierMyProducts = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // Updated selectors with proper state paths
    const prodcutSeedList = useSelector(state => state.prodcutSeedList);
        const { loading, error, productSeeds } = prodcutSeedList;
        console.log(prodcutSeedList);
    

    const userLogin = useSelector(state => state.userLogin || {});
    const { userInfo } = userLogin;

    const seedCreate = useSelector(state => state.seedCreate || {});
    const { 
        loading: createLoadingSeed = false, 
        error: errorCreateSeed = null, 
        success: successCreate = false, 
        product: seedProduct = null 
    } = seedCreate;

    const [numberOfItems, setNumberOfItems] = useState(6);

    useEffect(() => {
        dispatch({ type: SEED_CREATE_RESET });

        if (!userInfo) {
            history.push('/login');
        } else {
            if (successCreate) {
                history.push(`/admin/productlist/seed/${seedProduct._id}/edit`);
            } else {
                dispatch(listSeedProducts());
            }
        }
    }, [dispatch, history, userInfo, successCreate, seedProduct]);

    // Filter to show only seed products belonging to the current user
    const supplierProducts = productSeeds
        .filter(seed => seed.user && seed.user.toString() === userInfo?._id?.toString());

    const showMore = () => {
        if (numberOfItems + 3 <= supplierProducts.length) {
            setNumberOfItems(numberOfItems + 3);
        } else {
            setNumberOfItems(supplierProducts.length);
        }
    };

    const createSeedProductHandler = () => {
        dispatch(createSeedProducts());
    };

    return (
        <ProductScreenContainer>
            <Meta title="AgroHub | My Seed Products" />
            <ScreenContainer>
                <Row className="align-items-center mb-5" style={{ position: 'relative', zIndex: 1 }}>
                    <Col md={8}>
                        <AnimatedTitle>
                            My Seed Products
                        </AnimatedTitle>
                        <p style={{
                            color: '#7f8c8d',
                            fontSize: '1rem',
                            marginBottom: '0'
                        }}>
                            Manage and showcase your seed products
                        </p>
                    </Col>
                    <Col md={4} className="text-md-right">
                        <CreateProductButton className='my-3' onClick={createSeedProductHandler}>
                            <i className='fas fa-plus'></i> Add New Product
                        </CreateProductButton>
                    </Col>
                </Row>

                {createLoadingSeed && <Loader />}
                {errorCreateSeed && <Message variant='danger'>{errorCreateSeed}</Message>}
                
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Row style={{ margin: '2rem 0' }}>
                            {supplierProducts.length > 0 ? (
                                supplierProducts
                                    .slice(0, numberOfItems)
                                    .map((seed, index) => (
                                        <PurchaseSeeds
                                            key={seed._id}
                                            _id={seed._id}
                                            name={seed.name}
                                            image={seed.image}
                                            price={seed.price}
                                            description={seed.description}
                                            category={seed.category}
                                            countInStock={seed.countInStock}
                                            numReviews={seed.numReviews}
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
                                            You haven't added any seed products yet. Click the button above to list your first product!
                                        </p>
                                    </EmptyStateAlert>
                                </Col>
                            )}
                        </Row>

                        {numberOfItems < supplierProducts.length ? (
                            <div className="text-center" style={{ margin: '2rem 0' }}>
                                <ShowMoreButton onClick={showMore}>
                                    Show More <i className="fas fa-chevron-down"></i>
                                </ShowMoreButton>
                            </div>
                        ) : supplierProducts.length > 0 ? (
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

export default SupplierMyProducts;