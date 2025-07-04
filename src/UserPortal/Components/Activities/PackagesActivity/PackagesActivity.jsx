import React, { useState, useEffect } from 'react';
import PackageSidebar from '../../Sidebar/PackageSidebar';
import PackagesBody from '../../ActivityBodies/PackagesBody';
import Billing from '../BillingActivity/BillingActivity';
import WhatsAppFloatingButton from '../WhatsApp/WhatsAppFloatingButton';

const hardcodedData = {
  packages: [
    {
      id: 1,
      isBooked: false,
      packageName: "Tropical Island Escape",
      destination: "Maldives",
      startDate: "2025-06-15",
      endDate: "2025-06-22",
      packageType: "All-Inclusive",
      duration: "1 Week",
      price: 2999,
      travelers: 2,
      features: ["Free Cancellation", "Airport Transfers"],
      imageUrl: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      isBooked: false,
      packageName: "European Adventure Tour",
      destination: "Italy, France, Switzerland",
      startDate: "2025-07-01",
      endDate: "2025-07-15",
      packageType: "Adventure Tours",
      duration: "10+ Days",
      price: 4590,
      travelers: 4,
      features: ["Guided Tours", "Free Cancellation"],
      imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      isBooked: false,
      packageName: "City Lights Weekend",
      destination: "New York City",
      startDate: "2025-05-10",
      endDate: "2025-05-13",
      packageType: "Flight+Hotel",
      duration: "Weekend Getaway (3-4 days)",
      price: 890,
      travelers: 1,
      features: ["Free Cancellation"],
      imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      isBooked: false,
      packageName: "Safari Serenity",
      destination: "Maasai Mara, Kenya",
      startDate: "2025-08-20",
      endDate: "2025-08-27",
      packageType: "Wildlife Adventure",
      duration: "1 Week",
      price: 3290,
      travelers: 2,
      features: ["Guided Safari", "All Meals Included"],
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPIeHDVEAX0bUGqg3GYmlbS6l5fQfuFKkjXA&s"
    },
    {
      id: 5,
      isBooked: false,
      packageName: "Alpine Chill Retreat",
      destination: "Zermatt, Switzerland",
      startDate: "2025-12-19",
      endDate: "2025-12-26",
      packageType: "Ski Resort Package",
      duration: "1 Week",
      price: 3850,
      travelers: 2,
      features: ["Ski Pass Included", "Spa Access"],
      imageUrl: "https://www.travelandleisure.com/thmb/F3V1ei2YrUH4Qd_fvSgkAneZ4R8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-header-zermatt-switzerland-ZERMATT0123-08b7127082434b9f83db57251c051c1b.jpg"
    },
    {
      id: 6,
      isBooked: false,
      packageName: "Rainforest Rejuvenation",
      destination: "Costa Rica",
      startDate: "2025-09-05",
      endDate: "2025-09-12",
      packageType: "Eco Wellness Retreat",
      duration: "1 Week",
      price: 2475,
      travelers: 2,
      features: ["Yoga Classes", "Nature Hikes", "Organic Meals"],
      imageUrl: "https://b1088268.smushcdn.com/1088268/wp-content/uploads/2023/03/costa-rica-beach-Cahuita-National-Park.jpg?lossy=2&strip=1&webp=1"
    }    
  ]
};

export default function PackagesActivity() {
  const [packageListings, setPackageListings] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [filters, setFilters] = useState(null);

  function applyPackageFilters(packages, filters) {
    return packages.filter(pkg => {
      const {
        destination,
        startDate,
        endDate,
        packageType,
        durations,
        minPrice,
        maxPrice,
        travelers,
        features
      } = filters;
  
      if (destination && !pkg.destination.toLowerCase().includes(destination.toLowerCase())) return false;
  
      if (startDate && new Date(pkg.startDate) < new Date(startDate)) return false;
      if (endDate && new Date(pkg.endDate) > new Date(endDate)) return false;
  
      if (packageType && pkg.packageType !== packageType) return false;
  
      if (durations.length > 0 && !durations.includes(pkg.duration)) return false;
  
      if (minPrice && pkg.price < Number(minPrice)) return false;
      if (maxPrice && pkg.price > Number(maxPrice)) return false;
  
      if (travelers && pkg.travelers !== Number(travelers)) return false;
  
      if (features.length > 0 && !features.every(f => pkg.features.includes(f))) return false;
  
      return true;
    });
  }

  const fetchPackageData = () => {
    const stored = localStorage.getItem('packageListings');
    const data = stored ? JSON.parse(stored) : hardcodedData.packages;

    if (!stored) {
      localStorage.setItem('packageListings', JSON.stringify(data));
    }

    setPackageListings(data);
    if (filters) {
      const filtered = applyPackageFilters(data, filters);
      setFilteredPackages(filtered);
    } else {
      setFilteredPackages(data);
    }
  };

  useEffect(() => {
    fetchPackageData();
    const handleStorageChange = (e) => {
      if (e.key === 'packageListings' || e.type === 'storage') {
        fetchPackageData();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    const data = JSON.parse(localStorage.getItem('packageListings')) || hardcodedData.packages;
    const filtered = applyPackageFilters(data, newFilters);
    setFilteredPackages(filtered);
  };

  return (
    <>
      <PackageSidebar setPackageFilters={handleApplyFilters} />
      <PackagesBody packageData={filteredPackages} />
      <Billing id="billingModal" />
      <WhatsAppFloatingButton />
    </>
  );
}