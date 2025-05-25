import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import Message from './../../../components/Message/Message'
import Loader from './../../../components/Loader/Loader'
import FormContainer from './../../../components/FormContainer/FormContainer'
import { listLendMachineProductsDetails, updateLendMachine } from './../../../actions/productLendMachinesActions'
import { MACHINE_UPDATE_RESET } from '../../../constants/productConstants'
import Meta from '../../../components/Helmet/Meta'

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

const underlineExpand = keyframes`
  0% {
    transform: scaleX(0.05);
  }
  50% {
    transform: scaleX(0.4);
  }
  100% {
    transform: scaleX(0.05);
  }
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
    left: 0;
    height: 3px;
    width: 100%;
    background: linear-gradient(90deg, #3498db, #2c3e50);
    border-radius: 2px;
    transform-origin: center;
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
      border-color: #3498db;
      box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
    }
  }

  label {
    font-weight: 600;
    color: #495057;
    margin-bottom: 0.5rem;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #3498db, #2c3e50);
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  border-radius: 50px;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
  width: 100%;

  &:hover {
    background: linear-gradient(135deg, #2980b9, #3498db);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(52, 152, 219, 0.4);
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
      border-color: #3498db;
    }
  }
`;

const ImagePreview = styled.div`
  margin-top: 10px;
  
  img {
    max-width: 100%;
    height: 150px;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
  }
`;

const SeedListEdit  = ({ match }) => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [target_plant, setTarget_plant] = useState('')
    const [quantity, setQuantity] = useState('')
    const [machine_power, setMachine_power] = useState('')
    const [uploading, setUploading] = useState(false)

    const productId = match.params.id

    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productLendMachinesDetails = useSelector(state => state.productLendMachinesDetails)
    const { loading, productLendMachines, error } = productLendMachinesDetails

    const LendMachinesUpdate = useSelector(state => state.LendMachinesUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = LendMachinesUpdate

    // Determine redirection path
    const redirectPath = userInfo && userInfo.isAdmin ? '/admin/productlist' : '/supplier/mymachines'

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateLendMachine({
            _id: productId,
            name,
            image,
            price,
            description,
            target_plant,
            quantity,
            machine_power
        }))
    }

    const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'agrohub_preset'); // Replace with your actual preset
    setUploading(true);

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                console.log(
                    'Upload Progress: ' +
                    Math.round((progressEvent.loaded * 100) / progressEvent.total) +
                    '%'
                );
            }
        };

        const { data } = await axios.post(
            'https://api.cloudinary.com/v1_1/djfpd3gha/image/upload', // Replace YOUR_CLOUD_NAME
            formData,
            config
        );

        setImage(data.secure_url);
        setUploading(false);
    } catch (error) {
        console.error('Upload Error:', error);
        setUploading(false);
    }
};

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        if (successUpdate) {
            dispatch({ type: MACHINE_UPDATE_RESET })
            history.push(redirectPath)
        } else {
            if (!productLendMachines || !productLendMachines.name || productLendMachines._id !== productId) {
                dispatch(listLendMachineProductsDetails(productId))
            } else {
                setName(productLendMachines.name)
                setDescription(productLendMachines.description)
                setPrice(productLendMachines.price)
                setImage(productLendMachines.image)
                setTarget_plant(productLendMachines.target_plant)
                setQuantity(productLendMachines.quantity)
                setMachine_power(productLendMachines.machine_power)
            }
        }
    }, [history, productLendMachines, dispatch, productId, successUpdate, userInfo, redirectPath])

    return (
        <EditContainer>
            <Meta
                title="AgroHub | Admin Machine Edit"
            />
            <FormContainer>
                <PageTitle>Edit Lend Machine</PageTitle>
                
                <BackButton to={redirectPath} className='text-decoration-none'>
                    ← Go Back
                </BackButton>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {successUpdate && (
                    <Message variant='success'>Machine Updated Successfully!</Message>
                )}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : !productLendMachines ? (
                    <Message variant='danger'>Machine not found!</Message>
                ) : (
                    <StyledForm onSubmit={submitHandler}>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId='name'>
                                    <Form.Label>Machine Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter machine name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup controlId="image">
                                  <Form.Label>Image</Form.Label>
                                  <Form.Control
                                      type="text"
                                      placeholder="Enter image URL"
                                      value={image}
                                      onChange={(e) => setImage(e.target.value)}
                                  />
                                  <Form.Text className="text-muted">
                                      Or upload an image file
                                  </Form.Text>
                                  
                                  <div className="mt-2">
                                      <Form.File
                                          id="image-file"
                                          label="Choose File"
                                          custom
                                          onChange={uploadFileHandler}
                                      />
                                  </div>
                                  
                                  {uploading && <Loader />}
                                  
                                  {image && (
                                      <div className="mt-3 text-center">
                                          <img 
                                              src={image} 
                                              alt="Product Preview" 
                                              className="img-fluid rounded"
                                              style={{
                                                  maxHeight: '200px',
                                                  border: '1px solid #dee2e6'
                                              }}
                                          />
                                          <div className="mt-2">
                                              <Button 
                                                  variant="danger" 
                                                  size="sm" 
                                                  onClick={() => setImage('')}
                                              >
                                                  Remove Image
                                              </Button>
                                          </div>
                                      </div>
                                  )}
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
                                <FormGroup controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup controlId='target_plant'>
                                    <Form.Label>Target Plant</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter target plant"
                                        value={target_plant}
                                        onChange={(e) => setTarget_plant(e.target.value)}
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

                                <FormGroup controlId='machine_power'>
                                    <Form.Label>Machine Power</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter machine power"
                                        value={machine_power}
                                        onChange={(e) => setMachine_power(e.target.value)}
                                    />
                                </FormGroup>

                                <SubmitButton type="submit">
                                    Update Machine
                                </SubmitButton>
                            </Col>
                        </Row>
                    </StyledForm>
                )}
            </FormContainer>
        </EditContainer>
    )
}

export default SeedListEdit 