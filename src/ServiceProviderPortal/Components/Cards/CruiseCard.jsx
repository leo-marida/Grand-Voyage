import React from 'react';
import styles from './Card.module.css';

export default function CruiseCard({ cruise, onDelete, onEdit }) {
    function calculateDuration(d1, d2) {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        const diffTime = Math.abs(date2 - date1);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24))
    }
    return (
        <div className={styles.card}>
            <div className={styles.cardImageContainer}>
                <img 
                    src={cruise.imageUrl} 
                    alt={cruise.title} 
                    className={styles.cardImage} 
                />
            </div>
            
            <div className={styles.cardContent}>
                <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{cruise.cruiseName}</h3>
                    <p className={styles.cardSubtitle}>
                        {cruise.departurePort} → {cruise.arrivalPort}
                    </p>
                    <div className={styles.cardMeta}>
                        <span className={styles.cardMetaMain}>{calculateDuration(cruise.embarkationDate, cruise.arrivalDate)} days</span>
                        <span className={styles.cardMetaSecondary}>{cruise.cabinType}</span>
                    </div>
                </div>

                <div className={styles.cardFooter}>
                    <div className={styles.cardPrice}>US${cruise.price}</div>
                    <div className={styles.cardDetails}>
                        <div>{cruise.description}</div>
                    </div>
                    <div className={styles.cardActions}>
                        <button className={styles.editButton} onClick={() => onEdit(cruise)}>
                            Edit
                        </button>
                        <button className={styles.deleteButton} onClick={() => onDelete(cruise.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}