import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OverLay from '../../components/DashBoard/Map/OverLay'
import Meta from '../../components/Helmet/Meta'
import SideBarComponents from '../../components/SideBar/SideBarComponents'
import styled, { keyframes } from 'styled-components';

const SectionTitle = styled.h4`
  color: #2c3e50;
  font-weight: 700;
  position: relative;
`;
const MapScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="AgroHub | Admin Map"
            />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <SectionTitle>Map</SectionTitle>
                    </Col>
                    <Col md={9}>
                        <SectionTitle style={{ marginLeft: "30px" }}>AgroHub Map</SectionTitle>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <OverLay />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MapScreen
