import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './listStyles.css';
import { Scrollbar } from "react-scrollbars-custom";
import StatCards from './StatCards/StatCards';
import Bar from './BarChart/Bar';
import LineChart from './LineChart/LineChart';

const StatisticsList = () => {
    return (
        <Scrollbar style={{ width: '100%', height: '100vh' }}>
            <Container fluid className="py-4 px-3">
                <Row className="list-container mb-4">
                    <StatCards />
                </Row>

                <Row className="gy-4">
                    <Col xs={12} md={6}>
                        <div className="chart-wrapper">
                            <LineChart />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="chart-wrapper">
                            <Bar />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Scrollbar>
    );
};

export default StatisticsList;
