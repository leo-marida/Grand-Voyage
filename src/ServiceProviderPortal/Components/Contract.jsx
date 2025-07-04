import React, { useEffect, useState } from 'react';
import style from './Contract.module.css';

export default function Contract({ id }) {
    const [contract, setContract] = useState({
        companyName: "",
        serviceType: "",
        startDate: "",
        endDate: "",
        commissionRate: ""
    });

    const email = localStorage.getItem("email");

    // Load existing contract on mount (or when modal opens)
    useEffect(() => {
        const modal = document.getElementById(id);
        if (!modal) return;

        const handleOpen = () => {
            const storedContracts = JSON.parse(localStorage.getItem("contracts")) || {};
            const saved = storedContracts[email];

            if (saved) {
                setContract(saved);
            } else {
                setContract({
                    companyName: "",
                    serviceType: "",
                    startDate: "",
                    endDate: "",
                    commissionRate: ""
                });
            }
        };

        modal.addEventListener('show', handleOpen); // use 'show' to hook into the modal opening
        return () => modal.removeEventListener('show', handleOpen);
    }, [email, id]);

    function updateField(e) {
        setContract(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function closeModal() {
        document.getElementById(id).close();
    }

    function addContract(event) {
        if (!isValidInputs(event)) {
            return;
        }

        const storedContracts = JSON.parse(localStorage.getItem("contracts")) || {};
        storedContracts[email] = contract;
        localStorage.setItem("contracts", JSON.stringify(storedContracts));

        closeModal();
    }

    // Keep your existing validation methods (you can still use getElementById for them)
    function getCompanyName() {
        return document.getElementById("companyName").value;
    }

    function getServiceType() {
        return document.getElementById("serviceType").value;
    }

    function getStartDate() {
        return document.getElementById("startDate").value;
    }

    function getEndDate() {
        return document.getElementById("endDate").value;
    }

    function getCommissionRate() {
        return document.getElementById("commissionRate").value;
    }

    function isValidInputs(event) {
        // Prevent form submission if not valid
        event.preventDefault();

        return (
            setNameError() &&
            setTypeError() &&
            setStartDateError() &&
            setEndDateError() &&
            setCommissionRateError()
        );
    }

    function setNameError() {
        const companyName = getCompanyName();
        const companyNameField = document.getElementById("companyName");
        if (!companyName) {
            companyNameField.setCustomValidity("Please enter your company name!");
            companyNameField.reportValidity(); // This triggers the display of the validity message
            return false;
        }
        companyNameField.setCustomValidity(""); // Clear the error if valid
        return true;
    }

    function setTypeError() {
        const serviceType = getServiceType();
        const serviceTypeField = document.getElementById("serviceType");
        if (serviceType === "") {
            serviceTypeField.setCustomValidity("Please select your service type!");
            serviceTypeField.reportValidity();
            return false;
        }
        serviceTypeField.setCustomValidity("");
        return true;
    }

    function setStartDateError() {
        const startDate = getStartDate();
        const startDateField = document.getElementById("startDate");
        if (!startDate) {
            startDateField.setCustomValidity("Please enter the start date!");
            startDateField.reportValidity();
            return false;
        } else if ((new Date(startDate)).getTime() < (new Date()).getTime()) {
            startDateField.setCustomValidity("Start date must be today or later.");
            startDateField.reportValidity();
            return false;
        }
        startDateField.setCustomValidity("");
        return true;
    }

    function setEndDateError() {
        const endDate = getEndDate();
        const endDateField = document.getElementById("endDate");
        if (!endDate) {
            endDateField.setCustomValidity("Please enter the end date!");
            endDateField.reportValidity();
            return false;
        } else if ((new Date(endDate)).getTime() < (new Date()).getTime()) {
            endDateField.setCustomValidity("End date must be today or later.");
            endDateField.reportValidity();
            return false;
        } else if (getStartDate() && (new Date(getStartDate())).getTime() > (new Date(endDate)).getTime()) {
            endDateField.setCustomValidity("End date must be later than start date.");
            endDateField.reportValidity();
            return false;
        }
        endDateField.setCustomValidity("");
        return true;
    }

    function setCommissionRateError() {
        const commissionRate = getCommissionRate();
        const commissionRateField = document.getElementById("commissionRate");
        if (commissionRate < 5) {
            commissionRateField.setCustomValidity("Commission rate must be no less than 5%!");
            commissionRateField.reportValidity();
            return false;
        } else if (commissionRate > 100) {
            commissionRateField.setCustomValidity("Commission rate must be no greater than 100%!");
            commissionRateField.reportValidity();
            return false;
        }
        commissionRateField.setCustomValidity("");
        return true;
    }

    return (
        <dialog className={style.contractContainer} id={id}>
            <h1 className={style.contractTitle}>Contract Form</h1>
            <form className={style.inputs}>
                <div className={style.input}>
                    <label htmlFor='companyName'>Company Name:</label>
                    <input value={contract.companyName} onInput={setNameError} onChange={updateField} type='text' id='companyName' name='companyName' />
                </div>
                <div className={style.input}>
                    <label htmlFor='serviceType'>Service Type:</label>
                    <select value={contract.serviceType} onChange={(e) => { updateField(e); setTypeError(); }} id='serviceType' name='serviceType'>
                        <option value="">--SELECT--</option>
                        <option value="all">All</option>
                        <option value="housing">Housing</option>
                        <option value="flights">Flight Services</option>
                        <option value="cruises">Cruise Services</option>
                    </select>
                </div>
                <div className={style.dateInputs}>
                    <div className={style.dateInput}>
                        <label htmlFor="startDate">Start Date:</label>
                        <input value={contract.startDate} onChange={(e) => { updateField(e); setStartDateError(); }} type="date" id='startDate' name='startDate' />
                    </div>
                    <div className={style.dateInput}>
                        <label htmlFor="endDate">End Date:</label>
                        <input value={contract.endDate} onChange={(e) => { updateField(e); setEndDateError(); }} type="date" id='endDate' name='endDate' />
                    </div>
                </div>
                <div className={style.priceInputs}>
                    <div className={style.priceInput}>
                        <label htmlFor="commissionRate">Commission Rate (in %):</label>
                        <input value={contract.commissionRate} onInput={setCommissionRateError} onChange={updateField} type="number" id='commissionRate' name='commissionRate' min={5} max={100} />
                    </div>
                </div>
                <div className={style.buttons}>
                    <button type='button' onClick={closeModal}>Cancel</button>
                    <button type='button' onClick={addContract}>Submit</button>
                </div>
            </form>
        </dialog>
    );
}
