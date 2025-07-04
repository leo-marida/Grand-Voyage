import React from 'react';
import HotelCard from '../Cards/HotelCard';
import styles from './ActivitiesBody.module.css';

export default function HotelsBody({ serviceData }) {
  return (
    <div className={styles.gridContainer}>
      <h2 className={styles.gridTitle}>Available Housing Services</h2>
      <div className={styles.cardGrid}>
      {serviceData.map((hotel, index) => (
        <HotelCard
          key={index}
          id={hotel.id}
          title={hotel.title}
          rating={hotel.rating}
          reviewCount={hotel.reviewCount}
          nights={hotel.nights}
          roomType={hotel.roomType}
          pricePerNight={hotel.pricePerNight}
          mealPlan={hotel.mealPlan}
          imageUrl={hotel.imageUrl}
          location={hotel.location}
          isBooked={hotel.isBooked}
        />
      ))}

      </div>
    </div>
  );
}