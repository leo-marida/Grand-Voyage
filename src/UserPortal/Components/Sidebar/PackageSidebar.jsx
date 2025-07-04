import React, { useState } from 'react';
import styles from './Sidebar.module.css';

export default function PackageFilterSidebar({ setPackageFilters }) {
  const [filters, setFilters] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    packageType: '',
    durations: [],
    minPrice: '',
    maxPrice: '',
    travelers: '',
    features: []
  });

  const handleChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFilters(prev => {
      const current = new Set(prev[field]);
      current.has(value) ? current.delete(value) : current.add(value);
      return {
        ...prev,
        [field]: Array.from(current)
      };
    });
  };

  const applyFilters = () => {
    console.log('Filters applied:', filters); // Debugging line to check filter values
    setPackageFilters(filters);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Filter Packages</h3>

        <div className={styles.filterGroup}>
          <label>Destination</label>
          <input
            type="text"
            className={styles.filterInput}
            placeholder="Enter destination..."
            value={filters.destination}
            onChange={(e) => handleChange('destination', e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Package Type</label>
          <select
            className={styles.filterSelect}
            value={filters.packageType}
            onChange={(e) => handleChange('packageType', e.target.value)}
          >
            <option value="">All Packages</option>
            <option>All-Inclusive</option>
            <option>Flight+Hotel</option>
            <option>Cruise+Excursions</option>
            <option>Adventure Tours</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Package Duration</label>
          <div className={styles.checkboxGroup}>
            {['Weekend Getaway (3-4 days)', '1 Week', '10+ Days'].map(duration => (
              <label key={duration}>
                <input
                  type="checkbox"
                  checked={filters.durations.includes(duration)}
                  onChange={() => handleCheckboxChange('durations', duration)}
                />
                {duration}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Price Range</label>
          <div className={styles.priceRange}>
            <input
              type="number"
              placeholder="Min price"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Travelers</label>
          <div className={styles.priceRange}>
            <input
              type="number"
              placeholder="Number"
              min="1"
              value={filters.travelers}
              onChange={(e) => handleChange('travelers', e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Package Features</label>
          <div className={styles.checkboxGroup}>
            {['Free Cancellation', 'Guided Tours', 'Airport Transfers'].map(feature => (
              <label key={feature}>
                <input
                  type="checkbox"
                  checked={filters.features.includes(feature)}
                  onChange={() => handleCheckboxChange('features', feature)}
                />
                {feature}
              </label>
            ))}
          </div>
        </div>

        <button className={styles.applyButton} onClick={applyFilters}>
          Search Packages
        </button>
      </div>
    </div>
  );
}
