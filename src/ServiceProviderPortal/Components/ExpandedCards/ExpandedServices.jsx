import React, { useState } from 'react';
import styles from './ExpandedListing.module.css';

export default function ExpandedService({ id, service, onSave, onCancel }) {
    const [formData, setFormData] = useState({ ...service });

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
                        value={formData.title}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="location" className={styles.label}>Location:</label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="nbOfRooms" className={styles.label}>Number of Rooms:</label>
                    <input
                        id="nbOfRooms"
                        name="nbOfRooms"
                        type="number"
                        value={formData.nbOfRooms}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="price" className={styles.label}>Price Per Day:</label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.radioGroup}>
                    <input type="radio" id="apartment" name="serviceType" value="apartment" />
                    <label htmlFor="apartment" className={styles.radioLabel}>Apartment</label>
                    <input type="radio" id="hotel" name="serviceType" value="hotel" />
                    <label htmlFor="hotel" className={styles.radioLabel}>Hotel</label>
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