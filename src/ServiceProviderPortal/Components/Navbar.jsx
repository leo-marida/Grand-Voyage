import React from 'react'
import style from './Navbar.module.css'
import contract from '../../assets/contract.svg'
import userProfile from '../../assets/person.svg'
import GV_WonT_L_img from '../../assets/GV_WonT_L.png'


export default function Navbar({ switchActivity, openModal }) {

    return (
        <div className={style.navbar}>
            <div className={style.logoContainer}>
                <img src={GV_WonT_L_img} alt="Company Logo" className={style.logo} />
                <h1 className={style.companyName}>Grand Voyage</h1>
            </div>
            <div className={style.buttonContainer}>
                <button onClick={() => switchActivity("services")}>Housing</button>
                <button onClick={() => switchActivity("flights")}>Flights</button>
                <button onClick={() => switchActivity("cruises")}>Cruises</button>
                <button onClick={() => switchActivity("contactUs")}>Contact Us</button>
            </div>
            <div className={style.profileContainer}>
                <div className={style.profileIcon}>
                    <img onClick={() => openModal()} className={style.contract} src={contract} alt='Contract SVG' />
                    <span className={style.tooltip} data-tooltip="My Bookings">Create a Contract</span>
                </div>
                <div className={style.profileIcon}>
                    <img onClick={() => switchActivity("profile")} className={style.userProfile} src={userProfile} alt='User profile SVG' />
                    <span className={style.tooltip} data-tooltip="My Account">My Account</span>
                </div>
            </div>
        </div>
    )
}