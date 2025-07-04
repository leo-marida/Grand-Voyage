import React, { useState } from 'react';
import styles from './ExpandedListing.module.css';

export default function ExpandedCruise({ id, cruise, onSave, onCancel }) {
    const [formData, setFormData] = useState({ ...cruise });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAmenitiesChange = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
      
        setFormData(prevFormData => {
          const amenities = prevFormData.amenities || [];
          return {
            ...prevFormData,
            amenities: isChecked
              ? [...amenities, value]
              : amenities.filter(item => item !== value),
          };
        });
      };
      

    const handleSave = () => {
        onSave(formData);
        document.getElementById(id).close();
    };

    const handleCancel = () => {
        onCancel();
        document.getElementById(id).close();
    };

    return (
        <dialog id={id} className={styles.dialog}>
            <form className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="title" className={styles.label}>Title:</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.cruiseName}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="departurePort" className={styles.label}>Departure Port:</label>
                    <input
                        id="departurePort"
                        name="departurePort"
                        type="text"
                        value={formData.departurePort}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="destination" className={styles.label}>Destination:</label>
                    <input
                        id="destination"
                        name="destination"
                        type="text"
                        value={formData.arrivalPort}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="embarkationDate" className={styles.label}>Embarkation Date:</label>
                    <input
                        id="embarkationDate"
                        name="embarkationDate"
                        type="date"
                        value={formData.embarkationDate}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="arrivalDate" className={styles.label}>Arrival Date:</label>
                    <input
                        id="arrivalDate"
                        name="arrivalDate"
                        type="date"
                        value={formData.arrivalDate}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.filterGroup}>
                    <label>Cabin Type</label>
                    <select
                        className={styles.filterSelect}
                        id="cabinType"
                        name="cabinType"
                        value={formData.cabinType || ''}
                        onChange={handleChange}
                        >
                        <option value="">SELECT CABIN TYPE</option>
                        <option value="Interior">Interior</option>
                        <option value="Ocean View">Ocean View</option>
                        <option value="Balcony">Balcony</option>
                        <option value="Suite">Suite</option>
                    </select>
                </div>
                <div className={styles.filterGroup}>
                    <label>Amenities</label>
                    <div className={styles.checkboxGroup}>
                        <label>
                        <input
                            type="checkbox"
                            value="Pool"
                            name="amenities"
                            checked={formData.amenities?.includes("Pool") || false}
                            onChange={handleAmenitiesChange}
                            />
                                Pool
                        </label>
                        <label>
                        <input
                            type="checkbox"
                            value="Spa"
                            name="amenities"
                            checked={formData.amenities?.includes("Spa") || false}
                            onChange={handleAmenitiesChange}
                            />

                            Spa
                        </label>
                        <label>
                        <input
                            type="checkbox"
                            value="Casino"
                            name="amenities"
                            checked={formData.amenities?.includes("Casino") || false}
                            onChange={handleAmenitiesChange}
                            />

                                Casino
                        </label>
                        <label>
                        <input
                            type="checkbox"
                            value="Theater"
                            name="amenities"
                            checked={formData.amenities?.includes("Theater") || false}
                            onChange={handleAmenitiesChange}
                            />
                                Theater
                        </label>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="price" className={styles.label}>Price:</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="description" className={styles.label}>Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={styles.textarea}
                    ></textarea>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="button" onClick={handleCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleSave} className={styles.saveButton}>
                        Save
                    </button>
                </div>
            </form>
        </dialog>
    );
}