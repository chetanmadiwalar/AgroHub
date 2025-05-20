import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Col, Button } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import Rating from '../Rating/Rating';

// Animations
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

const hoverPop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const SeedCard = styled(Card)`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  height: 100%;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: white;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    animation: ${gradientShift} 3s ease infinite;
    background-size: 200% 200%;
  }

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    animation: ${hoverPop} 1s ease;
  }
`;

const SeedImage = styled(Card.Img)`
  width: 100%;
  height: 200px;
  object-fit: contain;
  padding: 1rem;
  transition: transform 0.5s ease;

  ${SeedCard}:hover & {
    transform: scale(1.05);
  }
`;

const SeedTitle = styled(Card.Title)`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2c3e50;
  transition: color 0.3s ease;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #28a745;
  }
`;

const PriceText = styled(Card.Text)`
  color: #28a745;
  font-weight: 700;
  font-size: 1.4rem;
  margin: 1rem 0;
  text-align: center;
`;

const PreviewButton = styled(Button)`
  background: linear-gradient(135deg, #28a745, #5cb85c);
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.4s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #218838, #4cae4c);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const PurchaseSeeds = ({ _id, name, rating, image, numReviews, price }) => {
    return (
        <Col sm={12} md={6} lg={4} className="mb-4">
            <SeedCard className="my-3 p-3">
                <SeedImage src={image} variant="top" />
                <Card.Body className="d-flex flex-column">
                    <LinkContainer to={`/farmers/purchaseSeeds/${_id}`}>
                        <SeedTitle as="div">
                            <strong>{name}</strong>
                        </SeedTitle>
                    </LinkContainer>
                    <Card.Text className="text-center">
                        <Rating
                            value={rating}
                            text={`${numReviews} reviews`}
                        />
                    </Card.Text>
                    <PriceText as="div">
                        ₹{price}
                    </PriceText>
                    <LinkContainer to={`/farmers/purchaseSeeds/${_id}`}>
                        <PreviewButton variant="success">
                            Preview Here <i className="fas fa-arrow-right"></i>
                        </PreviewButton>
                    </LinkContainer>
                </Card.Body>
            </SeedCard>
        </Col>
    );
};

export default PurchaseSeeds;