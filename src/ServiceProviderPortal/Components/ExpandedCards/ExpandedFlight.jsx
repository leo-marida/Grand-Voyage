import React, { useState } from 'react';
import styles from './ExpandedListing.module.css';

export default function ExpandedFlight({ id, flight, onSave, onCancel }) {
    const [formData, setFormData] = useState({ ...flight });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                        value={formData.airline}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="departurePort" className={styles.label}>Departure Airport:</label>
                    <input
                        id="departurePort"
                        name="departurePort"
                        type="text"
                        value={formData.departureAirport}
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
                        value={formData.arrivalAirport}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="duration" className={styles.label}>Duration (hours):</label>
                    <input
                        id="duration"
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="cabinClass" className={styles.label}>Class:</label>
                    <select name="cabinClass" value={formData.cabinClass || ''} onChange={handleChange} className={styles.filterSelect}>
                        <option value="">Any Class</option>
                        <option value="Economy">Economy</option>
                        <option value="Premium Economy">Premium Economy</option>
                        <option value="Business">Business</option>
                        <option value="First Class">First Class</option>
                    </select>
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