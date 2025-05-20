import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import styled, { keyframes, css } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from { 
    opacity: 1;
    transform: translateY(0);
  }
  to { 
    opacity: 0;
    transform: translateY(-20px);
  }
`;

// Styled components
const MessageContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1050;
  min-width: 300px;
  max-width: 90vw;
`;

const StyledAlert = styled(Alert)`
  position: relative;
  padding: 15px 20px;
  margin-bottom: 1rem;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-size: 15px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  animation: ${fadeIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  white-space: nowrap;
  
  ${props => props.$isClosing && css`
    animation: ${fadeOut} 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
  `}

  /* Variant styles */
  ${props => props.variant === 'success' && css`
    background: linear-gradient(135deg, #4CAF50, #2E7D32);
    color: white;
  `}

  ${props => props.variant === 'danger' && css`
    background: linear-gradient(135deg, #f44336, #c62828);
    color: white;
  `}

  ${props => props.variant === 'warning' && css`
    background: linear-gradient(135deg, #FFA000, #F57C00);
    color: white;
  `}

  ${props => props.variant === 'info' && css`
    background: linear-gradient(135deg, #2196F3, #1565C0);
    color: white;
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  opacity: 0.7;
  font-size: 18px;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-left: 15px;

  &:hover {
    opacity: 1;
  }
`;

const IconWrapper = styled.span`
  margin-right: 12px;
  font-size: 20px;
`;

const ContentWrapper = styled.div`
  display: inline-block;
  max-width: calc(90vw - 100px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Message = ({ 
  variant, 
  children, 
  duration = 5000,
  onClose,
  dismissible = true 
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timer;
    
    if (duration && isVisible) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => clearTimeout(timer);
  }, [duration, isVisible]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 400); // Match fadeOut animation duration
  };

  if (!isVisible) return null;

  // Get appropriate icon for variant
  const getIcon = () => {
    switch(variant) {
      case 'success':
        return '✓';
      case 'danger':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ⓘ';
      default:
        return 'ⓘ';
    }
  };

  return (
    <MessageContainer>
      <StyledAlert variant={variant} $isClosing={isClosing}>
        <IconWrapper>{getIcon()}</IconWrapper>
        <ContentWrapper>
          {children}
        </ContentWrapper>
        {/* {dismissible && (
          <CloseButton onClick={handleClose} aria-label="Close">
            &times;
          </CloseButton>
        )} */}
      </StyledAlert>
    </MessageContainer>
  );
};

Message.defaultProps = {
  variant: 'info',
  duration: 5000,
  dismissible: true
};

export default Message;