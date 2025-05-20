import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Image, ListGroup, Button, Form, Card } from 'react-bootstrap';
import styled, { keyframes, css } from 'styled-components';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { listConsumerProductsDetails, deleteConsumerProduct } from '../../actions/consumerProductAction.js';
import { createProductReview } from '../../actions/consumerProductAction';
import Rating from '../../components/Rating/Rating';
import Meta from '../../components/Helmet/Meta';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

const underlinePulse = keyframes`
  0% { transform: translateX(-50%) scaleX(0.2); }
  50% { transform: translateX(-50%) scaleX(1); }
  100% { transform: translateX(-50%) scaleX(0.2); }
`;

// Styled Components
const ProductContainer = styled(Container)`
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f0f8 100%);
  width: 100%;
  min-height: 95vh;
  margin-top: 92px;
  padding: 20px;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 15px;
  }
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

  @media (max-width: 576px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const ProductCard = styled(Card)`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const ProductImage = styled(Image)`
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.5s ease;
  
  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 576px) {
    height: 250px;
  }
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
    ${css`animation: ${underlinePulse} 2s ease-in-out infinite;`}
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 576px) {
    font-size: 1.3rem;
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

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 576px) {
    padding: 0.75rem;
    strong {
      min-width: 80px;
      font-size: 0.9rem;
    }
  }
`;

const ActionButton = styled(Button)`
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-left: 40px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  @media (max-width: 992px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

const ActionButton1 = styled(Button)`
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-left: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  @media (max-width: 992px) {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

const ReviewItem = styled(ListGroup.Item)`
  border-left: 3px solid #3498db;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  ${css`animation: ${fadeIn} 0.5s ease-out;`}
  padding: 1.25rem;
  
  &:hover {
    background: #f8f9fa;
    transform: translateX(5px);
  }

  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

const ReviewForm = styled(Form)`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  ${css`animation: ${fadeIn} 0.6s ease-out;`}
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.9rem;

  @media (max-width: 576px) {
    margin-bottom: 1.5rem;
  }
`;

const StarLabel = styled.label`
  cursor: pointer;
  font-size: 2.5rem;
  color: ${props => props.active ? '#ffc107' : '#e4e5e9'};
  transition: all 0.3s ease;
  margin: 0 7px;
  position: relative;
  text-shadow: ${props => props.active ? '0 0 10px rgba(255, 193, 7, 0.7)' : 'none'};
  
  &:hover {
    transform: scale(1.2);
    color: #ffc107;
  }
  
  &::after {
    content: '${props => props.tooltip}';
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8rem;
    color: #6c757d;
    opacity: ${props => props.active ? '1' : '0'};
    transition: opacity 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 576px) {
    font-size: 1.8rem;
    margin: 0 5px;
  }
`;

const CommentBox = styled(Form.Control)`
  border-radius: 12px;
  border: 1px solid #ced4da;
  padding: 15px;
  box-shadow: none;
  resize: none;
  transition: all 0.3s;
  min-height: 80px;
  max-height: 300px;
  width: 90%;
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
    min-height: 150px;
  }
  
  &:not(:placeholder-shown) {
    min-height: 150px;
  }

  @media (max-width: 992px) {
    width: 100%;
  }

  @media (max-width: 576px) {
    padding: 12px;
    min-height: 100px;
  }
