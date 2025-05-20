import React, { useState, useEffect, useRef } from 'react';
import {
    Form,
    Button,
    Row,
    Col,
    Container,
    Alert
} from 'react-bootstrap';
import { Scrollbar } from "react-scrollbars-custom";
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaKey, FaInfoCircle, FaCheckCircle, FaCamera, FaUpload } from 'react-icons/fa';
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import Meta from '../../components/Helmet/Meta';

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ variant: '', text: '' });
    const [showPasswordHelp, setShowPasswordHelp] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const [address, setAddress] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, user, error } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    console.log(userInfo);
    console.log(userDetails);


    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
    const unlisten = history.listen(() => {
        if (history.location.pathname === '/profile') {
            dispatch(getUserDetails('profile'));
        }
    });
    return () => unlisten();
}, [dispatch, history]);

    useEffect(() => {
    if (!userInfo) {
        history.push('/login');
    } else {
        if (!user.name || (success && user._id === userInfo._id)) {
            dispatch(getUserDetails('profile'));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            if (user.image) {
                setPreviewImage(user.image);
            }
            setAddress(user.address);
            setPhonenumber(user.phonenumber);
        }
    }
}, [dispatch, history, userInfo, user.name, user._id, user.image, user.role, success]);

useEffect(() => {
    return () => {
        // Reset the update success state when component unmounts
        dispatch({ type: 'USER_UPDATE_PROFILE_RESET' });
    };
}, [dispatch]);


