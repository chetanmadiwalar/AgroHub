import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import SideBarComponents from '../../components/SideBar/SideBarComponents'
import StatisticsList from '../../components/DashBoard/Statistics/StatisticsList';
import Meta from '../../components/Helmet/Meta';
import styled, { keyframes } from 'styled-components';

const SectionTitle = styled.h4`
  color: #2c3e50;
  font-weight: 700;
  position: relative;
`;

const DashboardScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="AgroHub | Admin Dashboard"
            />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <SectionTitle>Admin Dashboard</SectionTitle>
                    </Col>
                    <Col md={9}>
                        <SectionTitle style={{ marginLeft: "30px" }}>Statistics</SectionTitle>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <StatisticsList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default DashboardScreen
