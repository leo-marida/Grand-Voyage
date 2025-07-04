import React, { useState } from 'react';
import styles from './Sidebar.module.css';

export default function FlightSidebar({ onApplyFilters }) {
    const [filters, setFilters] = useState({
        airline: '',
        departureAirport: '',
        arrivalAirport: '',
        durationMin: '',
        durationMax: '',
        priceMin: '',
        priceMax: '',
        cabinClass: '',
        baggage: [],
        departureDate: '',
        mealsIncluded: false,
        noLayover: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFilters(prev => ({ ...prev, [name]: checked }));
    };

    const handleBaggageChange = (e) => {
        const { value, checked } = e.target;
        setFilters(prev => {
            const updatedBaggage = checked
                ? [...prev.baggage, value]
                : prev.baggage.filter(item => item !== value);
            return { ...prev, baggage: updatedBaggage };
        });
    };

    const handleApplyFilters = () => {
        console.log('Filters applied:', filters); // Debugging line to check filter values
        onApplyFilters(filters);
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.filterSection}>
                <h3 className={styles.sectionTitle}>Filter Flights</h3>

                <div className={styles.filterGroup}>
                    <label>Airline</label>
                    <select name="airline" onChange={handleInputChange} className={styles.filterSelect}>
                        <option value="">Any Airline</option>
                        <option>Emirates</option>
                        <option>Qatar Airways</option>
                        <option>Turkish Airlines</option>
                        <option>Lufthansa</option>
                        <option>Middle East Airlines</option>
                        <option>British Airways</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label>Departure Airport</label>
                    <input name="departureAirport" type="text" onChange={handleInputChange} className={styles.filterInput} placeholder="From..." />
                </div>

                <div className={styles.filterGroup}>
                    <label>Arrival Airport</label>
                    <input name="arrivalAirport" type="text" onChange={handleInputChange} className={styles.filterInput} placeholder="To..." />
                </div>

                <div className={styles.filterGroup}>
                    <label>Flight Duration (hours)</label>
                    <div className={styles.priceRange}>
                        <input name="durationMin" type="number" placeholder="Min" onChange={handleInputChange} />
                        <span>-</span>
                        <input name="durationMax" type="number" placeholder="Max" onChange={handleInputChange} />
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <label>Price Range</label>
                    <div className={styles.priceRange}>
                        <input name="priceMin" type="number" placeholder="Min" onChange={handleInputChange} />
                        <span>-</span>
                        <input name="priceMax" type="number" placeholder="Max" onChange={handleInputChange} />
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <label>Cabin Class</label>
                    <select name="cabinClass" onChange={handleInputChange} className={styles.filterSelect}>
                        <option value="">Any Class</option>
                        <option>Economy</option>
                        <option>Premium Economy</option>
                        <option>Business</option>
                        <option>First Class</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label>Baggage Allowance</label>
                    <div className={styles.checkboxGroup}>
                        <label><input type="checkbox" value="15kg" onChange={handleBaggageChange} /> 15kg</label>
                        <label><input type="checkbox" value="20kg" onChange={handleBaggageChange} /> 20kg</label>
                        <label><input type="checkbox" value="25kg" onChange={handleBaggageChange} /> 25kg</label>
                    </div>
                </div>

                <div className={styles.filterGroup}>
                    <label>Departure Date</label>
                    <input name="departureDate" type="date" onChange={handleInputChange} className={styles.filterInput} />
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.checkboxLabel}>
                        <input name="mealsIncluded" type="checkbox" onChange={handleCheckboxChange} /> Meals Included
                    </label>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.checkboxLabel}>
                        <input name="noLayover" type="checkbox" onChange={handleCheckboxChange} /> No Layover
                    </label>
                </div>

                <button onClick={handleApplyFilters} className={styles.applyButton}>
                    Show Flights
                </button>
            </div>
        </div>
    );
}
