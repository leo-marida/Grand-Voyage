import React, {useState} from "react"
import Navbar from "./Components/Navbar"
import AboutUsActivity from "./Components/Activities/AboutUsActivity/AboutUsActivity"
import ContactUsActivity from './Components/Activities/ContactUsActivity/ContactUsActivity'
import CruisesActivity from './Components/Activities/CruisesActivity/CruisesActivity'
import FlightsActivity from './Components/Activities/FlightsActivity/FlightsActivity'
import PackagesActivity from './Components/Activities/PackagesActivity/PackagesActivity'
import PreviousBookingsActivity from './Components/Activities/PreviousBookingsActivity/PreviousBookingsActivity'
import ProfileActivity from './Components/Activities/ProfileActivity/ProfileActivity'
import ServicesActivity from './Components/Activities/ServicesActivity/ServicesActivity'
import BillingActivity from './Components/Activities/BillingActivity/BillingActivity'
import style from './UserPortal.module.css'



export default function UserPortal() {
    
    const [currentActivity, setCurrentActivity] = useState("aboutUs")
    let activity

    if (currentActivity === "aboutUs") {
        activity = <AboutUsActivity></AboutUsActivity>
        document.title = 'User Portal - About Us'
    }
    else if (currentActivity === "services") {
        activity = <ServicesActivity></ServicesActivity>
        document.title = 'User Portal - Services'
    }
    else if (currentActivity === "packages") {
        activity = <PackagesActivity></PackagesActivity>
        document.title = 'User Portal - Packages'
    }
    else if (currentActivity === "flights") {
        activity = <FlightsActivity></FlightsActivity>
        document.title = 'User Portal - Flights'
    }
    else if (currentActivity === "cruises") {
        activity =<CruisesActivity></CruisesActivity>
        document.title = 'User Portal - Cruises'
    }
    else if (currentActivity === "contactUs") {
        activity = <ContactUsActivity></ContactUsActivity>
        document.title = 'User Portal - Contact Us'
    }
    else if (currentActivity === "previousBookings") {
        activity = <PreviousBookingsActivity></PreviousBookingsActivity>
        document.title = 'User Portal - Previous Bookings'
    }
    else if (currentActivity === "profile") {
        activity = <ProfileActivity></ProfileActivity>
        document.title = 'User Portal - Profile'
    }
    else {
        activity = <AboutUsActivity></AboutUsActivity>
    }

    return (
        <div>
            <Navbar switchActivity={(a) => setCurrentActivity(a)}></Navbar>
            {activity}
        </div>
    )
}