import React from 'react'
import style from './ServicesActivity.module.css'
import ServiceProviderSidebar from '../../Sidebar/ServiceProviderSidebar'
import ServicesBody from '../../ActivityBodies/ServicesBody'

export default function ServicesActivity() {
    return (
        <div className={style.servicesContainer}>
            <ServiceProviderSidebar />
            <ServicesBody />
        </div>
    )
}