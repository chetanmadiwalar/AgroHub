import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderList from '../../components/DashBoard/OrderList/OrderList'
import Meta from '../../components/Helmet/Meta'
import SideBarComponents from '../../components/SideBar/SideBarComponents'
import styled, { keyframes } from 'styled-components';

const SectionTitle = styled.h4`
  color: #2c3e50;
  font-weight: 700;
  position: relative;
`;

const OrderListScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="AgroHub | Admin Orders"
            />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <SectionTitle>AgroHub Orders</SectionTitle>
                    </Col>
                    <Col md={9}>
                        <SectionTitle style={{ marginLeft: "30px" }}>All Orders</SectionTitle>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <OrderList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default OrderListScreen
