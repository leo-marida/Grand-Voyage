import React from 'react';
import styles from './Card.module.css';

const ServiceCard = ({ service, onDelete, onEdit }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardImageContainer}>
                <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className={styles.cardImage}
                />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardSubtitle}>{service.category}</p>
                    <div className={styles.cardMeta}>
                        <span className={styles.cardMetaMain}>{service.duration}</span>
                        <span className={styles.cardMetaSecondary}>{service.location}</span>
                    </div>
                </div>
                <div className={styles.cardFooter}>
                    <div className={styles.cardPrice}>${service.pricePerNight}</div>
                    <p className={styles.cardDetails}>{service.description}</p>
                    <div className={styles.cardActions}>
                        <button 
                            className={styles.editButton}
                            onClick={() => onEdit(service)}
                        >
                            Edit
                        </button>
                        <button 
                            className={styles.deleteButton}
                            onClick={() => onDelete(service.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard; 