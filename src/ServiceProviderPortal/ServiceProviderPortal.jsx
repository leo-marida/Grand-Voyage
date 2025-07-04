import React, {useState} from "react"
import style from './ServiceProviderPortal.module.css'
import Navbar from "./Components/Navbar"
import ContactUsActivity from "./Components/Activities/ContactUsActivity/ContactUsActivity"
import ServicesActivity from "./Components/Activities/ServicesActivity/ServicesActivity"
import FlightsActivity from "./Components/Activities/FlightsActivity/FlightsActivity"
import CruisesActivity from "./Components/Activities/CruisesActivity/CruisesActivity"
import Contract from "./Components/Contract"


export default function ServiceProviderPortal() {
    const [currentActivity, setCurrentActivity] = useState("services")
    let activity

    if (currentActivity === "services") {
        activity = <ServicesActivity></ServicesActivity>
        document.title = 'Service Provider Portal - Services'
    }
    else if (currentActivity === "flights") {
        activity = <FlightsActivity></FlightsActivity>
        document.title = 'Service Provider Portal - Flights'
    }
    else if (currentActivity === "cruises") {
        activity = <CruisesActivity></CruisesActivity>
        document.title = 'Service Provider Portal - Cruises'
    }
    else if (currentActivity === "contactUs") {
        activity = <ContactUsActivity></ContactUsActivity>
        document.title = 'Service Provider Portal - Contact Us'
    }

    return (
        <div>
            <Navbar switchActivity={(a) => setCurrentActivity(a)}
                    openModal={() => document.getElementById("contract").showModal()}></Navbar>
            <Contract id="contract"></Contract>
            {activity}
        </div>
    )
}