import React from 'react'
import style from './FlightsActivity.module.css'
import ServiceProviderSidebar from '../../Sidebar/ServiceProviderSidebar'
import FlightBody from '../../ActivityBodies/FlightBody'

export default function FlightsActivity() {
    return (
        <div className={style.flightsContainer}>
            <ServiceProviderSidebar />
            <FlightBody />
        </div>
    )
}