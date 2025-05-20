import React from 'react';
import styled from 'styled-components';

const colors = {
  primaryDark: '#111827',       // Rich forest green
  primary: '#198754',           // Bootstrap-like green
  primaryLight: '#111827',      // Bright minty green
  secondary: '#fefae0',         // Soft yellowish background
  textLight: '#f0fff4',         // Light green-white
  textDark: '#1f2937',          // Deep charcoal
  accent: '#ff6f3c',            // Zesty orange
  white: '#ffffff',
  black: '#111827'
};

// Styled Components
const FooterContainer = styled.footer`
  background: linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primary} 100%);
  color: ${colors.textLight};
  position: relative;
  overflow: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${colors.primaryLight}, ${colors.accent}, ${colors.primaryLight});
    background-size: 200% auto;
    animation: gradient 3s linear infinite;
  }

  @keyframes gradient {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
  }
`;

const SocialBar = styled.div`
  background: ${colors.primary};
  padding: 25px 0;
  position: relative;
`;

const SocialContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const SocialText = styled.h6`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: ${colors.white};
`;

const SocialLinksContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const SocialLink = styled.a`
  color: ${colors.white};
  font-size: 1.3rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  text-decoration: none;
  
  &:hover {
    color: ${colors.black};
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px) scale(1.1);
  }
`;

const FooterContent = styled.div`
  padding: 60px 0 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  padding: 0 15px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h6`
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  position: relative;
  color: ${colors.white};
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 15px;
  transition: color 0.3s ease;
  font-size: 0.95rem;
  
  &:hover {
    color: ${colors.white};
  }
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 12px;
  transition: all 0.3s ease;
  display: inline-block;
  font-size: 0.95rem;
  
  &:hover {
    color: ${colors.accent};
    transform: translateX(5px);
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  
  i {
    margin-right: 15px;
    color: ${colors.accent};
    font-size: 1rem;
    min-width: 20px;
    margin-top: 3px;
  }

  span {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const FooterForm = styled.form`
  .form-group {
    margin-bottom: 15px;
  }

  .form-control {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: ${colors.white};
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 0.95rem;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.9rem;
    }
    
    &:focus {
      background: rgba(255, 255, 255, 0.15);
      box-shadow: 0 0 0 0.2rem rgba(255, 159, 28, 0.25);
      color: ${colors.white};
      border-color: ${colors.accent};
    }
  }

  textarea.form-control {
    min-height: 100px;
  }
`;

const SubmitButton = styled.button`
  background: ${colors.accent};
  color: ${colors.black};
  border: none;
  border-radius: 4px;
  padding: 10px 25px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  width: 100%;
  cursor: pointer;
  
  &:hover {
    background: ${colors.black};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Copyright = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 0;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const DeveloperCredit = styled.span`
  color: ${colors.accent};
  font-weight: 500;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <SocialBar>
                <SocialContainer>
                    <SocialText>Connect with us on social media</SocialText>
                    <SocialLinksContainer>
                        <SocialLink 
                            href="https://www.facebook.com/yourpage" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </SocialLink>
                        <SocialLink 
                            href="https://twitter.com/yourhandle" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                        >
                            <i className="fab fa-twitter"></i>
                        </SocialLink>
                        <SocialLink 
                            href="https://www.instagram.com/yourprofile" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <i className="fab fa-instagram"></i>
                        </SocialLink>
                        <SocialLink 
                            href="https://www.linkedin.com/company/yourcompany" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </SocialLink>
                        <SocialLink 
                            href="https://www.youtube.com/yourchannel" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                        >
                            <i className="fab fa-youtube"></i>
                        </SocialLink>
                    </SocialLinksContainer>
                </SocialContainer>
            </SocialBar>

            <FooterContent>
                <FooterGrid>
                    <FooterColumn>
                        <FooterTitle>AgroHub</FooterTitle>
                        <FooterText>
                            Revolutionizing agriculture by connecting farmers directly with suppliers and consumers, eliminating middlemen for fairer prices.
                        </FooterText>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterTitle>Quick Links</FooterTitle>
                        <FooterLink href="/">For Farmers</FooterLink>
                        <FooterLink href="/">For Consumers</FooterLink>
                        <FooterLink href="/">For Suppliers</FooterLink>
                        <FooterLink href="/">Marketplace</FooterLink>
                        <FooterLink href="/">Resources</FooterLink>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterTitle>Contact Us</FooterTitle>
                        <ContactItem>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>123 Farm Road, Bengaluru, Karnataka 560001</span>
                        </ContactItem>
                        <ContactItem>
                            <i className="fas fa-envelope"></i>
                            <span>contact@agrohub.com</span>
                        </ContactItem>
                        <ContactItem>
                            <i className="fas fa-phone-alt"></i>
                            <span>+91 80 1234 5678</span>
                        </ContactItem>
                        <ContactItem>
                            <i className="fas fa-clock"></i>
                            <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
                        </ContactItem>
                    </FooterColumn>

                    <FooterColumn>
                        <FooterTitle>Newsletter</FooterTitle>
                        <FooterText>Subscribe to get updates on new features and products</FooterText>
                        <FooterForm>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Your email address" 
                                />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    className="form-control" 
                                    placeholder="Your message"
                                    rows="3"
                                ></textarea>
                            </div>
                            <SubmitButton type="submit">Subscribe</SubmitButton>
                        </FooterForm>
                    </FooterColumn>
                </FooterGrid>
            </FooterContent>

            <Copyright>
                <div className="container">
                    &copy; {new Date().getFullYear()} AgroHub. All rights reserved. 
                    <DeveloperCredit> Developed by Chetan H M</DeveloperCredit>
                </div>
            </Copyright>
        </FooterContainer>
    );
};

export default Footer;