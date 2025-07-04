import React from 'react';
import CruiseCard from '../Cards/CruiseCard';
import styles from './ActivitiesBody.module.css';

export default function CruisesBody({ cruiseData }) {
  return (
    <div className={styles.gridContainer}>
      <h2 className={styles.gridTitle}>Available Cruises</h2>
      <div className={styles.cardGrid}>
        {cruiseData.map((cruise, index) => (
          <CruiseCard
            key={index}
            id={cruise.id}
            cruiseName={cruise.cruiseName}
            departurePort={cruise.departurePort}
            arrivalPort={cruise.arrivalPort}
            nights={cruise.nights}
            cabinType={cruise.cabinType}
            price={cruise.price}
            embarkationDate={cruise.embarkationDate}
            amenities={cruise.amenities}
            image={cruise.imageUrl}
            isBooked={cruise.isBooked}
          />
        ))}
      </div>
    </div>
  );
}
