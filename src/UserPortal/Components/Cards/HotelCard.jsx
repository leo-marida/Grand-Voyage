import React, { useState, useEffect } from 'react';
import styles from './Card.module.css';
import ExpandedService from '../Activities/ExpandedCards/ExpandedService';
import { generateBookingPDF } from './generateBooking';

const HotelCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    // On mount, check if there's local storage data for this hotel
    const storedServices = JSON.parse(localStorage.getItem("hotelListings")) || [];
    const hotel = storedServices.find(service => service.id === props.id);
    if (hotel) {
      setIsBooked(hotel.isBooked);
    }
  }, [props.id]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const updateLocalStorageBooking = (hotelId, bookingStatus) => {
    const storedServices = JSON.parse(localStorage.getItem("hotelListings")) || [];
    const updatedServices = storedServices.map(service =>
      service.id === hotelId ? { ...service, isBooked: bookingStatus } : service
    );
    localStorage.setItem("hotelListings", JSON.stringify(updatedServices));
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
                          props.title,
                          payerName,
                          "Housing",
                          props.pricePerNight
                        );
    }
    else if (!isBooked && paymentType === "cash") {
      alert("Booking successful! Please pay in cash at the nearest OMT or Whish within the next 7 days.");
      generateBookingPDF(
        props.hotelName,
        payerName,
        "Housing",
        props.pricePerNight
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
          <img src={props.imageUrl} alt={props.title} className={styles.cardImage} />
        </div>
        
        <div className={styles.cardContent}>
          <div className={styles.cardInfo}>
            <h3 className={styles.cardTitle}>{props.title}</h3>
            <p className={styles.cardSubtitle}>{props.location}</p>
            <div className={styles.cardMeta}>
              <span className={styles.cardMetaMain}>{props.rating} Excellent</span>
              <span className={styles.cardMetaSecondary}>({props.reviewCount} reviews)</span>
            </div>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.cardPrice}>US${props.pricePerNight}</div>
            <div className={styles.cardDetails}>{props.nights || "4"} nights</div>
            <button className={styles.cardButton} onClick={openModal}>
              {isBooked ? 'Cancel' : 'Book'}
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <ExpandedService 
          serviceData={props}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isBooked={isBooked}
        />
      )}
    </>
  );
};

export default HotelCard;
