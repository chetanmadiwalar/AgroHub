import React from 'react';
import CardMenu from '../../components/CardMenuSet/CardMenu';
import Meta from '../../components/Helmet/Meta';
import OurServices from '../../components/OurServices/OurServices';
import SliderComponent from '../../components/Slider/Slider';
import GenralMap from '../Map/GenralMap';

const HomeScreen = () => {
    return (
        <>
            <style>{`
                :root {
                    --primary-color: #2c7be5;
                    --secondary-color: #6e84a3;
                    --accent-color: #00d97e;
                    --dark-color: #12263f;
                    --light-color: #f9fbfd;
                    --gradient-primary: linear-gradient(135deg, #2c7be5 0%, #6e84a3 100%);
                    --gradient-accent: linear-gradient(135deg, #00d97e 0%, #2c7be5 100%);
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes scaleUp {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }

                #how-it-works {
                    background: var(--light-color);
                    padding: 80px 0;
                    position: relative;
                    overflow: hidden;
                }

                #how-it-works h2 {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: var(--dark-color);
                    margin-bottom: 40px;
                    position: relative;
                    display: inline-block;
                    animation: fadeInUp 0.8s ease-out;
                }

                #how-it-works h2::after {
                    content: '';
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80px;
                    height: 4px;
                    border-radius: 2px;
                }

                .cen {
                    display: flex;
                    justify-content: space-evenly;
                    align-items: stretch;
                    flex-wrap: wrap;
                    gap: 30px;
                }

                .feature-box {
                    background: white;
                    padding: 30px 25px;
                    border-radius: 16px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    animation: scaleUp 0.6s ease-out;
                    flex: 1 1 250px;
                    min-width: 250px;
                    max-width: 300px;
                    position: relative;
                    overflow: hidden;
                }

                .feature-box:hover {
                    transform: translateY(-10px) scale(1.02);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                }

                .feature-box h4 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--dark-color);
                    margin-bottom: 15px;
                    position: relative;
                }

                .feature-box p {
                    font-size: 1.05rem;
                    color: var(--secondary-color);
                    line-height: 1.6;
                }

                .feature-icon {
                    font-size: 2.5rem;
                    color: var(--primary-color);
                    margin-bottom: 20px;
                    display: inline-block;
                    animation: fadeIn 0.8s ease-out;
                }

                /* Responsive adjustments */
                @media (max-width: 1200px) {
                    .feature-box {
                        flex: 1 1 220px;
                    }
                }

                @media (max-width: 992px) {
                    #how-it-works {
                        padding: 60px 20px;
                    }
                    
                    .cen {
                        gap: 20px;
                    }
                    
                    .feature-box {
                        flex: 1 1 200px;
                        min-width: 200px;
                        padding: 25px 20px;
                    }
                    
                    .feature-box h4 {
                        font-size: 1.3rem;
                    }
                    
                    .feature-box p {
                        font-size: 1rem;
                    }
                }

                @media (max-width: 768px) {
                    #how-it-works h2 {
                        font-size: 2rem;
                        margin-bottom: 30px;
                    }
                    
                    .feature-box {
                        max-width: 100%;
                        min-width: 100%;
                    }
                    
                    .feature-icon {
                        font-size: 2rem;
                    }
                }

                @media (max-width: 576px) {
                    #how-it-works {
                        padding: 50px 15px;
                    }
                    
                    #how-it-works h2 {
                        font-size: 1.8rem;
                    }
                    
                    .feature-box {
                        padding: 20px 15px;
                    }
                    
                    .feature-box h4 {
                        font-size: 1.2rem;
                    }
                    
                    .feature-box p {
                        font-size: 0.95rem;
                    }
                    
                    .feature-icon {
                        font-size: 1.8rem;
                        margin-bottom: 15px;
                    }
                }
            `}</style>

            <Meta />
            <SliderComponent />
            <CardMenu />
            <OurServices />

            <section id="how-it-works" className="text-center">
                <div className="container">
                    <h2>How It Works</h2>
                    <div className="row mt-4 cen">
                        <div className="feature-box">
                            <div className="feature-icon">📝</div>
                            <h4>1. Sign Up</h4>
                            <p>Choose your role as Farmer, Consumer, or Supplier and start your journey in simple steps.</p>
                        </div>
                        <div className="feature-box">
                            <div className="feature-icon">🔍</div>
                            <h4>2. Explore</h4>
                            <p>Discover a marketplace to buy crops, rent agricultural machines, or sell your products.</p>
                        </div>
                        <div className="feature-box">
                            <div className="feature-icon">📈</div>
                            <h4>3. Earn & Grow</h4>
                            <p>Maximize your profits by selling harvests, tracking orders, and managing your business.</p>
                        </div>
                    </div>
                </div>
            </section>

            <GenralMap />
        </>
    );
}

export default HomeScreen;