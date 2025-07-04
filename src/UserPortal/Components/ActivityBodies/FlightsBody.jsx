import React from 'react';
import FlightCard from '../Cards/FlightCard';
import styles from './ActivitiesBody.module.css';

export default function FlightsBody({ flightData }) {
  return (
    <div className={styles.gridContainer}>
      <h2 className={styles.gridTitle}>Available Flights</h2>
      <div className={styles.cardGrid}>
      {flightData.map((flight, index) => (
        <FlightCard
          key={index}
          id={flight.id}
          airline={flight.airline}
          departureAirport={flight.departureAirport}
          arrivalAirport={flight.arrivalAirport}
          duration={flight.flightDurationHours}
          cabinClass={flight.cabinClass}
          price={flight.price}
          date={flight.departureDate}
          imageUrl={flight.imageUrl}
          baggage={flight.baggageAllowance}
          mealsIncluded={flight.mealsIncluded}
          noLayover={flight.noLayover}
          flightNumber={flight.flightNumber}
          isBooked={flight.isBooked} // Assuming this is part of the flight data
        />
      ))}

      </div>
    </div>
  );
}