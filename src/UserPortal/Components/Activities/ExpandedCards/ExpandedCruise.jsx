import React from 'react';
import styles from './ExpandedCruise.module.css';

export default function ExpandedCruise({ cruiseData, onClose, onSubmit, isBooked }) {
    if (!cruiseData) return null;

    return (
        <div className={styles.modalContainer}>
            <dialog className={styles.contractContainer} open>
                <h1 className={styles.contractTitle}>{cruiseData.cruiseName}</h1>

                <div className={styles.modalContent}>
                    <div className={styles.detailsSection}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Route:</span>
                            <span>{cruiseData.departurePort} → {cruiseData.arrivalPort}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Duration:</span>
                            <span>{cruiseData.nights} Nights</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Cabin Type:</span>
                            <span>{cruiseData.cabinType}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Departure Date:</span>
                            <span>{cruiseData.embarkationDate}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Amenities:</span>
                            <div className={styles.amenitiesList}>
                                {cruiseData.amenities.map((amenity, index) => (
                                    <span key={index} className={styles.amenityBadge}>
                                        {amenity.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <form className={styles.bookingForm}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="passengers">Number of Passengers</label>
                                <input
                                    type="number"
                                    id="passengers"
                                    min="1"
                                    max="8"
                                    defaultValue="2"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="cabinSelection">Cabin Selection</label>
                                <select id="cabinSelection">
                                    <option value={cruiseData.cabinType}>{cruiseData.cabinType}</option>
                                </select>
                            </div>

                            <div className={styles.priceSummary}>
                                <h3>Total Price: US${cruiseData.price}</h3>
                                <small>Includes all taxes and fees</small>
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
