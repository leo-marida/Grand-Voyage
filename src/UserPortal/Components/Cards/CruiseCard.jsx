import React, { useState, useEffect } from 'react';
import styles from './Card.module.css';
import ExpandedCruise from '../Activities/ExpandedCards/ExpandedCruise';
import { generateBookingPDF } from './generateBooking';

const CruiseCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    // This effect runs on mount and when props.id or props.isBooked changes
    setIsBooked(props.isBooked);
  }, [props.isBooked, props.id]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const updateLocalStorageBooking = (cruiseId, bookingStatus) => {
    try {
      const storedCruises = JSON.parse(localStorage.getItem("cruiseListings")) || [];
      const updatedCruises = storedCruises.map(cruise =>
        cruise.id === cruiseId ? { ...cruise, isBooked: bookingStatus } : cruise
      );
      localStorage.setItem("cruiseListings", JSON.stringify(updatedCruises));
      
      // Manually trigger storage event for the same window
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error("Error updating cruise booking status:", error);
    }
  };

  const handleSubmit = () => {
    const stored = localStorage.getItem("billingInfo");
    if (!stored) {
        alert("Please fill in your billing information first.");
        return;
    }

    const billingInfo = JSON.parse(stored);
    const { paymentType, currency, payerName, cardNumber, billingAddress } = billingInfo;

    if (
        !paymentType ||
        !currency ||
        !payerName.trim() ||
        !billingAddress.trim() ||
        (paymentType !== "cash" && !cardNumber.trim())
    ) {
        alert("Please complete all billing details before booking.");
        return;
    }

    const newBookingStatus = !isBooked;
    setIsBooked(newBookingStatus);
    updateLocalStorageBooking(props.id, newBookingStatus);
    closeModal();
    if (!isBooked && paymentType !== "cash") {
      alert("Booking successful! Your card will be charged.");
      generateBookingPDF(
        props.cruiseName,
        payerName,
        "Cruise",
        props.price
      );
    }
    else if (!isBooked && paymentType === "cash") {
      alert("Booking successful! Please pay in cash at the nearest OMT or Whish within the next 7 days.");
      generateBookingPDF(
        props.cruiseName,
        payerName,
        "Cruise",
        props.price
      );
    }
    else {
      alert("Booking successfully cancelled! You are eligible for a full refund.");    
    }
};


  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardImageContainer}>
          <img 
            src={props.image} 
            alt={props.cruiseName} 
            className={styles.cardImage} 
          />
        </div>
        
        <div className={styles.cardContent}>
          <div className={styles.cardInfo}>
            <h3 className={styles.cardTitle}>{props.cruiseName}</h3>
            <p className={styles.cardSubtitle}>
              {props.departurePort} → {props.arrivalPort}
            </p>
            <div className={styles.cardMeta}>
              <span className={styles.cardMetaMain}>{props.nights} Nights</span>
              <span className={styles.cardMetaSecondary}>{props.cabinType}</span>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.cardPrice}>US${props.price}</div>
            <div className={styles.cardDetails}>
              <div>Departs: {props.embarkationDate}</div>
              <div>Amenities: {props.amenities.join(" | ")}</div>
            </div>
            <button className={styles.cardButton} onClick={openModal}>
              {isBooked ? 'Cancel' : 'Book'}
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <ExpandedCruise 
          cruiseData={props}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isBooked={isBooked}
        />
      )}
    </>
  );
};

export default CruiseCard;