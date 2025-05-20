import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Message from './../../../components/Message/Message';
import Loader from './../../../components/Loader/Loader';
import FormContainer from './../../../components/FormContainer/FormContainer';
import { listConsumerProductsDetails, updateConsumer } from './../../../actions/consumerProductAction';
import { CONSUMER_UPDATE_RESET } from '../../../constants/productConstants';
import Meta from '../../../components/Helmet/Meta';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Styled Components
const EditContainer = styled.div`
  margin-top: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f0f8 100%);
  width: 100%;
  min-height: 100vh;
  padding: 20px 0;
  animation: ${fadeIn} 0.6s ease-out;
`;

const underlineExpand = keyframes`
  0% {
    width: 0;
    left: 50%;
    right: 50%;
  }
  50% {
    width: 50%;  // Reduced from 100% to 60%
    left: 25%;   // Adjusted to maintain centering
    right: 21%;  // Adjusted to maintain centering
  }
  100% {
    width: 0;
    left: 50%;
    right: 50%;
  }
`;

const PageTitle = styled.h2`
  margin-top: 60px;
  text-align: center;
  font-weight: 700;
  color: #2c3e50;
  position: relative;
  padding-bottom: 10px;
  margin-bottom: 30px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 3px;  // Slightly reduced height
    background: linear-gradient(90deg, #27ae60, #2ecc71);
    border-radius: 2px;
    animation: ${underlineExpand} 2s ease-in-out infinite;
  }
`;

const BackButton = styled(Link)`
  background: linear-gradient(135deg, #6c757d, #495057);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  margin-bottom: 2rem;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    color: white;
  }
`;

const StyledForm = styled(Form)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: all 0.4s ease;
  margin-bottom: 30px;
  
  &:hover {
    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
  }
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }

  .form-control {
    border-radius: 10px;
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;

    &:focus {
      border-color: #27ae60;
      box-shadow: 0 0 0 0.2rem rgba(39, 174, 96, 0.25);
    }
  }

  label {
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.5rem;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
  width: 100%;

  &:hover {
    background: linear-gradient(135deg, #219653, #27ae60);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(39, 174, 96, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FileInputWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;

  .form-control-file {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .custom-file-label {
    display: block;
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    background: white;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: #27ae60;
    }
  }
`;

const ConsumerListEdit = ({ match }) => {
    const productId = match.params.id;

    // State declarations
    const [prodName, setProdName] = useState('');
    const [image, setImage] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [price, setPrice] = useState('');
    const [prodSize, setProdSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [avalaibleLoc, setAvalaibleLoc] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    // Redux state selectors
    const consumerProductDetails = useSelector(state => state.consumerProductDetails);
    const { loading, error, consumerProduct } = consumerProductDetails;

    const consumerUpdate = useSelector(state => state.consumerUpdate);
    const { 
        loading: loadingUpdate, 
        error: errorUpdate, 
        success: successUpdate 
    } = consumerUpdate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // Determine redirection path
    const redirectPath = userInfo && userInfo.isAdmin ? '/admin/productlist' : '/farmers/products';

    // Handlers
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateConsumer({
            _id: productId,
            prod_name: prodName,
            image,
            price,
            seller_name: sellerName,
            prod_size: prodSize,
            quantity,
            avalaible_location: avalaibleLoc
        })).then(() => {
                // After successful update, refresh the product details
                dispatch(listConsumerProductsDetails(productId));
            });
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
    
        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
    
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
    
            setImage(data.image);
            setUploading(false);
        } catch (error) {
            console.error('Image Upload Error:', error.response?.data?.message || error.message);
            setUploading(false);
        }
    };

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }

        if (successUpdate) {
            dispatch(listConsumerProductsDetails(productId));
            dispatch({ type: CONSUMER_UPDATE_RESET });
            history.push(redirectPath);
        } else {
            if (!consumerProduct || !consumerProduct.prod_name || consumerProduct._id !== productId) {
                dispatch(listConsumerProductsDetails(productId));
            } else {
                setProdName(consumerProduct.prod_name || '');
                setSellerName(consumerProduct.seller_name || '');
                setPrice(consumerProduct.price || '');
                setImage(consumerProduct.image || '');
                setProdSize(consumerProduct.prod_size || '');
                setQuantity(consumerProduct.quantity || '');
                setAvalaibleLoc(consumerProduct.avalaible_location || '');
            }
        }
    }, [history, consumerProduct, dispatch, productId, successUpdate, userInfo, redirectPath]);

    return (
        <EditContainer>
            <Meta title="AgroHub | Consumer Product Edit" />
            <FormContainer>
                <PageTitle>Edit Consumer Product</PageTitle>
                
                <BackButton to={redirectPath} className='text-decoration-none'>
                    ← Go Back
                </BackButton>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {successUpdate && (
                    <Message variant='success'>Product Updated Successfully!</Message>
                )}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : !consumerProduct ? (
                    <Message variant='danger'>Product not found!</Message>
                ) : (
                    <StyledForm onSubmit={submitHandler}>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId='prodname'>
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Product Name"
                                        value={prodName}
                                        onChange={(e) => setProdName(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <FileInputWrapper>
                                    <Form.Control
                                    type="file"
                                    label="Choose File"
                                    custom
                                    onChange={uploadFileHandler}
                                ></Form.Control>
                                    </FileInputWrapper>
                                    {uploading && <Loader />}
                                    {image && (
                                        <div style={{ marginTop: '10px' }}>
                                            <img 
                                                src={image} 
                                                alt="Preview" 
                                                style={{ 
                                                    maxWidth: '100%', 
                                                    height: '150px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #e0e0e0'
                                                }} 
                                            />
                                        </div>
                                    )}
                                </FormGroup>

                                <FormGroup controlId='sellerName'>
                                    <Form.Label>Seller Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter seller name"
                                        value={sellerName}
                                        onChange={(e) => setSellerName(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup controlId='price'>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup controlId='prodSize'>
                                    <Form.Label>Product Size</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter product size"
                                        value={prodSize}
                                        onChange={(e) => setProdSize(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup controlId='quantity'>
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup controlId='avalaibleLoc'>
                                    <Form.Label>Available Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter available location"
                                        value={avalaibleLoc}
                                        onChange={(e) => setAvalaibleLoc(e.target.value)}
                                    />
                                </FormGroup>

                                <SubmitButton type="submit">
                                    Update Product
                                </SubmitButton>
                            </Col>
                        </Row>
                    </StyledForm>
                )}
            </FormContainer>
        </EditContainer>
    );
};

export default ConsumerListEdit;