import React, { useState, useEffect } from 'react';
import CruiseSidebar from '../../Sidebar/CruiseSidebar';
import CruisesBody from '../../ActivityBodies/CruisesBody';
import Billing from '../BillingActivity/BillingActivity';
import WhatsAppFloatingButton from '../WhatsApp/WhatsAppFloatingButton';

const hardcodedData = {
  cruises: [
    {
      id: 1,
      isBooked: false,
      cruiseName: "Mediterranean Dream",
      departurePort: "Barcelona, Spain",
      arrivalPort: "Rome, Italy",
      nights: 7,
      cabinType: "Suite",
      price: 2499,
      embarkationDate: "August 15, 2025",
      amenities: ["Pool", "Spa"],
      imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      isBooked: false,
      cruiseName: "Caribbean Explorer",
      departurePort: "Miami, USA",
      arrivalPort: "Nassau, Bahamas",
      nights: 5,
      cabinType: "Balcony",
      price: 1899,
      embarkationDate: "September 1, 2025",
      amenities: ["Casino, Theater"],
      imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      isBooked: false,
      cruiseName: "Northern Lights Voyage",
      departurePort: "Reykjavik, Iceland",
      arrivalPort: "Tromsø, Norway",
      nights: 10,
      cabinType: "Suite",
      price: 2999,
      embarkationDate: "October 5, 2025",
      amenities: ["Spa"],
      imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      isBooked: false,
      cruiseName: "Asian Odyssey",
      departurePort: "Singapore",
      arrivalPort: "Tokyo, Japan",
      nights: 12,
      cabinType: "Interior",
      price: 3399,
      embarkationDate: "November 12, 2025",
      amenities: ["Pool", "Spa", "Casino"],
      imageUrl: "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
    },
    {
      id: 5,
      isBooked: false,
      cruiseName: "Alaskan Frontier",
      departurePort: "Seattle, USA",
      arrivalPort: "Juneau, Alaska",
      nights: 7,
      cabinType: "Ocean View",
      price: 2299,
      embarkationDate: "July 10, 2025",
      amenities: [],
      imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 6,
      isBooked: false,
      cruiseName: "Arabian Nights",
      departurePort: "Dubai, UAE",
      arrivalPort: "Muscat, Oman",
      nights: 4,
      cabinType: "Interior",
      price: 1699,
      embarkationDate: "December 20, 2025",
      amenities: ["Pool", "Spa"],
      imageUrl: "https://cdn.travelwings.com/assets/images/04%20Nights%20Arabian%20Gulf%20Cruising%2001.jpg"
    }
    
  ]
};

export default function CruisesActivity() {
  const [cruiseData, setCruiseData] = useState([]);
  const [filteredCruises, setFilteredCruises] = useState([]);
  
  const [filters, setFilters] = useState({
    cruiseShip: '',
    departurePort: '',
    arrivalPort: '',
    startDate: '',
    endDate: '',
    cabinType: '',
    amenities: [],
    priceRange: { min: 0, max: 10000 },
  });

  const fetchCruiseData = () => {
    const stored = localStorage.getItem('cruiseListings');
    if (stored) {
      setCruiseData(JSON.parse(stored));
    } else {
      localStorage.setItem('cruiseListings', JSON.stringify(hardcodedData.cruises));
      setCruiseData(hardcodedData.cruises);
    }
  };

  // Apply filters to cruise data
  const applyFilters = (filters) => {
    let filteredData = [...cruiseData];

    // Filter by cruise name
    if (filters.cruiseShip) {
      filteredData = filteredData.filter(cruise =>
        cruise.cruiseName.toLowerCase().includes(filters.cruiseShip.toLowerCase())
      );
    }

    // Filter by departure port
    if (filters.departurePort) {
      filteredData = filteredData.filter(cruise =>
        cruise.departurePort.toLowerCase().includes(filters.departurePort.toLowerCase())
      );
    }

    // Filter by arrival port
    if (filters.arrivalPort) {
      filteredData = filteredData.filter(cruise =>
        cruise.arrivalPort.toLowerCase().includes(filters.arrivalPort.toLowerCase())
      );
    }

    // Filter by cabin type
    if (filters.cabinType) {
      filteredData = filteredData.filter(cruise =>
        cruise.cabinType.toLowerCase().includes(filters.cabinType.toLowerCase())
      );
    }

    // Filter by amenities
    if (filters.amenities.length) {
      filteredData = filteredData.filter(cruise =>
        filters.amenities.every(amenity =>
          cruise.amenities.some(a => a.toLowerCase() === amenity.toLowerCase())
        )
      );
    }

    // Filter by price range
    if (filters.priceRange.min || filters.priceRange.max) {
      filteredData = filteredData.filter(cruise =>
        cruise.price >= filters.priceRange.min && cruise.price <= filters.priceRange.max
      );
    }

    // Update the filtered cruises state
    setFilteredCruises(filteredData);
  };

  useEffect(() => {
    fetchCruiseData();
    
    // Add event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'cruiseListings' || e.type === 'storage') {
        fetchCruiseData();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    applyFilters(filters);
  }, [filters, cruiseData]); // Reapply filters when either filters or cruiseData change

  return (
    <>
      <CruiseSidebar onFilterChange={setFilters} />
      <CruisesBody cruiseData={filteredCruises} />
      <Billing id="billingModal" />
      <WhatsAppFloatingButton />
    </>
  );
}
