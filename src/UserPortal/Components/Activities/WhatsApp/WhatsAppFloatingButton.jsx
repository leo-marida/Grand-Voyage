// WhatsAppFloatingButton.jsx
import React from 'react';
import styles from './WhatsAppFloatingButton.module.css';
import { FaWhatsapp } from 'react-icons/fa'; // Install react-icons package first

const WhatsAppFloatingButton = () => {
  // Replace with your actual business WhatsApp number (include country code)
  const phoneNumber = '+1234567890'; 
  const message = 'Hi! I would like to inquire about travel services.'; 

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.whatsappButton}
        onClick={openWhatsApp}
        aria-label="Contact us via WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp className={styles.icon} />
      </button>
    </div>
  );
};

export default WhatsAppFloatingButton;