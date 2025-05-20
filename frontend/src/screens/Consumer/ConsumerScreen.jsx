import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Alert, Form, Col } from 'react-bootstrap';
import styled, { keyframes, css } from 'styled-components';
import { Search, ArrowDown, Filter, X } from 'react-bootstrap-icons';
import ConsumerProducts from './../../components/ConsumerProducts/ConsumerProducts';
import { listConsumerProducts } from './../../actions/consumerProductAction.js';
import Message from './../../components/Message/Message';
import Loader from './../../components/Loader/Loader';
import Meta from '../../components/Helmet/Meta';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const buttonGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(46, 204, 113, 0); }
  100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ConsumerScreenContainer = styled.div`
  background: linear-gradient(-45deg, #f5f7fa, #e4f0f8, #f5f7fa, #e4f0f8);
  background-size: 400% 400%;
  animation: ${gradientBG} 20s ease infinite;
  min-height: 100vh;
  padding: 3rem 0;
`;

const StyledContainer = styled(Container)`
  animation: ${fadeIn} 1s ease-out;
  margin-top: 90px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  animation: ${fadeIn} 1.2s ease-out;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
  line-height: 1.6;
  animation: ${fadeIn} 1.4s ease-out;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchContainer = styled.div`
  margin: 2rem auto;
  max-width: 600px;
  position: relative;
  animation: ${fadeIn} 1.2s ease-out;
`;

const StyledSearch = styled(Form.Control)`
  border-radius: 50px;
  padding: 15px 25px 15px 50px;
  border: none;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  font-size: 1rem;

  &:focus {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border: none;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #7f8c8d;
  font-size: 1.2rem;
`;

const FilterContainer = styled.div`
  margin: 1rem auto 2rem;
  max-width: 800px;
  animation: ${slideDown} 0.5s ease-out;
`;

const FilterButton = styled(Button)`
  border-radius: 50px;
  padding: 8px 20px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid #27ae60;
  background: white;
  color: #27ae60;
  margin: 0 5px 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: #f8f9fa;
    color: #27ae60;
    transform: translateY(-2px);
  }
  
  &.active {
    background: #27ae60;
    color: white;
  }
`;

const ClearFiltersButton = styled(Button)`
  border-radius: 50px;
  padding: 8px 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  background: #e74c3c;
  color: white;
  margin-left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: #c0392b;
    color: white;
    transform: translateY(-2px);
  }
`;

const PriceRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const PriceInput = styled(Form.Control)`
  width: 100px;
  border-radius: 50px;
  text-align: center;
  padding: 8px 15px;
  border: 1px solid #ced4da;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #27ae60;
    box-shadow: 0 0 0 0.25rem rgba(39, 174, 96, 0.25);
  }
`;

const ProductsRow = styled(Row)`
  margin: 2rem -15px;
  justify-content: center;
