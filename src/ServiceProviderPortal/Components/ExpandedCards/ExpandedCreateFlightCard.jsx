import React from "react";
import style from './ExpandedCreateTravelCard.module.css';
import f22 from '../../../assets/f22.jpg';

export default function ExpandedCreateFlightCard({ id, onAddCard }) {

    function cancel() {
        clearInputs();
        closeDialog();
    }

    function closeDialog() {
        const dialog = document.getElementById(id);
        if (dialog) {
            dialog.close();
        }
    }

    function submit() {
        const airline = document.getElementById("Ftitle").value;
        const departureAirport = document.getElementById("FdeparturePlace").value;
        const arrivalAirport = document.getElementById("FarrivalPlace").value;
        const departureDate = document.getElementById("FdepartureDate").value;
        const arrivalDate = document.getElementById("FarrivalDate").value;
        const price = document.getElementById("Fprice").value;
        const description = document.getElementById("Fdescription").value;

        const newCruise = {
            airline,
            departureAirport,
            arrivalAirport,
            departureDate,
            arrivalDate,
            price,
            description,
            imageUrl: "https://i.abcnewsfe.com/a/29ad17e0-4dec-488a-9c27-bdc2424ba5a5/electric-plane-ht-ml-240110_1704902584341_hpMain_16x9.jpg?w=992" // Default placeholder image
        };

        if (newCruise.airline === "F22") {
            newCruise.imageUrl = f22; // Use the imported image if airline is F22
        }

        onAddCard(newCruise);

        clearInputs();
        closeDialog();
    }

    function clearInputs() {
        const inputs = document.querySelectorAll("input[type='text'], input[type='number'], input[type='date'], textarea");
        inputs.forEach(input => {
            input.value = '';
        });
    }

    return (
        <dialog id={id} className={style.dialog}>
            <form className={style.form}>
                <div className={style.inputGroup}>
                    <label htmlFor="title" className={style.label}>Title:</label>
                    <input id="Ftitle" name="title" type="text" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="departurePlace" className={style.label}>Departure Port:</label>
                    <input id="FdeparturePlace" name="departurePlace" type="text" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="arrivalPlace" className={style.label}>Destination:</label>
                    <input id="FarrivalPlace" name="arrivalPlace" type="text" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="departureDate" className={style.label}>Departure Date:</label>
                    <input id="FdepartureDate" name="departureDate" type="date" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="arrivalDate" className={style.label}>Arrival Date:</label>
                    <input id="FarrivalDate" name="arrivalDate" type="date" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="price" className={style.label}>Price:</label>
                    <input id="Fprice" name="price" type="number" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="description" className={style.label}>Description:</label>
                    <textarea id="Fdescription" name="description" className={style.textarea}></textarea>
                </div>
                <div className={style.buttonContainer}>
                    <button onClick={cancel} type="button" className={style.cancelButton}>Cancel</button>
                    <button onClick={submit} type="button" className={style.submitButton}>Submit</button>
                </div>
            </form>
        </dialog>
    );
}