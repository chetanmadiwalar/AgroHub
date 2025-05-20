import styled, { keyframes } from 'styled-components';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';

// Animations
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Common Styled Components
export const StyledContainer = styled(Container)`
  animation: ${fadeIn} 0.5s ease-out;
  padding: 2rem 1rem;
  max-width: 100%;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1.5rem 0.5rem;
  }
`;

export const PageHeader = styled.h1`
  color: #2c3e50;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  
  @media (max-width: 992px) {
    font-size: 1.75rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const CreateButton = styled(Button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #5a6fd1 0%, #6a4299 100%);
  }
  
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

export const StyledTable = styled(Table)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: none;
  animation: ${fadeIn} 0.6s ease-out;
  text-align: center;
  min-width: 600px;
  
  thead {
    background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
    color: white;
    
    th {
      border: none;
      padding: 1rem;
      font-weight: 600;
      
      @media (max-width: 768px) {
        padding: 0.75rem;
        font-size: 0.9rem;
      }
    }
  }
  
  tbody {
    tr {
      transition: all 0.2s ease;
      
      &:hover {
        background-color: rgba(75, 108, 183, 0.05);
        transform: translateX(5px);
      }
      
      td {
        border: none;
        border-bottom: 1px solid #eee;
        padding: 1rem;
        vertical-align: middle;
        
        @media (max-width: 768px) {
          padding: 0.75rem;
          font-size: 0.9rem;
        }
      }
    }
  }
`;

export const ActionButton = styled(Button)`
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0.25rem;
  transition: all 0.3s ease;
  
  &:hover {
    animation: ${pulse} 0.5s ease;
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
`;

export const EditButton = styled(ActionButton)`
  background-color: #4b6cb7;
  border-color: #4b6cb7;
  
  &:hover {
    background-color: #3a5a9c;
    border-color: #3a5a9c;
  }
`;

export const DeleteButton = styled(ActionButton)`
  background-color: #e74c3c;
  border-color: #e74c3c;
  
  &:hover {
    background-color: #c0392b;
    border-color: #c0392b;
  }
`;

export const ResponsiveRow = styled(Row)`
  flex-direction: row;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const HeaderCol = styled(Col)`
  display: flex;
  align-items: center;
`;

export const ButtonCol = styled(Col)`
  display: flex;
  justify-content: flex-end;
  
  @media (max-width: 576px) {
    justify-content: center;
  }
`;