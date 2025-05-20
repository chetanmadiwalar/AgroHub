import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UserList from '../../components/DashBoard/UserList/UserList'
import Meta from '../../components/Helmet/Meta'
import SideBarComponents from '../../components/SideBar/SideBarComponents'
import styled, { keyframes } from 'styled-components';

const SectionTitle = styled.h4`
  color: #2c3e50;
  font-weight: 700;
  position: relative;
`;

const UserListScreen = () => {
    return (
        <div style={{ marginTop: "110px" }}>
            <Meta
                title="AgroHub | Admin Users"
            />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <SectionTitle>AgroHub Users</SectionTitle>
                    </Col>
                    <Col md={9}>
                        <SectionTitle style={{ marginLeft: "30px" }}>User List</SectionTitle>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <SideBarComponents />
                    </Col>
                    <Col md={9}>
                        <UserList />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UserListScreen
