import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Message from './../../components/Message/Message';
import { addToCart, removeFromCart } from './../../actions/cartActions';
import { Row, Col, ListGroup, Image, Button, Form, Card } from 'react-bootstrap';
import Meta from '../../components/Helmet/Meta';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
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

// Styled Components
const CartContainer = styled.div`
  margin-top: 90px;
  animation: ${fadeIn} 0.5s ease-out;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f0f8 100%);
  padding: 20px;
  min-height: calc(100vh - 90px);
`;

const Title = styled.h1`
  display: inline-block;
  position: relative;
  font-size: 2.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
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

const StyledCard = styled(Card)`
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4f0f8 100%);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledButton = styled(Button)`
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
  width: 100%;
  margin-top: 10px;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #2ecc71, #27ae60);
  }

  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
  }
`;

const CartItemCard = styled.div`
  border-radius: 10px;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  overflow: hidden;
  animation: ${slideIn} 0.5s ease-out forwards;
  opacity: 0;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  &:nth-child(5) { animation-delay: 0.5s; }
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
  transition: transform 0.3s ease;
  width: 80px;
  height: 80px;
  object-fit: cover;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);

  &:hover {
    transform: scale(1.1);
  }
`;

const CartContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartRow = styled(Row)`
  margin: 0 -15px;
`;

const CartCol = styled(Col)`
  padding: 0 15px;
`;

const SubtotalCard = styled(StyledCard)`
  position: sticky;
  top: 100px;
  animation: ${pulse} 3s ease-in-out infinite;
`;

const CartItemRow = styled(Row)`
  align-items: center;
  margin: 0 -5px;

  & > [class*="col-"] {
    padding: 0 5px;
  }
`;

const ItemName = styled(Link)`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-block;
  margin-bottom: 0.5rem;

  &:hover {
    color: #27ae60;
    transform: translateX(3px);
  }
`;

const ItemCategory = styled.span`
  display: block;
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-top: 0.2rem;
`;

const DeleteButton = styled(Button)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.3s ease;
  color: #e74c3c;
  background-color: rgba(231, 76, 60, 0.1);
  border: none;

  &:hover {
    background-color: rgba(231, 76, 60, 0.2);
    transform: rotate(15deg) scale(1.1);
  }
`;

const QuantitySelect = styled(Form.Control)`
  border-radius: 50px;
  padding: 6px 12px;
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  width: 80px;
  margin: 0 auto;
  transition: all 0.3s ease;
  text-align: center;

  &:focus {
    box-shadow: 0 0 0 0.25rem rgba(46, 204, 113, 0.25);
    border-color: #2ecc71;
  }
`;

// Empty Cart Component
const EmptyCart = () => {
  const floatAnimation = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  `;

  const EmptyCartContainer = styled.div`
    text-align: center;
    padding: 40px;
    animation: ${fadeIn} 0.8s ease-out;
  `;

  const EmptyCartIcon = styled.div`
    font-size: 100px;
    color: #bdc3c7;
    margin-bottom: 20px;
    animation: ${floatAnimation} 3s ease-in-out infinite;
    display: inline-block;
    
    i {
      position: relative;
      text-shadow: 0 5px 15px rgba(0,0,0,0.1);
      
      &::after {
        content: '?';
        position: absolute;
        top: -15px;
        right: -15px;
        font-size: 30px;
        color: #e74c3c;
        background: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        animation: ${pulse} 1.5s ease infinite;
      }
    }
  `;

  const EmptyCartTitle = styled.h2`
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 15px;
    position: relative;
    display: inline-block;
    animation: ${fadeIn} 1s ease-out;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, #3498db, #9b59b6);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.5s ease;
    }
    
    &:hover::after {
      transform: scaleX(1);
    }
  `;

  const EmptyCartMessage = styled.p`
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-bottom: 30px;
    line-height: 1.6;
    animation: ${fadeIn} 1.2s ease-out;
  `;

  return (
    <EmptyCartContainer>
      <EmptyCartIcon>
        <i className="fas fa-shopping-cart"></i>
      </EmptyCartIcon>
      <EmptyCartTitle>Your Cart Feels Lonely</EmptyCartTitle>
      <EmptyCartMessage>
        It looks like you haven't added anything to your cart yet. <br />
        Explore our amazing collection of agricultural products and find what you need!
      </EmptyCartMessage>
    </EmptyCartContainer>
  );
};

// Main Cart Component
const Cart = ({ match, location, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cartSeed = useSelector((state) => state.cartSeed);
  const { cartItems } = cartSeed;
  const userCartItems = cartItems.filter((item) => item.user === userInfo._id);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(match.params.id, qty, userInfo._id));
    }
  }, [dispatch, productId, qty, userInfo._id]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      history.push('/shipping');
    } else {
      history.push('/login?redirect=shipping');
    }
  };

  const getItemCategory = (item) => {
    return item.type === 'machine' ? 'Agricultural Machine' : 'Seed';
  };

  return (
    <CartContainer>
      <Meta title="AgroHub | Cart" />
      <Title>Shopping Cart</Title>
  
      {userCartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartContent>
          <CartRow>
            <CartCol md={8}>
              <div>
                {userCartItems.map((item, index) => (
                  <CartItemCard key={item.seed} style={{ animationDelay: `${index * 0.1}s` }}>
                    <CartItemRow className="w-100">
                      <Col xs={12} md={2} className="mb-2 mb-md-0">
                        <StyledImage src={item.image} alt={item.name} fluid />
                      </Col>
                      <Col xs={12} md={3} className="text-md-start mb-2 mb-md-0">
                        <ItemName to='#'>
                          {item.name}
                          <ItemCategory>{getItemCategory(item)}</ItemCategory>
                        </ItemName>
                      </Col>
                      <Col xs={4} md={2} className="text-center">
                        <div className="fw-bold">RS.{item.price}</div>
                      </Col>
                      <Col xs={4} md={3} className="text-center">
                        <QuantitySelect
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(addToCart(item.seed, Number(e.target.value), userInfo._id))
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </QuantitySelect>
                      </Col>
                      <Col xs={4} md={2} className="text-center">
                        <DeleteButton
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.seed)}
                        >
                          <i className="fas fa-trash"></i>
                        </DeleteButton>
                      </Col>
                    </CartItemRow>
                  </CartItemCard>
                ))}
              </div>
            </CartCol>
  
            {userCartItems.length > 0 && (
              <CartCol md={4}>
                <SubtotalCard>
                  <ListGroup variant="flush">
                    <ListGroup.Item style={{ padding: '1.5rem' }}>
                      <h3 style={{ marginBottom: '1rem' }}>
                        Subtotal ({userCartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                      </h3>
                      <h4 style={{ fontWeight: 'bold', color: '#27ae60' }}>
                        RS.{userCartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </h4>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ padding: '1.5rem' }}>
                      <StyledButton
                        type="button"
                        className="btn-block"
                        disabled={userCartItems.length === 0}
                        onClick={checkoutHandler}
                      >
                        Proceed To Checkout
                      </StyledButton>
                    </ListGroup.Item>
                  </ListGroup>
                </SubtotalCard>
              </CartCol>
            )}
          </CartRow>
        </CartContent>
      )}
    </CartContainer>
  );
}
export default Cart;  