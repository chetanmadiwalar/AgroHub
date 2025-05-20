import React from 'react';
import {
    Container,
    Row,
    CardDeck,
    Card,
    Button
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Meta from '../../components/Helmet/Meta';
import { FaWarehouse, FaUsers, FaSeedling, FaTractor, FaChartBar, FaShieldAlt, FaMoneyBillWave, FaUserCheck, FaLock, FaShippingFast, FaLeaf } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

// Animations (same as farmer screen)
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components (same structure, different colors)
const SupplierScreenWrapper = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e8f4f8 100%);
  min-height: 100vh;
  padding-bottom: 50px;
`;

const StyledContainer = styled(Container)`
  padding-top: 70px;
  padding-bottom: 40px;
`;

const SupplierHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
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

const Title = styled.h1`
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
    background: linear-gradient(90deg, #17a2b8, #5bc0de);
    border-radius: 2px;
    transform: translateX(-50%) scaleX(0.2);
    transform-origin: center;
    animation: ${underlinePulse} 2s ease-in-out infinite;
  }
`;

const Subtitle = styled.h4`
  color: #555;
  font-weight: 400;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  animation: ${fadeIn} 1.5s ease-out;
`;

const SpinIcon = styled(FaWarehouse)`
  margin-right: 10px;
  color: #17a2b8;
  animation: ${spin} 8s linear infinite;
`;

const CardRow = styled(Row)`
  margin-bottom: 50px;
`;

const CustomCardDeck = styled(CardDeck)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -15px;
`;

const SupplierCard = styled(Card)`
  width: 100%;
  max-width: 350px;
  margin: 20px;
  border-radius: 15px !important;
  overflow: hidden;
  border: none !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  background: white;
  animation: ${props => {
    if (props.position === 'left') return fadeInLeft;
    if (props.position === 'right') return fadeInRight;
    return fadeInUp;
  }} 1s ease-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
  }
`;

const FeaturedCard = styled(SupplierCard)`
  position: relative;
`;

const CardIconContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  background: rgba(23, 162, 184, 0.1);
`;

const CardIcon = styled.div`
  font-size: 2.5rem;
  color: #17a2b8;
`;

const CardTitle = styled(Card.Title)`
  font-size: 1.5rem;
  color: #2c5e1a;
  margin-bottom: 15px;
  text-align: center;
`;

const CardText = styled(Card.Text)`
  color: #666;
  text-align: center;
  margin-bottom: 20px;
`;

const ExploreButton = styled(Button)`
  background: #17a2b8;
  border: none;
  padding: 10px 25px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #138496;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(23, 162, 184, 0.4);
  }

  &::after {
    content: '→';
    margin-left: 10px;
    transition: all 0.3s ease;
  }

  &:hover::after {
    margin-left: 15px;
  }
`;

const SupplierBenefits = styled.div`
  text-align: center;
  margin-top: 50px;
  animation: ${fadeInUp} 1s ease-out;
`;

const BenefitsTitle = styled.h3`
  color: #2c5e1a;
  margin-bottom: 30px;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }
`;

const BenefitIcon = styled.div`
  width: 30px;
  height: 30px;
  background: #17a2b8;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-weight: bold;
`;

// Component
const SupplierScreen = () => {
    return (
        <SupplierScreenWrapper>
            <Meta
                title="AgroHub | Suppliers"
            />
            <StyledContainer>
                <SupplierHeader>
                    <Title>SUPPLIER PORTAL</Title>
                    <Subtitle>
                         Connect with farmers and grow your business through our trusted platform.
                    </Subtitle>
                </SupplierHeader>
                
                <CardRow className="justify-content-center">
                    <CustomCardDeck>
                        <SupplierCard position="left">
                        <CardIconContainer>
                                <CardIcon as={FaSeedling} />
                            </CardIconContainer>
                            <Card.Body>
                                <CardTitle>Agricultural Products</CardTitle>
                                <CardText>
                                    List and sell seeds, fertilizers, pesticides, and other farming inputs to thousands of verified farmers.
                                </CardText>
                                <LinkContainer to="/supplier/myproducts">
                                    <ExploreButton>
                                        LIST PRODUCTS
                                    </ExploreButton>
                                </LinkContainer>
                            </Card.Body>
                        </SupplierCard>
                        
                        <FeaturedCard>
                        <CardIconContainer>
                                <CardIcon as={FaTractor} />
                            </CardIconContainer>
                            <Card.Body>
                                <CardTitle>Farm Machinery</CardTitle>
                                <CardText>
                                    Offer tractors, harvesters, irrigation systems, and other agricultural equipment for sale or rent.
                                </CardText>
                                <LinkContainer to="/supplier/mymachines">
                                    <ExploreButton>
                                        LIST EQUIPMENT
                                    </ExploreButton>
                                </LinkContainer>
                            </Card.Body>
                        </FeaturedCard>
                        
                        <SupplierCard position="right">
                            <CardIconContainer>
                                <CardIcon as={FaChartBar} />
                            </CardIconContainer>
                            <Card.Body>
                                <CardTitle>Sales Analytics</CardTitle>
                                <CardText>
                                Track your performance and get valuable insights to strategically grow and improve your business.
                                </CardText>
                                <LinkContainer to="/supplier/dashboard">
                                    <ExploreButton>
                                        EXPLORE MORE
                                    </ExploreButton>
                                </LinkContainer>
                            </Card.Body>
                        </SupplierCard>
                    </CustomCardDeck>
                </CardRow>
                
                <SupplierBenefits>
                    <BenefitsTitle>Why Partner With Us?</BenefitsTitle>
                    <BenefitsGrid>
                        <BenefitItem>
                            <BenefitIcon><FaUserCheck /></BenefitIcon>
                            <span>Verified Farmers</span>
                        </BenefitItem>
                        <BenefitItem>
                            <BenefitIcon><FaMoneyBillWave /></BenefitIcon>
                            <span>Timely Payments</span>
                        </BenefitItem>
                        <BenefitItem>
                            <BenefitIcon><FaShieldAlt /></BenefitIcon>
                            <span>Quality Standards</span>
                        </BenefitItem>
                        <BenefitItem>
                            <BenefitIcon><FaLock /></BenefitIcon>
                            <span>Secure Transactions</span>
                        </BenefitItem>
                        <BenefitItem>
                            <BenefitIcon><FaShippingFast /></BenefitIcon>
                            <span>Logistics Support</span>
                        </BenefitItem>
                        <BenefitItem>
                            <BenefitIcon><FaChartBar /></BenefitIcon>
                            <span>Market Insights</span>
                        </BenefitItem>
                    </BenefitsGrid>
                </SupplierBenefits>
            </StyledContainer>
        </SupplierScreenWrapper>
    )
}

export default SupplierScreen;