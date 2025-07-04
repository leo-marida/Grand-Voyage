import React from 'react'
import Billing from '../BillingActivity/BillingActivity'
import WhatsAppFloatingButton from '../WhatsApp/WhatsAppFloatingButton'

export default function ProfileActivity(props) {
    return (
        <>
            <Billing id="billingModal" />
            <WhatsAppFloatingButton />
        </>
    )
}