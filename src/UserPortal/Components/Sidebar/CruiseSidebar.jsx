import React, { useState } from 'react';
import styles from './Sidebar.module.css';

export default function CruiseSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    cruiseShip: '',
    departurePort: '',
    arrivalPort: '',
    startDate: '',
    endDate: '',
    cruiseDuration: [],
    cabinType: '',
    amenities: [],
    priceRange: { min: 0, max: 10000 },
  });

  const handleFilterChange = () => {
    console.log('Filters applied:', filters); // Debugging line to check filter values
    onFilterChange(filters); // Pass filters to parent component (CruisesActivity)
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'cruiseDuration') {
      setFilters((prevFilters) => {
        const updatedDuration = checked
          ? [...prevFilters.cruiseDuration, e.target.value]
          : prevFilters.cruiseDuration.filter((value) => value !== e.target.value);
        return { ...prevFilters, cruiseDuration: updatedDuration };
      });
    } else if (name === 'amenities') {
      setFilters((prevFilters) => {
        const updatedAmenities = checked
          ? [...prevFilters.amenities, e.target.value]
          : prevFilters.amenities.filter((value) => value !== e.target.value);
        return { ...prevFilters, amenities: updatedAmenities };
      });
    }
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: {
        ...prevFilters.priceRange,
        [name]: value,
      },
    }));
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Filter Cruises</h3>

        {/* Cruise Ship Filter */}
        <div className={styles.filterGroup}>
          <label>Cruise Ship</label>
          <input
            type="text"
            className={styles.filterInput}
            placeholder="Search by ship name..."
            value={filters.cruiseShip}
            onChange={(e) => setFilters({ ...filters, cruiseShip: e.target.value })}
          />
        </div>

        {/* Departure Port Filter */}
        <div className={styles.filterGroup}>
          <label>Departure Port</label>
          <input
            type="text"
            className={styles.filterInput}
            placeholder="Embarkation port..."
            value={filters.departurePort}
            onChange={(e) => setFilters({ ...filters, departurePort: e.target.value })}
          />
        </div>

        {/* Arrival Port Filter */}
        <div className={styles.filterGroup}>
          <label>Arrival Port</label>
          <input
            type="text"
            className={styles.filterInput}
            placeholder="Disembarkation port..."
            value={filters.arrivalPort}
            onChange={(e) => setFilters({ ...filters, arrivalPort: e.target.value })}
          />
        </div>

        {/* Travel Dates Filter */}
        <div className={styles.filterGroup}>
          <label>Travel Dates</label>
          <div className={styles.priceRange}>
            <input
              type="date"
              placeholder="Start date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            />
            <span>-</span>
            <input
              type="date"
              placeholder="End date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            />
          </div>
        </div>

        {/* Cruise Duration Filter */}
        <div className={styles.filterGroup}>
          <label>Cruise Duration</label>
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                value="3-5 Nights"
                name="cruiseDuration"
                onChange={handleCheckboxChange}
              />
              3-5 Nights
            </label>
            <label>
              <input
                type="checkbox"
                value="7-10 Nights"
                name="cruiseDuration"
                onChange={handleCheckboxChange}
              />
              7-10 Nights
            </label>
            <label>
              <input
                type="checkbox"
                value="10+ Nights"
                name="cruiseDuration"
                onChange={handleCheckboxChange}
              />
              10+ Nights
            </label>
          </div>
        </div>

        {/* Cabin Type Filter */}
        <div className={styles.filterGroup}>
          <label>Cabin Type</label>
          <select
            className={styles.filterSelect}
            value={filters.cabinType}
            onChange={(e) => setFilters({ ...filters, cabinType: e.target.value })}
          >
            <option value="">Any Cabin</option>
            <option>Interior</option>
            <option>Ocean View</option>
            <option>Balcony</option>
            <option>Suite</option>
          </select>
        </div>

        {/* Amenities Filter */}
        <div className={styles.filterGroup}>
          <label>Amenities</label>
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                value="Pool"
                name="amenities"
                onChange={handleCheckboxChange}
              />
              Pool
            </label>
            <label>
              <input
                type="checkbox"
                value="Spa"
                name="amenities"
                onChange={handleCheckboxChange}
              />
              Spa
            </label>
            <label>
              <input
                type="checkbox"
                value="Casino"
                name="amenities"
                onChange={handleCheckboxChange}
              />
              Casino
            </label>
            <label>
              <input
                type="checkbox"
                value="Theater"
                name="amenities"
                onChange={handleCheckboxChange}
              />
              Theater
            </label>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className={styles.filterGroup}>
          <label>Price Range</label>
          <div className={styles.priceRange}>
            <input
              type="number"
              placeholder="Min"
              name="min"
              value={filters.priceRange.min}
              onChange={handlePriceRangeChange}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              name="max"
              value={filters.priceRange.max}
              onChange={handlePriceRangeChange}
            />
          </div>
        </div>

        {/* Apply Filters Button */}
        <button className={styles.applyButton} onClick={handleFilterChange}>
          Show Cruises
        </button>
      </div>
    </div>
  );
}
