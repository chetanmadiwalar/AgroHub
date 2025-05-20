import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import styled, { keyframes } from 'styled-components';
import Message from '../../Message/Message';
import Loader from '../../Loader/Loader';
import MapStyles from './MapStyles';
import { listUsers } from '../../../actions/userActions';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const MapContainer = styled.div`
  position: relative;
  width: 100%;
  // height: 100vh;
  overflow: hidden;
`;

const ControlPanel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  padding: 10px 15px;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  gap: 10px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    top: 16px;
    right: 16px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    padding: 8px 12px;
    right: 30px;
  }

  @media (max-width: 576px) {
    width: auto;
    right: 30px;
    top: 10px;
    padding: 6px 10px;
    gap: 8px;
  }

  @media (max-width: 400px) {
    gap: 6px;
    padding: 5px 8px;
  }
`;




const MapButton = styled(Button)`
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px 16px;
    font-size: 0.9rem;
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 576px) {
    font-size: 0.85rem;
    padding: 6px 14px;
  }

  @media (max-width: 400px) {
    font-size: 0.8rem;
    padding: 5px 12px;
  }
`;



const InfoWindowContainer = styled.div`
  max-width: 250px;
  padding: 10px;
`;

const UserAvatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 10px;
  border: 3px solid ${props => props.role === 'Farmer' ? '#4CAF50' : '#2196F3'};
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserName = styled.h5`
  margin-bottom: 5px;
  text-align: center;
  color: #2c3e50;
  font-weight: 600;
`;

const UserRoleBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 15px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.role === 'Farmer' ? '#4CAF50' : '#2196F3'};
  color: white;
`;

const InfoDivider = styled.hr`
  margin: 10px 0;
  border: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #ddd, transparent);
`;

const InfoItem = styled.p`
  margin-bottom: 8px;
  font-size: 0.85rem;
  color: #34495e;
  display: flex;
  align-items: center;
`;

const InfoIcon = styled.i`
  margin-right: 8px;
  width: 20px;
  text-align: center;
  color: ${props => props.role === 'Farmer' ? '#4CAF50' : '#2196F3'};
`;

const ZoomControls = styled.div`
  position: absolute;
  right: 20px;
  bottom: 30px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ZoomButton = styled.button`
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f1f1;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const MapComponent = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const mapRef = useRef(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState('farmers');
  const [usersWithLocation, setUsersWithLocation] = useState([]);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
    const mapInstanceRef = useRef(null);

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;
  console.log(users);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const mapContainerRef = useRef(null);

useEffect(() => {
  dispatch(listUsers());
}, [dispatch]);



  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (!e.ctrlKey && !e.metaKey) {
        setIsCtrlPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);


  const zoomIn = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(Math.min(20, currentZoom + 1));
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setZoom(Math.max(1, currentZoom - 1));
    }
  };

  const getMarkerIcon = (role) => {
    if (!window.google || !window.google.maps) return null;
    
    const farmerIcon = {
      url: '/images/farmer.png',
      scaledSize: new window.google.maps.Size(40, 40),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(20, 40)
    };

    const supplierIcon = {
      url: '/images/supplier.png',
      scaledSize: new window.google.maps.Size(40, 40),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(20, 40)
    };

    return role === 'Farmer' ? farmerIcon : supplierIcon;
  };

  useEffect(() => {
    if (users) {
      const validUsers = users
        .filter(user => activeTab === 'farmers' ? user.role === 'Farmer' : user.role === 'Supplier')
        .filter(user => user.latitude && user.longitude);
      
      setUsersWithLocation(validUsers);
    }
  }, [users, activeTab]);

  return (
    <>
      <ControlPanel>
        <MapButton 
          variant={activeTab === 'farmers' ? 'success' : 'outline-success'}
          onClick={() => setActiveTab('farmers')}
        >
          <i className="fas fa-tractor"></i> Farmers
        </MapButton>
        <MapButton 
          variant={activeTab === 'suppliers' ? 'primary' : 'outline-primary'}
          onClick={() => setActiveTab('suppliers')}
        >
          <i className="fas fa-truck"></i> Suppliers
        </MapButton>
      </ControlPanel>

      <MapContainer>
        <GoogleMap
        defaultCenter={{ lat: 6.927079, lng: 79.861244 }}
        defaultZoom={5}
        defaultOptions={{ 
          styles: MapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative'
        }}
      >
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            usersWithLocation.map((user) => (
              <Marker
                key={user._id}
                position={{
                  lat: parseFloat(user.latitude),
                  lng: parseFloat(user.longitude)
                }}
                onClick={() => {
                  setSelectedUser(user);
                }}
                icon={getMarkerIcon(user.role)}
                animation={window.google.maps.Animation.DROP}
              />
            ))
          )}

          {selectedUser && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedUser.latitude),
                lng: parseFloat(selectedUser.longitude)
              }}
              onCloseClick={() => {
                setSelectedUser(null);
              }}
              options={{
                pixelOffset: new window.google.maps.Size(0, -40)
              }}
            >
              <InfoWindowContainer>
                <UserAvatar role={selectedUser.role}>
                  <UserImage 
                    src={
                      selectedUser.image ||
                      (selectedUser.role === 'Farmer'
                        ? '/images/farmer.png'
                        : '/images/supplier2.png')
                    }
                    alt={selectedUser.name}
                  />
                </UserAvatar>
                <UserName>{selectedUser.name}</UserName>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <UserRoleBadge role={selectedUser.role}>
                    {selectedUser.role}
                  </UserRoleBadge>
                </div>
                
                <InfoDivider />
                
                <InfoItem>
                  <InfoIcon 
                    role={selectedUser.role} 
                    className="fas fa-map-marker-alt"
                  />
                  {selectedUser.address || 'Location not specified'}
                </InfoItem>
                
                {selectedUser.role === 'Farmer' && (
                  <InfoItem>
                    <InfoIcon 
                      role={selectedUser.role} 
                      className="fas fa-seedling"
                    />
                    {selectedUser.specialization || 'General farming'}
                  </InfoItem>
                )}
                
                {selectedUser.role === 'Supplier' && (
                  <InfoItem>
                    <InfoIcon 
                      role={selectedUser.role} 
                      className="fas fa-boxes"
                    />
                    {selectedUser.supplies || 'Various supplies'}
                  </InfoItem>
                )}
                
                <InfoItem>
                  <InfoIcon 
                    role={selectedUser.role} 
                    className="fas fa-envelope"
                  />
                  {selectedUser.email || 'Email not provided'}
                </InfoItem>
                
                <InfoItem>
                  <InfoIcon 
                    role={selectedUser.role} 
                    className="fas fa-phone-alt"
                  />
                  {selectedUser.phone || selectedUser.phonenumber || 'Contact not provided'}
                </InfoItem>
              </InfoWindowContainer>
            </InfoWindow>
          )}
        </GoogleMap>

        <ZoomControls>
          <ZoomButton onClick={zoomIn} title="Zoom In">
            <i className="fas fa-plus"></i>
          </ZoomButton>
          <ZoomButton onClick={zoomOut} title="Zoom Out">
            <i className="fas fa-minus"></i>
          </ZoomButton>
        </ZoomControls>
      </MapContainer>
    </>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

export default WrappedMap;