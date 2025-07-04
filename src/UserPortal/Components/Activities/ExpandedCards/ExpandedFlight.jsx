import React from 'react';
import styles from './ExpandedFlight.module.css';

export default function ExpandedFlight({ flightData, onClose, onSubmit, isBooked }) {
    if (!flightData) return null;

    return (
        <div className={styles.modalContainer}>
            <dialog className={styles.contractContainer} open>
                <h1 className={styles.contractTitle}>{flightData.airline}</h1>

                <div className={styles.modalContent}>
                    <div className={styles.detailsSection}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Route:</span>
                            <span>{flightData.departure} → {flightData.arrival}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Duration:</span>
                            <span>{flightData.duration}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Class:</span>
                            <span>{flightData.class}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Date:</span>
                            <span>{flightData.date}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Baggage Allowance:</span>
                            <span>1 checked bag (23kg) + 1 cabin bag (7kg)</span>
                        </div>

                        <form className={styles.bookingForm}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="passengers">Number of Passengers</label>
                                <input
                                    type="number"
                                    id="passengers"
                                    min="1"
                                    max="9"
                                    defaultValue="1"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="classSelection">Class Selection</label>
                                <select id="classSelection">
                                    <option value={flightData.class}>{flightData.class}</option>
                                    {flightData.class !== 'Economy' && <option value="Economy">Economy</option>}
                                    {flightData.class !== 'Premium Economy' && <option value="Premium Economy">Premium Economy</option>}
                                    {flightData.class !== 'Business' && <option value="Business">Business</option>}
                                    {flightData.class !== 'First Class' && <option value="First Class">First Class</option>}
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="departureDate">Departure Date</label>
                                <input type="date" id="departureDate" />
                            </div>

                            <div className={styles.priceSummary}>
                                <h3>Total Price: US${flightData.price}</h3>
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