`;

const ShowMoreButton = styled(Button)`
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
  animation: ${pulse} 2s infinite, ${buttonGlow} 3s infinite;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.5);
    background: linear-gradient(135deg, #2ecc71, #27ae60);
    animation: none;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    animation: none;
    background: #bdc3c7;
    transform: none !important;
    box-shadow: none;
    cursor: not-allowed;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  ${props => props.$loading && css`
    &::after {
      content: '';
      width: 16px;
      height: 16px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }
  `}

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ArrowIcon = styled(ArrowDown)`
  transition: all 0.3s ease;
  ${ShowMoreButton}:hover & {
    animation: ${bounce} 1s infinite;
  }
`;

const FinishedAlert = styled(Alert)`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 50px;
  text-align: center;
  margin: 2rem auto;
  max-width: 350px;
  animation: ${pulse} 1.5s infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const EmptyState = styled.div`
  margin: 3rem auto;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 500px;
  font-size: 1.3rem;
  color: #7f8c8d;
  animation: ${fadeIn} 1s ease-out;
`;

const ActiveFilters = styled.div`
  margin: 15px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const ActiveFilterTag = styled.span`
  background: #27ae60;
  color: white;
  padding: 5px 15px;
  border-radius: 50px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
`;

const ConsumerScreen = () => {
  const dispatch = useDispatch();
  const consumerProductList = useSelector(state => state.consumerProductList);
  const { loading, consumerProducts, error } = consumerProductList;

  const [numberOfItems, setNumberOfItems] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  useEffect(() => {
    dispatch(listConsumerProducts());
  }, [dispatch]);


  useEffect(() => {
    // Reset to initial number of items when filters change
    setNumberOfItems(12);
  }, [priceRange, selectedSizes, selectedLocations, selectedRatings, searchTerm]);

  const showMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setNumberOfItems(filteredProducts.length); // Always show all products when clicked
      setLoadingMore(false);
    }, 600);
  };

  // Get all unique product sizes and locations
  const allSizes = [...new Set(consumerProducts.map(p => p.prod_size))];
  const allLocations = [...new Set(consumerProducts.map(p => p.avalaible_location))];

  const toggleSizeFilter = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const toggleLocationFilter = (location) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location) 
        : [...prev, location]
    );
  };

  const toggleRatingFilter = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedLocations([]);
    setSelectedRatings([]);
    setSearchTerm('');
    setNumberOfItems(12);
  };

  const filteredProducts = consumerProducts.filter(product => {
    // Search filter
    const matchesSearch = 
      product.prod_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.avalaible_location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price filter
    const matchesPrice = 
      product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Size filter
    const matchesSize = 
      selectedSizes.length === 0 || 
      selectedSizes.includes(product.prod_size);
    
    // Location filter
    const matchesLocation = 
      selectedLocations.length === 0 || 
      selectedLocations.includes(product.avalaible_location);
    
      const matchesRating = 
      selectedRatings.length === 0 || 
      selectedRatings.some(r => Math.floor(product.rating) === r);
    
    return matchesSearch && matchesPrice && matchesSize && matchesLocation && matchesRating;
  });
  return (
    <ConsumerScreenContainer>
      <Meta title="AgroHub | Consumer Products" />
      <StyledContainer>
        <HeroTitle>Fresh From The Fields, Delivered To You</HeroTitle>
        <Subtitle>Shop high-quality grains, vegetables, and produce straight from verified farmers. Support local agriculture while enjoying doorstep delivery!</Subtitle>

        <SearchContainer>
          <Form.Group controlId="search">
            <SearchIcon />
            <StyledSearch
              type="text"
              placeholder="Search products by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </SearchContainer>

        <FilterContainer>
          <Button 
            variant="outline-success" 
            onClick={() => setShowFilters(!showFilters)}
            className="mb-3"
          >
            <Filter size={18} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>

          {showFilters && (
            <div className="bg-white p-4 rounded shadow-sm">
              <h5 className="mb-3">Filter Products</h5>
              
              <div className="mb-4">
                <h6>Price Range</h6>
                <PriceRangeContainer>
                  <PriceInput 
                    type="number" 
                    placeholder="Min" 
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    min={0}
                  />
                  <span>to</span>
                  <PriceInput 
                    type="number" 
                    placeholder="Max" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                    min={priceRange[0]}
                  />
                </PriceRangeContainer>
              </div>

              <div className="mb-4">
                <h6>Product Size</h6>
                <div>
                  {allSizes.map(size => (
                    <FilterButton
                      key={size}
                      onClick={() => toggleSizeFilter(size)}
                      className={selectedSizes.includes(size) ? 'active' : ''}
                    >
                      {size}
                    </FilterButton>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <h6>Location</h6>
                <div>
                  {allLocations.map(location => (
                    <FilterButton
                      key={location}
                      onClick={() => toggleLocationFilter(location)}
                      className={selectedLocations.includes(location) ? 'active' : ''}
                    >
                      {location}
                    </FilterButton>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h6>Rating</h6>
                <div>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <FilterButton
                      key={rating}
                      onClick={() => toggleRatingFilter(rating)}
                      className={selectedRatings.includes(rating) ? 'active' : ''}
                    >
                      {Array(rating).fill('★').join('')}
                    </FilterButton>
                  ))}
                </div>
              </div>

              {(priceRange[0] > 0 || priceRange[1] < 1000 || selectedSizes.length > 0 || selectedLocations.length > 0 || selectedRatings.length > 0) && (
                <ClearFiltersButton onClick={clearAllFilters}>
                  <X size={18} />
                  Clear All Filters
                </ClearFiltersButton>
              )}
            </div>
          )}

          {(priceRange[0] > 0 || priceRange[1] < 1000 || selectedSizes.length > 0 || selectedLocations.length > 0 || selectedRatings.length > 0) && (
            <ActiveFilters>
              {priceRange[0] > 0 && (
                <ActiveFilterTag>
                  Min: ₹{priceRange[0]}
                </ActiveFilterTag>
              )}
              {priceRange[1] < 1000 && (
                <ActiveFilterTag>
                  Max: ₹{priceRange[1]}
                </ActiveFilterTag>
              )}
              {selectedSizes.map(size => (
                <ActiveFilterTag key={size}>
                  {size} <X size={12} onClick={() => toggleSizeFilter(size)} style={{ cursor: 'pointer' }} />
                </ActiveFilterTag>
              ))}
              {selectedLocations.map(location => (
                <ActiveFilterTag key={location}>
                  {location} <X size={12} onClick={() => toggleLocationFilter(location)} style={{ cursor: 'pointer' }} />
                </ActiveFilterTag>
              ))}
              {selectedRatings.map(rating => (
                <ActiveFilterTag key={`rating-${rating}`}>
                  {rating}★ <X size={12} onClick={() => toggleRatingFilter(rating)} style={{ cursor: 'pointer' }} />
                </ActiveFilterTag>
              ))}
            </ActiveFilters>
          )}
        </FilterContainer>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <EmptyState>
                No products found matching your filters. Try adjusting your search criteria.
              </EmptyState>
            ) : (
              <>
                <ProductsRow>
                  {filteredProducts
                    .slice(0, numberOfItems)
                    .map((consumer, index) => (
                      <ConsumerProducts
                        key={consumer._id}
                        _id={consumer._id}
                        prod_name={consumer.prod_name}
                        image={consumer.image}
                        price={consumer.price}
                        avalaible_location={consumer.avalaible_location}
                        prod_size={consumer.prod_size}
                        animationDelay={index * 0.1}
                      />
                    ))}
                </ProductsRow>

                {numberOfItems >= filteredProducts.length ? (
                  <FinishedAlert>
                    🎉 You've viewed all available products!
                  </FinishedAlert>
                ) : (
                  <ShowMoreButton
                    onClick={showMore}
                    disabled={loadingMore || numberOfItems >= filteredProducts.length}
                    $loading={loadingMore}
                  >
                    {loadingMore ? 'Loading...' : 'Show More'}
                    {!loadingMore && <ArrowIcon size={18} />}
                  </ShowMoreButton>
                )}
              </>
            )}
          </>
        )}
      </StyledContainer>
    </ConsumerScreenContainer>
  );
};

export default ConsumerScreen;