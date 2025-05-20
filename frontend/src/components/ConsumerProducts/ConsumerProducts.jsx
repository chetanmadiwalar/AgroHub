import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Card, Col } from "react-bootstrap";
import styled, { keyframes } from "styled-components";

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
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// Styled Components
const ProductCard = styled(Card)`
  border: none;
  border-radius: 12px;
  overflow: hidden;
  animation: ${fadeInUp} 0.6s ease-out;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    // transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    animation: ${hoverPop} 1s ease-in-out;
  }
`;

const ProductImage = styled(Card.Img)`
  width: 250px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin: auto;
  transition: transform 0.4s ease;

  ${ProductCard}:hover & {
    transform: scale(1.08);
  }
`;

const ProductTitle = styled(Card.Title)`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #27ae60;
  }
`;

const PriceText = styled(Card.Text)`
  color: #27ae60;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const DetailText = styled(Card.Text)`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  span {
    color: #34495e;
    font-weight: 600;
  }
`;

const PreviewButton = styled.button`
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(135deg, #219653, #27ae60);
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ConsumerProducts = ({ _id, prod_name, image, price, avalaible_location, prod_size }) => {
  return (
    <Col sm={12} md={6} lg={4} className="mb-4">
      <ProductCard className="my-3 p-3">
        <ProductImage src={image} />
        <Card.Body className="d-flex flex-column">
          <LinkContainer to={`/consumer/${_id}`}>
            <ProductTitle as="div">{prod_name}</ProductTitle>
          </LinkContainer>
          <PriceText as="div">
            ₹{price} <span className="text-muted">|</span> Size: {prod_size}
          </PriceText>
          <DetailText as="div">
            <i className="fas fa-map-marker-alt"></i> {avalaible_location}
          </DetailText>
          <LinkContainer to={`/consumer/${_id}`}>
            <PreviewButton>
              View Details <i className="fas fa-arrow-right"></i>
            </PreviewButton>
          </LinkContainer>
        </Card.Body>
      </ProductCard>
    </Col>
  );
};

export default ConsumerProducts;