import React from 'react';
import styles from './ExpandedPackage.module.css';

export default function ExpandedPackage({ packageData, onClose, onSubmit, isBooked }) {
    if (!packageData) return null;

    return (
        <div className={styles.modalContainer}>
            <dialog className={styles.contractContainer} open>
                <h1 className={styles.contractTitle}>{packageData.packageName}</h1>

                <div className={styles.modalContent}>
                    <div className={styles.detailsSection}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Destination:</span>
                            <span>{packageData.destination}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Duration:</span>
                            <span>{packageData.duration}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Package Type:</span>
                            <span>{packageData.packageType}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Travel Dates:</span>
                            <span>{packageData.travelDates}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Inclusions:</span>
                            <div className={styles.amenitiesList}>
                                {packageData.inclusions?.split(',').map((inclusion, index) => (
                                    <span key={index} className={styles.amenityBadge}>
                                        {inclusion.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <form className={styles.bookingForm}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="travelers">Number of Travelers</label>
                                <input
                                    type="number"
                                    id="travelers"
                                    min="1"
                                    max="8"
                                    defaultValue="2"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="packageType">Package Type</label>
                                <select id="packageType">
                                    <option value="standard">Standard Package</option>
                                    <option value="premium">Premium Package</option>
                                    <option value="luxury">Luxury Package</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="departureDate">Departure Date</label>
                                <input type="date" id="departureDate" />
                            </div>

                            <div className={styles.priceSummary}>
                                <h3>Total Price: US${packageData.price}</h3>
                                <small>Includes all taxes, fees, and selected inclusions</small>
                            </div>

                            <div className={styles.modalButtons}>
                                <button
                                    type="button"
                                    className={styles.secondaryButton}
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                {!isBooked ? (
                                    <button
                                        type="button"
                                        className={styles.primaryButton}
                                        onClick={onSubmit}
                                    >
                                        Book Now
                                    </button>
                                        ) : (
                                    <button
                                        type="button"
                                        className={styles.primaryButton}
                                        onClick={onSubmit}
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
} 