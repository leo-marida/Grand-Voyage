import React, {useState, useEffect, use} from 'react';
import styles from './ServiceProviderSidebar.module.css';

const ServiceProviderSidebar = () => {
  const [totalListings, setTotalListings] = useState(0);
  const [monthlyViews, setMonthlyViews] = useState(0);
  const [lastMonthViews, setLastMonthViews] = useState(0);
  const [trend, setTrend] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueBreakdown, setRevenueBreakdown] = useState({ bookings: 0, commissions: 0 });

  useEffect(() => {
    getTotalListings();
    getMonthlyViews();
    getLastMonthViews();
    getConversionRate();
    getRevenueBreakdown();
  }, []);

  useEffect(() => {
    if (lastMonthViews !== 0) {
      const trendValue = ((monthlyViews - lastMonthViews) / lastMonthViews) * 100;
      setTrend(Number(trendValue.toFixed(1)));
    } else {
      setTrend(0); // Avoid division by zero
    }
  }, [monthlyViews, lastMonthViews]);
  
  function getTotalListings() {
    const email = localStorage.getItem("email");
  
    const hotelListings = JSON.parse(localStorage.getItem("hotelListings")) || [];
    const cruiseListings = JSON.parse(localStorage.getItem("cruiseListings")) || [];
    const flightListings = JSON.parse(localStorage.getItem("flightListings")) || [];
  
    const hotelCount = hotelListings.filter(listing => listing.providerEmail === email).length;
    const cruiseCount = cruiseListings.filter(listing => listing.providerEmail === email).length;
    const flightCount = flightListings.filter(listing => listing.providerEmail === email).length;
  
    const total = hotelCount + cruiseCount + flightCount;
  
    setTotalListings(total);
  }
  

  function getMonthlyViews() {
    setMonthlyViews(0);
  }
  
  function getLastMonthViews() {
    setLastMonthViews(0);
  }
  
  function getConversionRate() {
    setConversionRate(0);
  }
  
  function getRevenueBreakdown() {
    setRevenueBreakdown({
      bookings: 0,
      commissions: 0,
    });
  }
  

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterSection}>
        <h2 className={styles.sectionTitle}>Service Analytics</h2>

        <div className={styles.statCard}>
          <h3>Total Listings</h3>
          <div className={styles.statValue}>{totalListings}</div>
          <div className={styles.statSubtext}>Active offers</div>
        </div>

        <div className={styles.statCard}>
          <h3>Monthly Views</h3>
          <div className={styles.statValue}>{monthlyViews}</div>
          <div className={styles.statTrend}>
            <span className={trend >= 0 ? styles.trendUp : styles.trendDown}>{trend > 0 ? `+${trend}%` : `${trend}%`}</span> from last month
          </div>
        </div>

        <div className={styles.statCard}>
          <h3>Conversion Rate</h3>
          <div className={styles.statValue}>{conversionRate}%</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: conversionRate +"%" }}></div>
          </div>
        </div>

        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <div className={styles.statValue}>{revenueBreakdown.bookings + revenueBreakdown.commissions}</div>
          <div className={styles.revenueBreakdown}>
            <div><span>Bookings:</span> ${revenueBreakdown.bookings}</div>
            <div><span>Commissions:</span> ${revenueBreakdown.commissions}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderSidebar;