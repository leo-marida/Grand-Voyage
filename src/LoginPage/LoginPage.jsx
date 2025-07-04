import React from "react"
import GV_BonW_img from '../assets/GV_BonW.jpg'
import style from './LoginPage.module.css'

export default function LoginPage(props) {
    function handleLogin() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Please fill in all fields!");
            return;
        }

        // Check in users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            props.goToUserPortal();
            return;
        }

        // Check in service providers
        const serviceProviders = JSON.parse(localStorage.getItem('serviceProviders') || '[]');
        const serviceProvider = serviceProviders.find(sp => sp.email === email && sp.password === password);
        
        if (serviceProvider) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            props.goToServiceProviderPortal();
            return;
        }

        alert("Invalid email or password!");
    }

    return (
        <div>
            <div className={style.logoHeader}>
                <img src={GV_BonW_img} alt="Company Logo" className={style.logo} />
                <h1 className={style.companyName}>Grand Voyage</h1>
            </div>
            <form className={style.container}>
                <div className={style.header}>
                    <div className={style.text}>Login</div>
                    <div className={style.underline}></div>
                </div>
                <div className={style.inputs}>
                    <div className={style.input}>
                        <label htmlFor="email">Email:</label>
                        <input id="email" type="email" placeholder="Email" />
                    </div>
                    <div className={style.input}>
                        <label htmlFor="password">Password:</label>
                        <input id="password" type="password" placeholder="Password" />
                    </div>
                </div>
                <div className={style.submitContainer}>
                    <button className={style.submit} onClick={handleLogin}>Login</button>
                </div>
                <div className={style.login}>Don't have an account? <span onClick={props.switchToSignUp}>Sign up here!</span></div>
            </form>
        </div>
    )
}