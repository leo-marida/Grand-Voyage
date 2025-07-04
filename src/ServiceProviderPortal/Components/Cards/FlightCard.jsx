import React from 'react';
import styles from './Card.module.css';

export default function FlightCard({ flight, onDelete, onEdit }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardImageContainer}>
                <img 
                    src={flight.imageUrl} 
                    alt={flight.title} 
                    className={styles.cardImage} 
                />
            </div>
            
            <div className={styles.cardContent}>
                <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{flight.airline}</h3>
                    <p className={styles.cardSubtitle}>
                        {flight.departureAirport} → {flight.arrivalAirport}
                    </p>
                    <div className={styles.cardMeta}>
                        <span className={styles.cardMetaMain}>{flight.flightDurationHours}</span>
                        <span className={styles.cardMetaSecondary}>{flight.cabinClass}</span>
                    </div>
                </div>

                <div className={styles.cardFooter}>
                    <div className={styles.cardPrice}>US${flight.price}</div>
                    <div className={styles.cardDetails}>
                        <div>{flight.description}</div>
                    </div>
                    <div className={styles.cardActions}>
                        <button className={styles.editButton} onClick={() => onEdit(flight)}>
                            Edit
                        </button>
                        <button className={styles.deleteButton} onClick={() => onDelete(flight.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
