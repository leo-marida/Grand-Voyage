import React from 'react';
import style from './CruisesActivity.module.css';
import ServiceProviderSidebar from '../../Sidebar/ServiceProviderSidebar';
import CruiseBody from '../../ActivityBodies/CruiseBody';

export default function CruisesActivity() {
    return (
        <div className={style.cruisesContainer}>
            <ServiceProviderSidebar />
            <CruiseBody />
        </div>
    );
}