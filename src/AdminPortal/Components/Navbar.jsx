import React from 'react'
import style from './Navbar.module.css'
import contract from '../../assets/contract.svg'
import userProfile from '../../assets/person.svg'
import GV_WonT_L_img from '../../assets/GV_WonT_L.png'


export default function Navbar({ switchActivity }) {

    return (
        <div className={style.navbar}>
            <div className={style.logoContainer}>
                <img src={GV_WonT_L_img} alt="Company Logo" className={style.logo} />
                <h1 className={style.companyName}>Grand Voyage</h1>
            </div>
            <div className={style.buttonContainer}>
                <button onClick={() => switchActivity("users")}>Users</button>
                <button onClick={() => switchActivity("serviceproviders")}>Service Providers</button>
                <button onClick={() => switchActivity("contracts")}>Contracts</button>
                <button onClick={() => switchActivity("packages")}>Packages</button>
            </div>
        </div>
    )
}