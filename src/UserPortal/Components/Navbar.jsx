import React from 'react'
import style from './Navbar.module.css'
import travelCase from '../../assets/travelCase.svg'
import userProfile from '../../assets/person.svg'
import billingIcon from '../../assets/billing.svg'
import GV_WonT_L_img from '../../assets/GV_WonT_L.png'


export default function Navbar({ switchActivity }) {

    return (
        <div className={style.navbar}>
            <div className={style.logoContainer}>
                <img src={GV_WonT_L_img} alt="Company Logo" className={style.logo} />
                <h1 className={style.companyName}>Grand Voyage</h1>
            </div>
            <div className={style.buttonContainer}>
                <button onClick={() => switchActivity("aboutUs")}>About Us</button>
                <button onClick={() => switchActivity("services")}>Housing</button>
                <button onClick={() => switchActivity("packages")}>Packages</button>
                <button onClick={() => switchActivity("flights")}>Flights</button>
                <button onClick={() => switchActivity("cruises")}>Cruises</button>
                <button onClick={() => switchActivity("contactUs")}>Contact Us</button>
            </div>
            <div className={style.profileContainer}>
                <div className={style.profileIcon}>
                    <img onClick={() => document.getElementById("billingModal").showModal()} className={style.travelCase} src={billingIcon} alt='Dollar Bill SVG' />
                    <span className={style.tooltip} data-tooltip="My Billing">My Billing</span>
                </div>
                <div className={style.profileIcon}>
                    <img onClick={() => switchActivity("previousBookings")} className={style.travelCase} src={travelCase} alt='Travel case SVG' />
                    <span className={style.tooltip} data-tooltip="My Bookings">My Bookings</span>
                </div>
                <div className={style.profileIcon}>
                    <img onClick={() => switchActivity("profile")} className={style.userProfile} src={userProfile} alt='User profile SVG' />
                    <span className={style.tooltip} data-tooltip="My Account">My Account</span>
                </div>
            </div>
        </div>
    )
}