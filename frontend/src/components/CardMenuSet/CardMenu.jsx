import React from 'react';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

// Styled Components
const CardsContainer = styled.div`
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  animation: ${fadeIn} 0.8s ease-out;
  padding: 0 15px;
`;

const StyledCard = styled(Card)`
  border: none !important;
  border-radius: 16px !important;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${scaleUp} 0.6s ease-out;
  background: white;
  position: relative;
  text-align: center;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CardBody = styled(Card.Body)`
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardTitle = styled(Card.Title)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #12263f;
  margin-bottom: 20px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    transition: width 0.3s ease;
  }

  ${StyledCard}:hover &::after {
    width: 70px;
  }
`;

const CardText = styled(Card.Text)`
  font-size: 1.05rem;
  color: #6e84a3;
  line-height: 1.7;
  margin-bottom: 25px;
  flex-grow: 1;
`;

const ExploreButton = styled(Button)`
  background: #2c7be5;
  border: none;
  border-radius: 50px;
  padding: 12px 25px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  align-self: flex-start;
  box-shadow: 0 4px 15px rgba(44, 123, 229, 0.3);
  width: auto;
  margin: 0 auto;

  &:hover {
    background: #12263f;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(44, 123, 229, 0.4);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px;
  }
`;

const CardMenu = () => {
    return (
        <Container>
            <div id='scroll' style={{ marginBottom: '12px' }}></div>
            <Row>
                <CardsContainer>
                    <StyledCard>
                        <CardBody>
                            <CardTitle accentcolor="#27ae60">Farmer</CardTitle>
                            <CardText>
                                If you are a farmer then you are at the perfect platform where you can order all of your farming-related products and sell your production directly to consumers.
                            </CardText>
                            <Link to='login?redirect=farmer'>
                                <ExploreButton>Join as a Farmer</ExploreButton>
                            </Link>
                        </CardBody>
                    </StyledCard>

                    <StyledCard>
                        <CardBody>
                            <CardTitle accentcolor="#3498db">Supplier</CardTitle>
                            <CardText>
                                Sell your wide variety of farming products through our platform. We have millions of farmers connected from all parts of the country ready to purchase.
                            </CardText>
                            <Link to='login?redirect=supplier'>
                                <ExploreButton>Join as a Supplier</ExploreButton>
                            </Link>
                        </CardBody>
                    </StyledCard>

                    <StyledCard>
                        <CardBody>
                            <CardTitle accentcolor="#e74c3c">Consumer</CardTitle>
                            <CardText>
                                No need to visit fields to get fresh grains! Order here and get farm-fresh products delivered to your doorstep. Why wait? Start shopping now.
                            </CardText>
                            <Link to='login?redirect=consumer'>
                                <ExploreButton>Join as a Consumer</ExploreButton>
                            </Link>
                        </CardBody>
                    </StyledCard>
                </CardsContainer>
            </Row>
        </Container>
    );
};

export default CardMenu;