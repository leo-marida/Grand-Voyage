import React, { useState } from 'react';
import styles from './Sidebar.module.css';

export default function HotelSidebar({ setHotelFilters }) {
  const [filters, setFilters] = useState({
    title: '',
    hotelChain: '',
    starRating: [],
    roomTypes: [],
    minPrice: '',
    maxPrice: '',
    amenities: [],
    mealPlan: '',
  });

  const handleCheckboxChange = (e, category) => {
    const value = e.target.value;
    const checked = e.target.checked;

    setFilters(prev => {
      const updatedCategory = checked
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value);

      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    console.log('Filters applied:', filters); // Debugging line to check filter values
    setHotelFilters(filters);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Filter Hotels</h3>

        <div className={styles.filterGroup}>
          <label>Hotel Name</label>
          <input
            type="text"
            className={styles.filterInput}
            placeholder="Search by name..."
            name="title"
            value={filters.title}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Star Rating</label>
          <div className={styles.checkboxGroup}>
            {[1, 2, 3, 4, 5].map(star => (
              <label key={star} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={star}
                  checked={filters.starRating.includes(star.toString())}
                  onChange={(e) => handleCheckboxChange(e, 'starRating')}
                />
                {star} Star{star !== 1 ? 's' : ''}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Price Range</label>
          <div className={styles.priceRange}>
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={filters.minPrice}
              onChange={handleInputChange}
            />
            <span>-</span>
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Amenities</label>
          <div className={styles.checkboxGroup}>
            {['Pool', 'Gym', 'WiFi'].map(amenity => (
              <label key={amenity}>
                <input
                  type="checkbox"
                  value={amenity}
                  checked={filters.amenities.includes(amenity)}
                  onChange={(e) => handleCheckboxChange(e, 'amenities')}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Meal Plans</label>
          <select
            className={styles.filterSelect}
            name="mealPlan"
            value={filters.mealPlan}
            onChange={handleInputChange}
          >
            <option value="">Any Plan</option>
            <option value="Breakfast Included">Breakfast Included</option>
            <option value="All Inclusive">All Inclusive</option>
          </select>
        </div>

        <button className={styles.applyButton} onClick={applyFilters}>
          Show Results
        </button>
      </div>
    </div>
  );
}