const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', variant: '' });

    try {
        if (password && password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role.charAt(0).toUpperCase() + role.slice(1).toLowerCase());
        formData.append('address', address);
        formData.append('phonenumber', phonenumber);

        if (password) formData.append('password', password);
        if (profileImage instanceof File) formData.append('image', profileImage);

        // Remove .unwrap() and handle the promise directly
        await dispatch(updateUserProfile(formData));
        
        // Reset form states on success
        setPassword('');
        setConfirmPassword('');
        setProfileImage(null);
        
        // Show success message
        setMessage({ variant: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
        setMessage({ 
            variant: 'danger', 
            text: error.message || 'Profile update failed' 
        });
    } finally {
        setIsSubmitting(false);
    }
};
      
      

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          
          // Validate file type
          if (!file.type.startsWith('image/')) {
            setMessage({ variant: 'danger', text: 'Please select an image file' });
            return;
          }
          
          // Validate file size (e.g., 2MB max)
          if (file.size > 2 * 1024 * 1024) {
            setMessage({ variant: 'danger', text: 'Image must be less than 2MB' });
            return;
          }
          
          setProfileImage(file);
          
          // Create preview
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const passwordRequirements = [
        'At least 8 characters',
        'At least one uppercase letter',
        'At least one number',
        'At least one special character'
    ];

    const roleBenefits = {
        Farmer: [
            'Access to farming resources and tools',
            'Sell your products directly to consumers',
            'Get market insights and pricing trends',
            'Connect with agricultural experts',
            'Receive weather alerts for your region'
        ],
        Consumer: [
            'Buy fresh products directly from farmers',
            'Access to organic and locally sourced food',
            'Special discounts for regular customers',
            'Subscription options for regular deliveries',
            'Product traceability from farm to table'
        ],
        Supplier: [
            'Connect with farmers and producers',
            'Supply products in bulk to businesses',
            'Business opportunities and networking',
            'Access to quality control tools',
            'Marketplace for agricultural supplies'
        ]
    };

    return (
        <div className="profile-screen">
            <Meta title="AgroHub | Profile" />

            <style jsx>{`
                .profile-screen {
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    min-height: 100vh;
                    padding: 2rem 0;
                    animation: fadeIn 0.5s ease-in-out;
                    margin-top:90px;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .profile-container {
                    max-width: 1400px;
                    margin: 0 auto;
                }
                
                .profile-card-wrapper {
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                    border-radius: 15px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    animation: slideUp 0.5s ease-out;
                }
                
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .profile-card {
                    border: none;
                    border-radius: 15px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    background: white;
                }
                
                .profile-card:hover {
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                    transform: translateY(-5px);
                }
                
                .profile-header {
                    text-align: center;
                    padding: 1.5rem 0;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                }
                
                .profile-image-container {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    margin: 0 auto 1rem;
                    cursor: pointer;
                    border-radius: 50%;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #f0f0f0;
                    border: 3px solid #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                
                .profile-image-container:hover {
                    transform: scale(1.05);
                }
                
                .profile-image-container:hover .upload-overlay {
                    opacity: 1;
                }
                
                .profile-icon {
                    width: 100%;
                    height: 100%;
                    color: #6c757d;
                    transition: all 0.3s ease;
                }
                
                .profile-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .upload-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .upload-overlay span {
                    font-size: 0.8rem;
                    margin-top: 0.5rem;
                }
                
                .camera-icon {
                    font-size: 1.5rem;
                }
                
                .profile-title {
                    font-weight: 700;
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                    transition: all 0.3s ease;
                }
                
                .profile-role {
                    color: var(--light-text);
                    font-size: 1rem;
                    background: #f0f4f8;
                    display: inline-block;
                    padding: 0.4rem 1rem;
                    border-radius: 20px;
                    font-weight: 500;
                }
                
                .message-container {
                    margin-bottom: 1.5rem;
                    animation: fadeIn 0.3s ease-out;
                }
                
                .alert-message {
                    border-radius: 8px;
                    animation: slideDown 0.3s ease-out;
                }
                
                @keyframes slideDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                .profile-form {
                    margin-top: 1.5rem;
                }
                
                .form-group-animate {
                    transition: all 0.3s ease;
                }
                
                .form-group-animate:hover {
                    transform: translateX(5px);
                }
                
                .input-animate {
                    padding: 0.75rem 1rem;
                    border-radius: 10px;
                    border: 1px solid #dfe6e9;
                    transition: all 0.3s;
                    font-size: 0.95rem;
                }
                
                .input-animate:focus {
                    border-color: #3498db;
                    box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
                    transform: translateY(-2px);
                }
                
                .select-animate {
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 0.75rem center;
                    background-size: 1em;
                }
                
                .password-help {
                    background-color: #f8f9fa;
                    padding: 0;
                    border-radius: 8px;
                    border-left: 3px solid #3498db;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease, padding 0.3s ease;
                }
                
                .password-help.show {
                    max-height: 200px;
                    padding: 0.75rem;
                }
                
                .bullet-point {
                    width: 6px;
                    height: 6px;
                    background-color: #3498db;
                    border-radius: 50%;
                }
                
                .update-btn {
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    border-radius: 10px;
                    background: linear-gradient(to right, #3498db, #2c3e50);
                    border: none;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                }
                
                .update-btn:hover {
                    background: linear-gradient(to right, #2c3e50, #3498db);
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }
                
                .update-btn:active {
                    transform: translateY(1px);
                }
                
                .update-btn.submitting::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    animation: loading 1.5s infinite;
                }
                
                @keyframes loading {
                    100% { left: 100%; }
                }
                
                .details-scrollbar {
                    width: 100%;
                    height: 100%;
                    border-radius: 10px;
                }
                
                .profile-details {
                    background-color: #f8f9fa;
                    border-radius: 10px;
                    height: 100%;
                    padding: 1.5rem;
                }
                
                .section-title {
                    font-weight: 600;
                    color: #2c3e50;
                    margin-bottom: 1.5rem;
                    position: relative;
                    padding-bottom: 0.5rem;
                }
                
                .section-title::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(to right, #3498db, #2c3e50);
                    border-radius: 3px;
                }
                
                .detail-item {
                    padding: 1rem;
                    background: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s;
                    margin-bottom: 1rem;
                }
                
                .detail-item:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }
                
                .detail-label {
                    font-weight: 500;
                    color: #6c757d;
                    margin-bottom: 0.5rem;
                }
                
                .detail-value {
                    color: #2c3e50;
                    margin-bottom: 0;
                    font-weight: 500;
                }
                
                .status-badge {
                    display: inline-block;
                    padding: 0.35em 0.65em;
                    font-size: 0.75em;
                    font-weight: 700;
                    line-height: 1;
                    color: #fff;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: baseline;
                    border-radius: 0.25rem;
                    background-color: #28a745;
                }
                
                .benefits-list {
                    list-style: none;
                    padding-left: 0;
                    margin-bottom: 2rem;
                }
                
                .benefit-item {
                    position: relative;
                    padding-left: 1.75rem;
                    margin-bottom: 1rem;
                    color: #495057;
                }
                
                .benefit-icon {
                    position: absolute;
                    left: 0;
                    top: 0.2rem;
                    color: #3498db;
                }
                
                .benefit-icon::before {
                    content: '✓';
                    font-weight: bold;
                }
                
                .security-tip {
                    background-color: #e3f2fd;
                    border-radius: 8px;
                    color: #0d47a1;
                    font-size: 0.9rem;
                    padding: 1rem;
                    margin-bottom: 2rem;
                }
                
                .activity-section {
                    margin-top: 2rem;
                }
                
                .activity-item {
                    display: flex;
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #eee;
                }
                
                .activity-item:last-child {
                    border-bottom: none;
                    margin-bottom: 0;
                    padding-bottom: 0;
                }
                
                .activity-date {
                    font-size: 0.8rem;
                    color: #6c757d;
                    min-width: 80px;
                }
                
                .activity-text {
                    flex-grow: 1;
                    color: #495057;
                }
            `}</style>

            {message.text && (
                <div className="message-container">
                    <Message variant={message.variant}>{message.text}</Message>
                </div>
            )}
            <Container fluid className="profile-container">
                <Row className="justify-content-center">
                    <Col lg={10} xl={8}>
                        <div className="profile-card-wrapper">
                            <div className="profile-card">
                                <div className="card-body p-4 p-md-5">
                                    <Row>
                                        <Col md={5} className="pr-md-4">
                                            <div className="profile-header mb-4">
                                                <div 
                                                    className="profile-image-container"
                                                    onClick={triggerFileInput}
                                                >
                                                    {previewImage ? (
                                                        <img 
                                                            src={previewImage} 
                                                            alt="Profile" 
                                                            className="profile-image"
                                                        />
                                                    ) : (
                                                        <FaUserCircle className="profile-icon" />
                                                    )}
                                                    <div className="upload-overlay">
                                                        <FaCamera className="camera-icon" />
                                                        <span>Change Photo</span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleImageChange}
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                />
                                                <h2 className="profile-title">{name || 'User Profile'}</h2>
                                                <p className="profile-role">{role || 'Member'}</p>
                                            </div>

                                            {loading ? (
                                                <Loader />
                                            ) : (
                                                <form onSubmit={submitHandler} className="profile-form">
                                                    <Form.Group controlId='name' className="mb-3 form-group-animate">
                                                        <Form.Label>Name <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter name"
                                                            value={name}
                                                            required
                                                            onChange={(e) => setName(e.target.value)}
                                                            className="form-control-lg input-animate"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group controlId='email' className="mb-3 form-group-animate">
                                                        <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Enter email"
                                                            value={email}
                                                            required
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            className="form-control-lg input-animate"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group controlId='role' className="mb-3 form-group-animate">
                                                        <Form.Label>Role <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            as="select"
                                                            value={role}
                                                            required
                                                            onChange={(e) => setRole(e.target.value)}
                                                            className="form-control-md select-animate"
                                                        >
                                                            <option value="Farmer">Farmer</option>
                                                            <option value="Consumer">Consumer</option>
                                                            <option value="Supplier">Supplier</option>
                                                        </Form.Control>
                                                    </Form.Group>

                                                    <Form.Group controlId='address' className="mb-3 form-group-animate">
                                                        <Form.Label>Address <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter address"
                                                            value={address}
                                                            required
                                                            onChange={(e) => setAddress(e.target.value)}
                                                            className="form-control-lg input-animate"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group controlId='phone' className="mb-3 form-group-animate">
                                                        <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter phone number"
                                                            value={phonenumber}
                                                            required
                                                            onChange={(e) => setPhonenumber(e.target.value)}
                                                            className="form-control-lg input-animate"
                                                        />
                                                    </Form.Group>

                                                    <Form.Group controlId='password' className="mb-3 form-group-animate">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <Form.Label>
                                                                Password <FaInfoCircle 
                                                                    className="text-info ms-2 cursor-pointer"
                                                                    onMouseEnter={() => setShowPasswordHelp(true)}
                                                                    onMouseLeave={() => setShowPasswordHelp(false)}
                                                                />
                                                            </Form.Label>
                                                        </div>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Enter new password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            className="form-control-lg input-animate"
                                                        />
                                                        <div className={`password-help mt-2 ${showPasswordHelp ? 'show' : ''}`}>
                                                            <small className="text-muted">
                                                                {passwordRequirements.map((req, i) => (
                                                                    <div key={i} className="d-flex align-items-center mb-1">
                                                                        <div className="bullet-point me-2"></div>
                                                                        {req}
                                                                    </div>
                                                                ))}
                                                            </small>
                                                        </div>
                                                    </Form.Group>

                                                    <Form.Group controlId='confirmPassword' className="mb-4 form-group-animate">
                                                        <Form.Label>Confirm Password</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Confirm new password"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            className="form-control-lg input-animate"
                                                        />
                                                    </Form.Group>

                                                    <Button 
                                                        type="submit" 
                                                        variant="primary" 
                                                        size="lg" 
                                                        className={`w-100 update-btn ${isSubmitting ? 'submitting' : ''}`}
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                Updating...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaUpload className="me-2" />
                                                                Update Profile
                                                            </>
                                                        )}
                                                    </Button>
                                                </form>
                                            )}
                                        </Col>

                                        <Col md={7} className="pl-md-4 mt-4 mt-md-0">
                                            <Scrollbar className="details-scrollbar">
                                                <div className="profile-details p-3">
                                                    <h4 className="section-title">Account Details</h4>
                                                    
                                                    <div className="detail-item mb-3">
                                                        <h6 className="detail-label">Member Since</h6>
                                                        <p className="detail-value">
                                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            }) : 'N/A'}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="detail-item mb-3">
                                                        <h6 className="detail-label">Account Status</h6>
                                                        <span className="status-badge">Active</span>
                                                    </div>
                                                    
                                                    <div className="detail-item mb-3">
                                                        <h6 className="detail-label">Last Updated</h6>
                                                        <p className="detail-value">
                                                            {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            }) : 'N/A'}
                                                        </p>
                                                    </div>
                                                    
                                                    <h4 className="section-title mt-4">Role Benefits</h4>
                                                    <ul className="benefits-list">
                                                        {role && roleBenefits[role]?.map((benefit, index) => (
                                                            <li key={index} className="benefit-item">
                                                                <span className="benefit-icon"></span>
                                                                {benefit}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    
                                                    <div className="security-tip">
                                                        <FaKey className="me-2" />
                                                        <strong>Security Tip:</strong> Always keep your password private and change it every 3 months.
                                                    </div>
                                                </div>
                                            </Scrollbar>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ProfileScreen;