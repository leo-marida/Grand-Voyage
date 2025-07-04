import React, { useState, useEffect } from 'react';
import style from './ActivitiesBody.module.css';
import CreateCard from '../Cards/CreateCard';
import ServiceCard from '../Cards/ServiceCard';
import ExpandedCreateHousingCard from '../ExpandedCards/ExpandedCreateHousingCard';
import ExpandedService from '../ExpandedCards/ExpandedServices';

export default function ServicesBody() {
    const [allServices, setAllServices] = useState([]);
    const [services, setServices] = useState([]);
    const [editingService, setEditingService] = useState(null);

    const loggedInEmail = localStorage.getItem("email");

    useEffect(() => {
        const storedServices = localStorage.getItem('hotelListings');
        if (storedServices) {
            const parsedServices = JSON.parse(storedServices);
            setAllServices(parsedServices);
            setServices(parsedServices.filter(service => service.providerEmail === loggedInEmail));
        }
    }, [loggedInEmail]);

    useEffect(() => {
        if (editingService) {
            const modal = document.getElementById("editServiceModal");
            if (modal) {
                modal.showModal();
            }
        }
    }, [editingService]);

    function hasContract() {
        const contracts = JSON.parse(localStorage.getItem("contracts")) || {};
        return contracts.hasOwnProperty(loggedInEmail);
    }

    const handleDeleteService = (serviceId) => {
        const updatedAllServices = allServices.filter(service => service.id !== serviceId);
        setAllServices(updatedAllServices);
        setServices(updatedAllServices.filter(service => service.providerEmail === loggedInEmail));
        localStorage.setItem('hotelListings', JSON.stringify(updatedAllServices));
    };

    const handleEdit = (service) => {
        setEditingService(service);
    };

    const handleSaveEdit = (updatedService) => {
        const updatedAllServices = allServices.map(service =>
            service.id === updatedService.id ? updatedService : service
        );
        setAllServices(updatedAllServices);
        setServices(updatedAllServices.filter(service => service.providerEmail === loggedInEmail));
        localStorage.setItem('hotelListings', JSON.stringify(updatedAllServices));
        setEditingService(null);
    };

    const handleAddService = (newService) => {
        if (!hasContract()) {
            alert("You need to sign a contract before adding services.");
            return;
        }

        const newServiceWithEmail = {
            ...newService,
            providerEmail: loggedInEmail,
            id: Date.now()
        };

        const updatedAllServices = [...allServices, newServiceWithEmail];
        setAllServices(updatedAllServices);
        setServices(updatedAllServices.filter(service => service.providerEmail === loggedInEmail));
        localStorage.setItem('hotelListings', JSON.stringify(updatedAllServices));
    };

    return (
        <>
            <div className={style.gridContainer}>
                <div className={style.cardGrid}>
                    <div onClick={() => document.getElementById("createHousingCard").showModal()}>
                        <CreateCard type="housing" />
                    </div>
                    {services.map(service => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            onDelete={handleDeleteService}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>
            <ExpandedCreateHousingCard id="createHousingCard" onAddCard={handleAddService} />
            {editingService && (
                <ExpandedService
                    id="editServiceModal"
                    service={editingService}
                    onSave={handleSaveEdit}
                    onCancel={() => setEditingService(null)}
                />
            )}
        </>
    );
}
