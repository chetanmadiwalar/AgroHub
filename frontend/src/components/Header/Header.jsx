import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import styled, { keyframes, css } from 'styled-components';
import { logout } from './../../actions/userActions';
import { useLocation } from 'react-router-dom';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const StyledNavbar = styled(Navbar)`
  background: linear-gradient(135deg, #1a1a40, #4b0082);
  background-size: 200% 200%;
  animation: ${css`${gradientBG} 15s ease infinite`};
  width: 100%;
  color: white !important;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  padding: 15px 0;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
`;

const NavLink = styled(Nav.Link)`
  color: white !important;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 15px;
  position: relative;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  animation: ${fadeIn} 0.5s ease-out;
  margin: 0 5px;
  border-radius: 4px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff !important;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background: linear-gradient(90deg, #ff6600, #ffcc00);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 100%;
    box-shadow: 0 0 10px rgba(255, 102, 0, 0.7);
  }
`;

const StyledNavDropdown = styled(NavDropdown)`
  .dropdown-toggle {
    color: white !important;
    font-weight: bold;
    animation: ${fadeIn} 0.5s ease-out;
    transition: all 0.3s ease;
    padding: 8px 15px;
    border-radius: 4px;
    min-width: 120px; /* Set minimum width for the toggle */
    text-align: center; /* Center the text */

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .dropdown-menu {
    border: none;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, #2c3e50, #4b0082);
    overflow: hidden;
    animation: ${slideInRight} 0.3s ease-out;
    margin-top: 5px;
    min-width: 150px !important; /* Set fixed width */
    width: 150px !important; /* Ensure width is fixed */
    right: 0 !important; /* Align to right */
    left: auto !important; /* Override default left positioning */
  }

  .dropdown-item {
    color: white !important;
    padding: 10px 20px; /* Slightly reduced padding */
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    white-space: nowrap; /* Prevent text wrapping */
    text-overflow: ellipsis; /* Add ellipsis if text is too long */

    &:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      transform: translateX(5px);
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 3px;
      height: 100%;
      background: linear-gradient(to bottom, #ff6600, #ffcc00);
      transform: translateX(-10px);
      transition: transform 0.3s ease;
    }

    &:hover::before {
      transform: translateX(0);
    }
  }

  .dropdown-divider {
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const LogoImage = styled(Image)`
  width: 80px;
  transition: transform 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  margin-left: 20px;
`;


const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const location = useLocation();

    const logoutHandler = () => {
        dispatch(logout());
    };

    const scrollToSection = () => {
        const section = document.getElementById("scroll");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };
    const isHomePage = location.pathname === '/';

    return (
        <StyledNavbar collapseOnSelect expand="lg" fixed="top">
            <LinkContainer to="/">
                <Navbar.Brand>
                    <LogoImage src="/Logo.png" />
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'rgba(255,255,255,0.5)' }} />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto" style={{ alignItems: 'center',marginRight :'10px'}}>
                    {userInfo ? (
                        <>
                            {userInfo && userInfo.role === 'Farmer' && (
                                <>
                                    <LinkContainer to='/farmers/dashboard'>
                                        <NavLink>DASHBOARD</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to='/farmers/products'>
                                        <NavLink>MY PRODUCTS</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to='/farmers/purchaseSeeds'>
                                        <NavLink>BUY PRODUCTS</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to='/farmers/lendMachines'>
                                        <NavLink>LEND MACHINES</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to='/cart'>
                                        <NavLink>CART</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to='/myOrders'>
                                        <NavLink>MY ORDERS</NavLink>
                                    </LinkContainer>
                                </>
                            )}
                            {userInfo && userInfo.role === 'Consumer' && (
                                <>
                                    <LinkContainer to='/consumer'>
                                        <NavLink>HOME</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to='/cart'>
                                        <NavLink>CART</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to='/myOrders'>
                                        <NavLink>MY ORDERS</NavLink>
                                    </LinkContainer>
                                </>
                            )}
                            {userInfo && userInfo.role === 'Supplier' && (
                                <>
                                    <LinkContainer to='/supplier/dashboard'>
                                        <NavLink>DASHBOARD</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to='/supplier/myproducts'>
                                        <NavLink>MY PRODUCTS</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to='/supplier/mymachines'>
                                        <NavLink>MY MACHINES</NavLink>
                                    </LinkContainer>
                                </>
                            )}
                            <StyledNavDropdown title={(userInfo.name || 'USER').toUpperCase()} id='username'>
                                {userInfo && userInfo.isAdmin && (
                                    <>
                                        <LinkContainer to='/admin/dashboard'>
                                            <NavDropdown.Item>
                                                <i className="fas fa-tachometer-alt mr-2"></i> DASHBOARD
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                    </>
                                )}
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>
                                        <i className="fas fa-user-circle mr-2"></i> PROFILE
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider />
                                <LinkContainer to='/login'>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        <i className="fas fa-sign-out-alt mr-2"></i> LOGOUT
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </StyledNavDropdown>
                        </>
                    ) : (
                        <>
                            <LinkContainer to="/">
                                <NavLink>HOME</NavLink>
                            </LinkContainer>
                            <LinkContainer to="login?redirect=farmer">
                                <NavLink>FARMER</NavLink>
                            </LinkContainer>
                            <LinkContainer to="login?redirect=consumer">
                                <NavLink>CONSUMER</NavLink>
                            </LinkContainer>
                            <LinkContainer to="login?redirect=supplier">
                                <NavLink>SUPPLIER</NavLink>
                            </LinkContainer>
                            <LinkContainer to="/login?redirect=admin">
                                <NavLink>ADMIN</NavLink>
                            </LinkContainer>
                                {isHomePage && (
                                    <NavLink onClick={scrollToSection}>REGISTER</NavLink>
                                )}
                        </>
                    )}
                </Nav>
            </Navbar.Collapse>
        </StyledNavbar>
    );
};

export default Header;