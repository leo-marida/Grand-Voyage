import React from 'react';
import PackageCard from '../Cards/PackageCard';
import styles from './ActivitiesBody.module.css';

export default function PackagesBody({ packageData }) {
  return (
    <div className={styles.gridContainer}>
      <h2 className={styles.gridTitle}>Available Packages</h2>
      <div className={styles.cardGrid}>
      {packageData.map((pkg, index) => (
        <PackageCard
          key={index}
          id={pkg.id}
          destination={pkg.destination}
          startDate={pkg.startDate}
          endDate={pkg.endDate}
          packageName={pkg.packageName}
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
  );
}