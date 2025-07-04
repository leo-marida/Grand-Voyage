import React, { useEffect, useState } from "react";
import style from "./BillingActivity.module.css";

export default function Billing({ id }) {
    const [formData, setFormData] = useState({
        paymentType: "creditCard",
        currency: "LLP",
        payerName: "",
        cardNumber: "",
        billingAddress: ""
    });

    // Load from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("billingInfo");
        if (stored) {
            setFormData(JSON.parse(stored));
        }
    }, []);

    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special logic when changing paymentType
        if (name === "paymentType") {
            if (value === "cash") {
                setFormData(prev => ({
                    ...prev,
                    [name]: value,
                    cardNumber: "" // Clear card number if cash
                }));
            } else {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Save to localStorage
    const handleSave = () => {
        const dataToSave = { ...formData };
        if (dataToSave.paymentType === "cash") {
            dataToSave.cardNumber = ""; // Ensure it's empty
        }

        localStorage.setItem("billingInfo", JSON.stringify(dataToSave));
        document.getElementById(id).close();
        alert("Saved ✅");
    };

    const handleCancel = () => {
        const stored = localStorage.getItem("billingInfo");
        if (stored) {
            setFormData(JSON.parse(stored));
        }
        document.getElementById(id).close();
    };
    

    return (
        <dialog id={id} className={style.dialog}>
            <form className={style.form}>
                {/* Payment Type */}
                <div className={style.inputGroup}>
                    <label htmlFor="paymentType" className={style.label}>Payment Type:</label>
                    <select
                        id="paymentType"
                        name="paymentType"
                        value={formData.paymentType}
                        onChange={handleChange}
                        className={style.input}
                    >
                        <option value="creditCard">Credit Card</option>
                        <option value="debitCard">Debit Card</option>
                        <option value="cash">Cash (OMT / Whish)</option>
                    </select>
                </div>

                {/* Currency */}
                <div className={style.inputGroup}>
                    <label className={style.label}>Currency:</label>
                    <div className={style.radioGroup}>
                        <label className={style.radioLabel}>
                            <input
                                type="radio"
                                name="currency"
                                value="LLP"
                                checked={formData.currency === "LLP"}
                                onChange={handleChange}
                            />
                            LLP
                        </label>
                        <label className={style.radioLabel}>
                            <input
                                type="radio"
                                name="currency"
                                value="USD"
                                checked={formData.currency === "USD"}
                                onChange={handleChange}
                            />
                            USD
                        </label>
                    </div>
                </div>

                {/* Payer Name */}
                <div className={style.inputGroup}>
                    <label htmlFor="payerName" className={style.label}>Payer Name:</label>
                    <input
                        type="text"
                        id="payerName"
                        name="payerName"
                        value={formData.payerName}
                        onChange={handleChange}
                        className={style.input}
                    />
                </div>

                {/* Card Number */}
                <div className={style.inputGroup}>
                    <label htmlFor="cardNumber" className={style.label}>Card Number:</label>
                    <input
                        type="number"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className={style.input}
                        disabled={formData.paymentType === "cash"}
                        placeholder={formData.paymentType === "cash" ? "Disabled for cash payment" : ""}
                    />
                </div>

                {/* Billing Address */}
                <div className={style.inputGroup}>
                    <label htmlFor="billingAddress" className={style.label}>Billing Address:</label>
                    <input
                        type="text"
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleChange}
                        className={style.input}
                    />
                </div>

                {/* Buttons */}
                <div className={style.buttonContainer}>
                    <button 
                        type="button"
                        onClick={handleCancel} 
                        className={style.cancelButton}
                    >
                        Cancel
                    </button>
                    <button 
                        type="button"
                        onClick={handleSave}
                        className={style.submitButton}
                    >
                        Save
                    </button>
                </div>
            </form>
        </dialog>
    );
}
