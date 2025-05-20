import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductListHome from '../../components/DashBoard/ProductList/ProductListHome'
import Meta from '../../components/Helmet/Meta'
import SideBarComponents from '../../components/SideBar/SideBarComponents'
import styled, { keyframes } from 'styled-components';

const SectionTitle = styled.h4`
  color: #2c3e50;
  font-weight: 700;
  position: relative;
`;

const ProductListScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="AgroHub | Admin Products"
            />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <SectionTitle>AgroHub Products</SectionTitle>
                    </Col>
                    <Col md={9}>
                        <SectionTitle style={{ marginLeft: "30px" }}>Product List</SectionTitle>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <ProductListHome />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProductListScreen
