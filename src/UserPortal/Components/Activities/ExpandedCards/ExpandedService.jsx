import React, { useState } from 'react';
import styles from './ExpandedService.module.css';

export default function ExpandedService({ serviceData, onClose, onSubmit, isBooked }) {
    if (!serviceData) return null;
    const [guests, setGuests] = useState(2); // default value
    
    return (
        <div className={styles.modalContainer}>
            <dialog className={styles.contractContainer} open>
                <h1 className={styles.contractTitle}>{serviceData.title}</h1>

                <div className={styles.modalContent}>
                    <div className={styles.detailsSection}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Location:</span>
                            <span>{serviceData.location}</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Rating:</span>
                            <span>{serviceData.rating} Excellent ({serviceData.reviewCount} reviews)</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Duration:</span>
                            <span>{serviceData.nights || 4} Nights</span>
                        </div>

                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Room Type:</span>
                            <span>{serviceData.roomType || 'Standard Room'}</span>
                        </div>

                        <form className={styles.bookingForm}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="guests">Number of Guests</label>
                                <input
                                    type="number"
                                    id="guests"
                                    min="1"
                                    max="4"
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="roomSelection">Room Selection</label>
                                <select id="roomSelection">
                                    <option value="standard">Standard Room</option>
                                    <option value="deluxe">Deluxe Room</option>
                                    <option value="suite">Suite</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="checkIn">Check-in Date</label>
                                <input type="date" id="checkIn" />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="checkOut">Check-out Date</label>
                                <input type="date" id="checkOut" />
                            </div>

                            <div className={styles.priceSummary}>
                                <h3>Total Price: US${(serviceData.pricePerNight * guests).toFixed(2)}</h3>
                                <small>Per night, includes all taxes and fees</small>
                            </div>

                            <div className={styles.modalButtons}>
                                <button
                                    type="button"
                                    className={styles.secondaryButton}
                                    onClick={onClose}
                                >
                                    Close
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