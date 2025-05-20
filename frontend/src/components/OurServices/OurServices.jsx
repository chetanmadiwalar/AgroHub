import React from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'
import './ourSerices.css'

const OurServices = () => {
    return (
        <Container className="main" fluid style={{ padding: '60px 20px' }}>
            <style>{`
                .main {
                    background: #f9fbfd;
                    padding: 80px 0;
                    text-align: center;
                }
                
                .main-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #12263f;
                    margin-bottom: 20px;
                    position: relative;
                    display: inline-block;
                }
                
                .main-title::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 4px;
                    border-radius: 2px;
                }
                
                .description {
                    font-size: 1.1rem;
                    color: #6e84a3;
                    max-width: 800px;
                    margin: 0 auto 50px;
                    line-height: 1.7;
                }
                
                .services {
                    margin-top: 40px;
                }
                
                .sub-title {
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #12263f;
                    margin: 20px 0 15px;
                }
                
                .img {
                    height: 120px;
                    margin-bottom: 20px;
                    object-fit: contain;
                }
                
                .sub-desc {
                    font-size: 1rem;
                    color: #6e84a3;
                    line-height: 1.6;
                    padding: 0 15px;
                }
                
                /* Responsive styles */
                @media (max-width: 992px) {
                    .main {
                        padding: 60px 20px;
                    }
                    
                    .main-title {
                        font-size: 2.2rem;
                    }
                    
                    .description {
                        font-size: 1rem;
                        margin-bottom: 40px;
                    }
                    
                    .sub-title {
                        font-size: 1.3rem;
                    }
                    
                    .img {
                        height: 100px;
                    }
                }
                
                @media (max-width: 768px) {
                    .main-title {
                        font-size: 2rem;
                    }
                    
                    .description {
                        padding: 0 20px;
                    }
                    
                    .services .row > div {
                        margin-bottom: 30px;
                    }
                    
                    .sub-title {
                        font-size: 1.2rem;
                    }
                    
                    .img {
                        height: 90px;
                    }
                }
                
                @media (max-width: 576px) {
                    .main {
                        padding: 50px 15px;
                    }
                    
                    .main-title {
                        font-size: 1.8rem;
                    }
                    
                    .description {
                        font-size: 0.95rem;
                        margin-bottom: 30px;
                    }
                    
                    .sub-title {
                        font-size: 1.1rem;
                    }
                    
                    .img {
                        height: 80px;
                    }
                    
                    .sub-desc {
                        font-size: 0.9rem;
                    }
                }
            `}</style>
            
            <h1 className="main-title">COMPREHENSIVE SERVICES</h1>
            <p className="description">
                "AgroHub offers a full suite of services to support farmers, suppliers, and consumers. From seamless buying and selling of farm produce to renting heavy machinery and accessing high-quality fertilizers, we provide everything needed for efficient agricultural operations. Our secure payment system, AI-driven recommendations, and fast logistics ensure a hassle-free experience for all users. Join AgroHub and revolutionize the way you connect with the agricultural market!"
            </p>
            <Container className="services">
                <Row>
                    <Col xs={12} sm={6} md={3}>
                        <h5 className="sub-title">Heavy Machine</h5>
                        <Image className="img" src="images/services/heavy.svg" fluid />
                        <p className="sub-desc">No need to worry of labour costing more. Just rent all types of machine here!!</p>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h5 className="sub-title">Agricultural Supplies</h5>
                        <Image className="img" src="images/services/gardening.svg" fluid />
                        <p className="sub-desc">We provides all of the gardening related products i.e seeds, pestisides and heavy machine.</p>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h5 className="sub-title">Supplier</h5>
                        <Image className="img" src="images/services/supplier.svg" fluid />
                        <p className="sub-desc">Now you produce. And we are here to sell your product. Just list your sell, and get proper pay for it.</p>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <h5 className="sub-title">Consumer</h5>
                        <Image className="img" src="images/services/consumer.svg" fluid />
                        <p className="sub-desc">Why to visit Super Store and Pay High? Order all products and get deliver at your doorstep.</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default OurServices