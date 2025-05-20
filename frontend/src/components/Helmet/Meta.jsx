import React from 'react';
import { Helmet } from "react-helmet";
import styled, { keyframes } from 'styled-components';

// Animation for subtle floating effect
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Styled component for the meta container (though not directly visible)
const MetaContainer = styled.div`
  .meta-floating {
    animation: ${float} 4s ease-in-out infinite;
    transition: all 0.3s ease;
    
    &:hover {
      animation: ${float} 2s ease-in-out infinite;
    }
  }
`;

const Meta = ({ title, description, keywords }) => {
    return (
        <MetaContainer>
            <Helmet>
                {/* Animated title that changes with page transitions */}
                <title className="meta-floating">{title}</title> 
                
                {/* Enhanced meta tags with better SEO */}
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
                
                {/* Open Graph / Facebook Meta Tags */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="https://agrohub.com/images/meta-image.jpg" />
                
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="https://agrohub.com/images/meta-image.jpg" />
                
                {/* Favicon links with different sizes */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                
                {/* Preconnect for performance optimization */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                
                {/* Theme color for mobile browsers */}
                <meta name="theme-color" content="#27ae60" />
            </Helmet>
        </MetaContainer>
    );
};

Meta.defaultProps = {
    title: 'AgroHub | Connecting Farmers,Consumers and Suppliers',
    description: 'India\'s premier agricultural marketplace connecting farmers directly with consumers. Buy fresh produce, farm equipment, and agricultural supplies.',
    keywords: `
        AgroHub, India agriculture, farmers market, fresh produce, 
        organic vegetables, fruits online, farm to table, agricultural products,
        farming equipment, agro products, buy vegetables online, 
        farmer e-commerce, agricultural marketplace, Indian farmers,
        wholesale agriculture, retail farming products, hydroponic supplies,
        dairy products, poultry farming, fisheries supplies, agro technology,
        sustainable farming, eco-friendly agriculture, farm fresh delivery
    `
};

export default Meta;