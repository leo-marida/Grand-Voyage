import React, { useState, useEffect } from 'react';
import HotelCard from '../../Cards/HotelCard';
import CruiseCard from '../../Cards/CruiseCard';
import FlightCard from '../../Cards/FlightCard';
import PackageCard from '../../Cards/PackageCard';
import styles from './PreviousBookingsActivity.module.css';
import ExpandedService from '../ExpandedCards/ExpandedService';
import Billing from '../BillingActivity/BillingActivity';
import WhatsAppFloatingButton from '../WhatsApp/WhatsAppFloatingButton';

export default function PreviousBookingsActivity(props) {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [flightBookings, setFlightBookings] = useState([]);
  const [cruiseBookings, setCruiseBookings] = useState([]);
  const [packageBookings, setPackageBookings] = useState([]);

  useEffect(() => {
    fetchHotelBookings();
    fetchFlightBookings();
    fetchCruiseBookings();
    fetchPackageBookings();
  }, []);

  function fetchHotelBookings() {
    const storedHotels = JSON.parse(localStorage.getItem("hotelListings")) || [];
    const bookedHotels = storedHotels.filter(hotel => hotel.isBooked);
    setHotelBookings(bookedHotels);
  }
  
  function fetchFlightBookings() {
    const storedFlights = JSON.parse(localStorage.getItem("flightListings")) || [];
    const bookedFlights = storedFlights.filter(flight => flight.isBooked);
    setFlightBookings(bookedFlights);
  }
  
  function fetchCruiseBookings() {
    const storedCruises = JSON.parse(localStorage.getItem("cruiseListings")) || [];
    const bookedCruises = storedCruises.filter(cruise => cruise.isBooked);
    setCruiseBookings(bookedCruises);
  }
  
  function fetchPackageBookings() {
    const storedPackages = JSON.parse(localStorage.getItem("packageListings")) || [];
    const bookedPackages = storedPackages.filter(pkg => pkg.isBooked);
    setPackageBookings(bookedPackages);
  }
  

  return (
    <>
      <div className={styles.previousBookingsContainer}>
        <h1 className={styles.previousBookingsTitle}>Previous Bookings</h1>
        <div className={styles.previousBookingsList}>
          
          {hotelBookings.map((hotel, index) => (
            <HotelCard
              key={`hotel-${index}`}
              id={hotel.id}
              hotelName={hotel.hotelName}
              hotelChain={hotel.hotelChain}
              rating={hotel.rating}
              reviewCount={hotel.reviewCount}
              nights={hotel.nights}
              roomType={hotel.roomType}
              pricePerNight={hotel.pricePerNight}
              amenities={hotel.amenities}
              mealPlan={hotel.mealPlan}
              imageUrl={hotel.imageUrl}
              location={hotel.location}
              isBooked={hotel.isBooked}
            />
          ))}

          {flightBookings.map((flight, index) => (
            <FlightCard
              key={`flight-${index}`}
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
              isBooked={flight.isBooked}
            />
          ))}

          {cruiseBookings.map((cruise, index) => (
            <CruiseCard
              key={`cruise-${index}`}
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

          {packageBookings.map((pkg, index) => (
            <PackageCard
              key={`package-${index}`}
              id={pkg.id}
              destination={pkg.destination}
              startDate={pkg.startDate}
              endDate={pkg.endDate}
              packageType={pkg.packageType}
              duration={pkg.duration}
              price={pkg.price}
              travelers={pkg.travelers}
              features={pkg.features}
              imageUrl={pkg.imageUrl}
              isBooked={pkg.isBooked}
            />
          ))}

        </div>
      </div>
      <Billing id="billingModal" />
      <WhatsAppFloatingButton />
    </>
  );
}
