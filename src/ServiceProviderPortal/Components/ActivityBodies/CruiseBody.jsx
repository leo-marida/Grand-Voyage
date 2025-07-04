import React, { useState, useEffect } from 'react';
import style from './ActivitiesBody.module.css';
import CreateCard from '../Cards/CreateCard';
import CruiseCard from '../Cards/CruiseCard';
import ExpandedCruise from '../ExpandedCards/ExpandedCruise';
import ExpandedCreateCruiseCard from '../ExpandedCards/ExpandedCreateCruiseCard'; // Assuming it's correct name

export default function CruiseBody() {
    const [allCruises, setAllCruises] = useState([]);
    const [cruises, setCruises] = useState([]);
    const [editingCruise, setEditingCruise] = useState(null);

    const loggedInEmail = localStorage.getItem("email");

    useEffect(() => {
        const storedCruises = localStorage.getItem('cruiseListings');
        if (storedCruises) {
            const parsedCruises = JSON.parse(storedCruises);
            setAllCruises(parsedCruises);
            setCruises(parsedCruises.filter(cruise => cruise.providerEmail === loggedInEmail));
        }
    }, [loggedInEmail]);

    useEffect(() => {
        if (editingCruise) {
            const modal = document.getElementById("editCruiseModal");
            if (modal) {
                modal.showModal();
            }
        }
    }, [editingCruise]);

    function hasContract() {
        const contracts = JSON.parse(localStorage.getItem("contracts")) || {};
        return contracts.hasOwnProperty(loggedInEmail);
    }

    function handleCreateCruise(newCruise) {
        if (!hasContract()) {
            alert("You need to sign a contract before adding cruises.");
            return;
        }

        const newCruiseWithEmail = {
            ...newCruise,
            providerEmail: loggedInEmail,
            id: Date.now()
        };

        const updatedAllCruises = [...allCruises, newCruiseWithEmail];
        setAllCruises(updatedAllCruises);
        setCruises(updatedAllCruises.filter(cruise => cruise.providerEmail === loggedInEmail));
        localStorage.setItem('cruiseListings', JSON.stringify(updatedAllCruises));
    }

    const handleDelete = (id) => {
        const updatedAllCruises = allCruises.filter(cruise => cruise.id !== id);
        setAllCruises(updatedAllCruises);
        setCruises(updatedAllCruises.filter(cruise => cruise.providerEmail === loggedInEmail));
        localStorage.setItem('cruiseListings', JSON.stringify(updatedAllCruises));
    };

    const handleEdit = (cruise) => {
        setEditingCruise(cruise);
    };

    const handleSaveEdit = (updatedCruise) => {
        const updatedAllCruises = allCruises.map(cruise =>
            cruise.id === updatedCruise.id ? updatedCruise : cruise
        );
        setAllCruises(updatedAllCruises);
        setCruises(updatedAllCruises.filter(cruise => cruise.providerEmail === loggedInEmail));
        localStorage.setItem('cruiseListings', JSON.stringify(updatedAllCruises));
        setEditingCruise(null);
    };

    return (
        <>
            <div className={style.gridContainer}>
                <div className={style.cardGrid}>
                    <div onClick={() => document.getElementById("createCruiseCard").showModal()}>
                        <CreateCard type="cruise" />
                    </div>
                    {cruises.map(cruise => (
                        <CruiseCard
                            key={cruise.id}
                            cruise={cruise}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>
            <ExpandedCreateCruiseCard id="createCruiseCard" onAddCard={handleCreateCruise} />
            {editingCruise && (
                <ExpandedCruise
                    id="editCruiseModal"
                    cruise={editingCruise}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingCruise(null)}
                />
            )}
        </>
    );
}
