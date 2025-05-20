import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled, { keyframes } from 'styled-components';

// Animations
const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const SidebarContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 60px;
  width: 280px;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 20px 15px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: sticky;
  top: 20px;
  z-index: 100;

  &:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 992px) {
    width: 220px;
    padding: 15px 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
    position: static;
    margin-bottom: 30px;
  }

  @media (max-width: 576px) {
    padding: 10px;
    border-radius: 12px;
  }
`;

const SidebarList = styled(ListGroup)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }

  @media (max-width: 576px) {
    justify-content: space-between;
  }
`;

const ListItem = styled(ListGroup.Item)`
  background: transparent;
  border: none !important;
  padding: 14px 20px;
  border-radius: 12px !important;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  animation: ${popIn} 0.5s ease forwards;
  position: relative;
  overflow: hidden;

  &:hover {
    background: linear-gradient(90deg, rgba(77, 182, 172, 0.1), transparent);
    transform: translateX(5px);
    color: #00796b;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 4px;
      background: linear-gradient(to bottom, #4db6ac, #00796b);
    }

    .icon {
      color: #00796b;
      animation: ${pulse} 0.8s ease;
    }
  }

  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  &:nth-child(5) { animation-delay: 0.5s; }

  @media (max-width: 768px) {
    flex: 1 1 45%;
    padding: 10px 12px;
    font-size: 0.95rem;
  }

  @media (max-width: 576px) {
    flex: 1 1 100%;
    justify-content: center;
  }
`;

const Icon = styled.i`
  color: #4db6ac;
  font-size: 1.3rem;
  width: 24px;
  text-align: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    width: 20px;
  }

  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const SideBarComponents = () => {
  const menuItems = [
    { path: '/admin/dashboard', icon: 'fas fa-chart-line', text: 'Dashboard' },
    { path: '/admin/userlist', icon: 'fas fa-users-cog', text: 'User List' },
    { path: '/admin/productlist', icon: 'fas fa-list', text: 'Product List' },
    { path: '/admin/orderlist', icon: 'fas fa-sort-amount-up-alt', text: 'Order List' },
    { path: '/admin/map', icon: 'fas fa-map-marker-alt', text: 'Map' }
  ];

  return (
    <SidebarContainer>
      <SidebarList>
        {menuItems.map((item, index) => (
          <LinkContainer to={item.path} key={index}>
            <ListItem>
              <Icon className={`${item.icon} icon`} />
              <span>{item.text}</span>
            </ListItem>
          </LinkContainer>
        ))}
      </SidebarList>
    </SidebarContainer>
  );
};

export default SideBarComponents;