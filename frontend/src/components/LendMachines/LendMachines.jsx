import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, Col } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

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
const MachineCard = styled(Card)`
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
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    animation: ${hoverPop} 1s ease-in-out;
  }
`;

const MachineImage = styled(Card.Img)`
  width: 250px;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin: auto;
  padding: 10px;
  transition: transform 0.4s ease;
`;

const MachineTitle = styled(Card.Title)`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2c3e50;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #3498db;
  }
`;

const PriceText = styled(Card.Text)`
  color: #e67e22;
  font-weight: 700;
  font-size: 1.3rem;
  margin: 1rem 0;
`;

const DetailText = styled(Card.Text)`
  color: #7f8c8d;
  font-size: 0.95rem;
  margin-bottom: 0.75rem;

  span {
    color: #34495e;
    font-weight: 600;
  }
`;

const PreviewButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2980b9);
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
    background: linear-gradient(135deg, #2980b9, #3498db);
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LendMachines = ({ _id, name, image, targetPlant, price }) => {
    return (
        <Col sm={12} md={6} lg={4} className="mb-4">
            <MachineCard className="my-3 p-3">
                <MachineImage src={image} variant="top" />
                <Card.Body className="d-flex flex-column">
                    <LinkContainer to={`/farmers/lendMachines/${_id}`}>
                        <MachineTitle as="div">
                            <strong>{name}</strong>
                        </MachineTitle>
                    </LinkContainer>
                    <DetailText as="div">
                        <span>Target Plants</span><br />{targetPlant}
                    </DetailText>
                    <PriceText as="div">₹{price}</PriceText>
                    <LinkContainer to={`/farmers/lendMachines/${_id}`}>
                        <PreviewButton>
                            Preview Machine <i className="fas fa-arrow-right"></i>
                        </PreviewButton>
                    </LinkContainer>
                </Card.Body>
            </MachineCard>
        </Col>
    );
};

export default LendMachines;