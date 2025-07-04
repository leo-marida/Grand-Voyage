import React, { useState, useEffect } from 'react';
import style from './ActivitiesBody.module.css';
import CreateCard from '../Cards/CreateCard';
import FlightCard from '../Cards/FlightCard';
import ExpandedCreateFlightCard from '../ExpandedCards/ExpandedCreateFlightCard';
import ExpandedFlight from '../ExpandedCards/ExpandedFlight';

export default function FlightBody() {
    const [allFlights, setAllFlights] = useState([]);
    const [flights, setFlights] = useState([]);
    const [editingFlight, setEditingFlight] = useState(null);

    const loggedInEmail = localStorage.getItem("email");

    useEffect(() => {
        const storedFlights = localStorage.getItem('flightListings');
        if (storedFlights) {
            const parsedFlights = JSON.parse(storedFlights);
            setAllFlights(parsedFlights);
            setFlights(parsedFlights.filter(flight => flight.providerEmail === loggedInEmail));
        }
    }, [loggedInEmail]);

    useEffect(() => {
        if (editingFlight) {
            const modal = document.getElementById("editFlightModal");
            if (modal) {
                modal.showModal();
            }
        }
    }, [editingFlight]);

    function hasContract() {
        const contracts = JSON.parse(localStorage.getItem("contracts")) || {};
        return contracts.hasOwnProperty(loggedInEmail);
    }

    function handleCreateFlight(newFlight) {
        if (!hasContract()) {
            alert("You need to sign a contract before adding flights.");
            return;
        }

        const newFlightWithEmail = {
            ...newFlight,
            providerEmail: loggedInEmail,
            id: Date.now() // or UUID for better uniqueness
        };

        const updatedAllFlights = [...allFlights, newFlightWithEmail];
        setAllFlights(updatedAllFlights);
        setFlights(updatedAllFlights.filter(flight => flight.providerEmail === loggedInEmail));
        localStorage.setItem('flightListings', JSON.stringify(updatedAllFlights));
    }

    const handleDeleteFlight = (flightId) => {
        const updatedAllFlights = allFlights.filter(flight => flight.id !== flightId);
        setAllFlights(updatedAllFlights);
        setFlights(updatedAllFlights.filter(flight => flight.providerEmail === loggedInEmail));
        localStorage.setItem('flightListings', JSON.stringify(updatedAllFlights));
    };

    const handleEdit = (flight) => {
        setEditingFlight(flight);
    };

    const handleSaveEdit = (updatedFlight) => {
        const updatedAllFlights = allFlights.map(flight =>
            flight.id === updatedFlight.id ? updatedFlight : flight
        );
        setAllFlights(updatedAllFlights);
        setFlights(updatedAllFlights.filter(flight => flight.providerEmail === loggedInEmail));
        localStorage.setItem('flightListings', JSON.stringify(updatedAllFlights));
        setEditingFlight(null);
    };

    return (
        <>
            <div className={style.gridContainer}>
                <div className={style.cardGrid}>
                    <div onClick={() => document.getElementById("createFlightCard").showModal()}>
                        <CreateCard type="flight" />
                    </div>
                    {flights.map(flight => (
                        <FlightCard
                            key={flight.id}
                            flight={flight}
                            onDelete={handleDeleteFlight}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>
            <ExpandedCreateFlightCard id="createFlightCard" onAddCard={handleCreateFlight} />
            {editingFlight && (
                <ExpandedFlight
                    id="editFlightModal"
                    flight={editingFlight}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingFlight(null)}
                />
            )}
        </>
    );
}