`;

const CharacterCounter = styled.small`
  display: block;
  text-align: right;
  color: ${props => props.limit ? '#e74c3c' : '#6c757d'};
  margin-top: 5px;
  transition: color 0.3s ease;

  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const RatingTextDisplay = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #3498db;
  font-weight: 500;
  text-align: center;
  ${css`animation: ${fadeIn} 0.3s ease-out;`}

  @media (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

const LockIcon = styled.i`
  font-size: 2rem;
  color: #6c757d;
  margin-bottom: 1rem;
  animation: ${css`${pulse} 2s infinite`};

  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
`;

const ConsumerProductDetailScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const consumerProductDetails = useSelector(state => state.consumerProductDetails);
    const { loading, error, consumerProduct } = consumerProductDetails;
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const {
        success: successProductReview,
        loading: loadingProductReview,
        error: errorProductReview,
    } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComment('');
            dispatch(listConsumerProductsDetails(match.params.id));
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        if (!consumerProduct._id || consumerProduct._id !== match.params.id) {
            dispatch(listConsumerProductsDetails(match.params.id));
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
    }, [dispatch, match, successProductReview, consumerProduct._id]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const deleteProductHandler = () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteConsumerProduct(match.params.id))
                .then(() => {
                    history.push('/farmers/products');
                })
                .catch(error => {
                    console.error('Delete error:', error);
                });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProductReview(match.params.id, {
                rating,
                comment,
            })
        );
    };

    const redirectPath = userInfo?.role === 'Farmer' ? '/farmers/products' : '/consumer';

    return (
        <div className="productScreen" style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4f0f8 100%)' }}>
            <Meta title="AgroHub | Consumer Product" />
            <ProductContainer fluid>
                <GoBackButton to={redirectPath} className='text-decoration-none'>
                    ← Go Back
                </GoBackButton>
                
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <>
                        <Row className="product-detail-row">
                            <Col lg={5} md={6} className="mb-4">
                                <ProductCard className="p-3">
                                    <ProductImage
                                        src={consumerProduct.image}
                                        alt={consumerProduct.prod_name}
                                        fluid
                                    />
                                </ProductCard>
                            </Col>
                            <Col lg={7} md={6}>
                                <ProductCard className="p-4">
                                    <Row className="align-items-center">
                                        <Col md={6}>
                                            <ListGroup variant="flush">
                                                <DetailItem>
                                                    <ProductTitle>{consumerProduct.prod_name}</ProductTitle>
                                                </DetailItem>
                                                <DetailItem>
                                                    <Rating 
                                                        value={consumerProduct.rating || 0} 
                                                        text={`${consumerProduct.numReviews || 0} reviews`} 
                                                    />
                                                </DetailItem>
                                                <DetailItem>
                                                    <strong>Seller:</strong> {consumerProduct.seller_name}
                                                </DetailItem>
                                                <DetailItem>
                                                    <strong>Price:</strong> ₹{consumerProduct.price}
                                                </DetailItem>
                                                <DetailItem>
                                                    <strong>Size:</strong> {consumerProduct.prod_size}
                                                </DetailItem>
                                            </ListGroup>
                                        </Col>
                                        <Col md={6}>
                                            <ListGroup variant="flush" className="mt-md-0 mt-3">
                                                <DetailItem>
                                                    <strong>Status:</strong> 
                                                    <span style={{ color: consumerProduct.quantity > 0 ? '#27ae60' : '#e74c3c', fontWeight: '600' }}>
                                                        {consumerProduct.quantity > 0 ? ' In Stock' : ' Out Of Stock'}
                                                    </span>
                                                </DetailItem>
                                                <DetailItem>
                                                    <strong>Available:</strong> {consumerProduct.quantity}
                                                </DetailItem>
                                                <DetailItem>
                                                    <strong>Location:</strong> {consumerProduct.avalaible_location}
                                                </DetailItem>
                                                <DetailItem>
                                                    <strong>Quantity:</strong> 
                                                    <Form.Control
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                        className="mb-3"
                                                        style={{ 
                                                            borderRadius: '50px', 
                                                            padding: '10px 15px', 
                                                            width: '40%',
                                                            display: 'inline-block'
                                                        }}
                                                    >
                                                        {[...Array(consumerProduct.quantity).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                        ))}
                                                    </Form.Control>
                                                </DetailItem>
                                            </ListGroup>
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        {userInfo?.role === 'Consumer' ? (
                                            <Col md={6} className="mx-auto">
                                                <ActionButton 
                                                    variant="success" 
                                                    onClick={addToCartHandler}
                                                    disabled={consumerProduct.quantity === 0}
                                                    className="w-100"
                                                >
                                                    {consumerProduct.quantity === 0 ? 'Out of Stock' : 'Add To Cart'}
                                                </ActionButton>
                                            </Col>
                                        ) : (
                                            <>
                                                <Col md={6} className="mb-3">
                                                    <ActionButton1 
                                                        variant="warning" 
                                                        onClick={() => history.push(`/admin/productlist/consumer/${match.params.id}/edit`)}
                                                        className="w-100"
                                                    >
                                                        Update Product
                                                    </ActionButton1>
                                                </Col>
                                                <Col md={6}>
                                                    <ActionButton1 
                                                        variant="danger" 
                                                        onClick={deleteProductHandler}
                                                        className="w-100"
                                                    >
                                                        Delete Product
                                                    </ActionButton1>
                                                </Col>
                                            </>
                                        )}
                                    </Row>
                                </ProductCard>
                            </Col>
                        </Row>

                        {/* Reviews Section */}
                        <Row className="mt-4 pb-4">
                            {userInfo?.role === 'Farmer' ? (
                                // Farmer view - Reviews in two columns
                                <>
                                    <Col md={6}>
                                        <h2 style={{color: '#2c3e50', marginBottom: '1.5rem'}}>Customer Reviews</h2>
                                        {consumerProduct.reviews && consumerProduct.reviews.length === 0 ? (
                                            <div className="text-center py-5" style={{background: '#f8f9fa', borderRadius: '12px'}}>
                                                <i className="far fa-comment-dots" style={{
                                                    fontSize: '3rem',
                                                    color: '#bdc3c7',
                                                    marginBottom: '1rem'
                                                }}></i>
                                                <h4 style={{color: '#7f8c8d'}}>No Reviews Yet</h4>
                                                <p style={{color: '#95a5a6'}}>This product hasn't been reviewed yet</p>
                                            </div>
                                        ) : (
                                            <ListGroup variant='flush'>
                                                {consumerProduct.reviews && 
                                                    consumerProduct.reviews
                                                        .slice(0, Math.ceil(consumerProduct.reviews.length / 2))
                                                        .map((review) => (
                                                            <ReviewItem key={review._id}>
                                                                <strong>{review.name}</strong>
                                                                <Rating 
                                                                    value={review.rating} 
                                                                    text={`${review.rating} star${review.rating !== 1 ? 's' : ''}`}
                                                                />
                                                                <p style={{color: '#7f8c8d', fontSize: '0.9rem'}}>
                                                                    {review.createdAt.substring(0, 10)}
                                                                </p>
                                                                <p>{review.comment}</p>
                                                            </ReviewItem>
                                                        ))
                                                }
                                            </ListGroup>
                                        )}
                                    </Col>
                                    <Col md={6}>
                                        {consumerProduct.reviews && consumerProduct.reviews.length > 0 && (
                                            <>
                                                <h2 style={{color: '#2c3e50', marginBottom: '4rem', visibility: 'hidden'}}>
                                                    {/* Empty heading for alignment */}
                                                </h2>
                                                <ListGroup variant='flush'>
                                                    {consumerProduct.reviews && 
                                                        consumerProduct.reviews
                                                            .slice(Math.ceil(consumerProduct.reviews.length / 2))
                                                            .map((review) => (
                                                                <ReviewItem key={review._id}>
                                                                    <strong>{review.name}</strong>
                                                                    <Rating 
                                                                        value={review.rating} 
                                                                        text={`${review.rating} star${review.rating !== 1 ? 's' : ''}`}
                                                                    />
                                                                    <p style={{color: '#7f8c8d', fontSize: '0.9rem'}}>
                                                                        {review.createdAt.substring(0, 10)}
                                                                    </p>
                                                                    <p>{review.comment}</p>
                                                                </ReviewItem>
                                                            ))
                                                    }
                                                </ListGroup>
                                            </>
                                        )}
                                    </Col>
                                </>
                            ) : (
                                // Consumer/Admin view - Original layout with review form
                                <>
                                    <Col lg={6} md={12} className="mb-4">
                                        <h2 style={{color: '#2c3e50', marginBottom: '1.5rem'}}>Reviews</h2>
                                        {consumerProduct.reviews && consumerProduct.reviews.length === 0 ? (
                                            <div className="text-center py-5" style={{background: '#f8f9fa', borderRadius: '12px'}}>
                                                <LockIcon className="far fa-comment-dots" ></LockIcon>
                                                <h4 style={{color: '#7f8c8d'}}>No Reviews Yet</h4>
                                                <p style={{color: '#95a5a6'}}>Be the first to share your thoughts about this product</p>
                                            </div>
                                        ) : (
                                            <ListGroup variant='flush'>
                                                {consumerProduct.reviews && consumerProduct.reviews.map((review) => (
                                                    <ReviewItem key={review._id}>
                                                        <strong>{review.name}</strong>
                                                        <Rating 
                                                            value={review.rating} 
                                                            text={`${review.rating} star${review.rating !== 1 ? 's' : ''}`}
                                                        />
                                                        <p style={{color: '#7f8c8d', fontSize: '0.9rem'}}>
                                                            {review.createdAt.substring(0, 10)}
                                                        </p>
                                                        <p>{review.comment}</p>
                                                    </ReviewItem>
                                                ))}
                                            </ListGroup>
                                        )}
                                    </Col>
                                    <Col lg={6} md={12}>
                                        <h2 style={{color: '#2c3e50', marginBottom: '1.5rem'}}>Write a Customer Review</h2>
                                        {successProductReview && (
                                            <Message variant='success'>
                                                Review submitted successfully
                                            </Message>
                                        )}
                                        {loadingProductReview && <Loader />}
                                        {errorProductReview && (
                                            <Message variant='danger'>{errorProductReview}</Message>
                                        )}
                                        {userInfo ? (
                                            <ReviewForm onSubmit={submitHandler}>
                                                <Form.Group controlId='rating' className="mb-4">
                                                    <Form.Label className="d-block mb-3" style={{fontSize: '1.1rem', fontWeight: '500'}}>
                                                        How would you rate this product?
                                                    </Form.Label>
                                                    <StarContainer>
                                                        {[
                                                            {value: 1, label: 'Terrible'},
                                                            {value: 2, label: 'Bad'},
                                                            {value: 3, label: 'Average'},
                                                            {value: 4, label: 'Good'},
                                                            {value: 5, label: 'Excellent'}
                                                        ].map((star) => (
                                                            <React.Fragment key={star.value}>
                                                                <input
                                                                    type="radio"
                                                                    id={`star-${star.value}`}
                                                                    name="rating"
                                                                    value={star.value}
                                                                    onChange={() => setRating(star.value)}
                                                                    checked={rating === star.value}
                                                                    style={{display: 'none'}}
                                                                />
                                                                <StarLabel
                                                                    htmlFor={`star-${star.value}`}
                                                                    active={rating >= star.value}
                                                                    tooltip={star.label}
                                                                >
                                                                    ★
                                                                </StarLabel>
                                                            </React.Fragment>
                                                        ))}
                                                    </StarContainer>
                                                    {rating > 0 && (
                                                        <RatingTextDisplay>
                                                            You selected: {rating} star{rating !== 1 ? 's' : ''} - {
                                                                rating === 1 ? 'Terrible' :
                                                                rating === 2 ? 'Bad' :
                                                                rating === 3 ? 'Average' :
                                                                rating === 4 ? 'Good' : 'Excellent'
                                                            }
                                                        </RatingTextDisplay>
                                                    )}
                                                </Form.Group>
                                                
                                                <Form.Group controlId='comment'>
                                                    <CommentBox
                                                        as='textarea'
                                                        rows='2'
                                                        value={comment}
                                                        onChange={(e) => {
                                                            if (e.target.value.length <= 500) {
                                                                setComment(e.target.value)
                                                            }
                                                        }}
                                                        placeholder="What did you like or dislike about this product? (Min. 20 characters and Max. 500 characters)"
                                                    />
                                                    <CharacterCounter limit={comment.length >= 500}>
                                                        {comment.length}/500 characters
                                                    </CharacterCounter>
                                                </Form.Group>
                                                
                                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                    <ActionButton
                                                        disabled={loadingProductReview || !rating || comment.length > 500}
                                                        type='submit'
                                                        variant="primary"
                                                        style={{
                                                            background: 'linear-gradient(135deg, #3498db, #2980b9)',
                                                            maxWidth: '200px',
                                                            position: 'relative',
                                                            overflow: 'hidden',
                                                            marginBottom: '10px'
                                                        }}
                                                        className="w-100 w-md-auto"
                                                    >
                                                        {loadingProductReview ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                Submitting...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span style={{
                                                                    position: 'absolute',
                                                                    top: '-50%',
                                                                    left: '-50%',
                                                                    width: '200%',
                                                                    height: '200%',
                                                                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                                                                    transform: loadingProductReview ? 'translateX(-100%)' : 'translateX(100%)',
                                                                    transition: 'transform 0.7s ease',
                                                                    pointerEvents: 'none',
                                                                }}></span>
                                                                Submit Review
                                                            </>
                                                        )}
                                                    </ActionButton>
                                                    
                                                    <div className="text-end w-100 w-md-auto">
                                                        <small className="text-muted">
                                                            {comment.length < 20 ? 
                                                                `Minimum ${20 - comment.length} more characters` : 
                                                                'Your review is ready!'}
                                                        </small>
                                                    </div>
                                                </div>
                                            </ReviewForm>
                                        ) : (
                                            <div className="text-center py-4" style={{background: '#f8f9fa', borderRadius: '12px'}}>
                                                <LockIcon className="fas fa-lock" ></LockIcon>
                                                <p style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>
                                                    Please sign in to write a review
                                                </p>
                                                <Link 
                                                    to='/login' 
                                                    className="btn btn-primary"
                                                    style={{
                                                        borderRadius: '50px',
                                                        padding: '8px 20px',
                                                        fontWeight: '500',
                                                        background: 'linear-gradient(135deg, #3498db, #2980b9)',
                                                        border: 'none',
                                                        transition: 'all 0.3s ease',
                                                        position: 'relative',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    <span style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.4), transparent)',
                                                        transform: 'translateX(-100%)',
                                                        transition: 'transform 0.7s ease'
                                                    }}></span>
                                                    Sign In
                                                </Link>
                                            </div>
                                        )}
                                    </Col>
                                </>
                            )}
                        </Row>
                    </>
                )}
            </ProductContainer>
        </div>
    );
};

export default ConsumerProductDetailScreen;