import React from 'react';
import Billing from '../BillingActivity/BillingActivity';
import styles from './AboutUsActivity.module.css';
import WhatsAppFloatingButton from '../WhatsApp/WhatsAppFloatingButton';

export default function AboutUsPage() {
  return (
    <>
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.establishedSince}>Since 2025</h1>
          <h2 className={styles.sectionTitle}>About GrandVoyage</h2>
        </div>
      </section>

      {/* About Content */}
      <section className={styles.aboutSection}>
        <article className={styles.aboutText}>
          <p>
            Grand Voyage is a leading travel and tourism agency since 1980. 
            Through collaborations with touristic agencies worldwide and visa 
            application centers, we are able to plan and assist your trip from 
            your departure until your arrival according to your needs and budget.
          </p>
          <p>
            Wherever you are in the world, GrandVoyage ensures an optimum 
            customer service for all your needs abroad.
          </p>
        </article>

        {/* Why Us Section */}
        <div className={styles.whyUs}>
          <h3 className={styles.sectionTitle}>Why Choose Us?</h3>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <h4>0+ Years Experience</h4>
              <p>Trusted travel planning since 2025</p>
            </div>
            <div className={styles.card}>
              <h4>Global Network</h4>
              <p>Partnerships in 0+ countries</p>
            </div>
            <div className={styles.card}>
              <h4>2/2 Support</h4>
              <p>Always available during weekends from 3pm to 5 pm</p>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <section className={styles.servicesSection}>
          <h3 className={styles.sectionTitle}>Our Services</h3>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.iconBox}>🏨</div>
              <h4>Hotel & Resort Partnerships</h4>
              <p>Exclusive rates with premium accommodations worldwide</p>
            </div>
            
            <div className={styles.serviceCard}>
              <div className={styles.iconBox}>🛂</div>
              <h4>Visa Assistance</h4>
              <p>Official partnership with TLS Visa Application Center</p>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.iconBox}>✈️</div>
              <h4>Custom Packages</h4>
              <p>Tailor-made itineraries to match your budget and preferences</p>
            </div>
          </div>
        </section>
      </section>
    </div>
    <Billing id="billingModal" />
    <WhatsAppFloatingButton />
    </>
  );
};