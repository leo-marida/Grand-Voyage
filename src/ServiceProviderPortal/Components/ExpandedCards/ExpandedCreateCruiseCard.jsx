import React from "react";
import style from './ExpandedCreateTravelCard.module.css';

export default function ExpandedCreateCruiseCard({ id, onAddCard }) {

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
        const cruiseName = document.getElementById("title").value;
        const departurePort = document.getElementById("departurePlace").value;
        const arrivalPort = document.getElementById("arrivalPlace").value;
        const embarkationDate = document.getElementById("departureDate").value;
        const arrivalDate = document.getElementById("arrivalDate").value;
        const price = document.getElementById("price").value;
        const description = document.getElementById("description").value;
        const cabinType = document.getElementById("cabinType").value;
        const amenities = Array.from(
            document.querySelectorAll('input[name="amenities"]:checked')
          ).map(input => input.value);
          
          console.log(amenities); // e.g. ["Pool", "Spa"]
          

        const newCruise = {
            cruiseName,
            departurePort,
            arrivalPort,
            embarkationDate,
            arrivalDate,
            price,
            cabinType,
            amenities,
            description,
            imageUrl: "data:image/jpeg;base64,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" // Default placeholder image
        };

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
                    <input id="title" name="title" type="text" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="departurePlace" className={style.label}>Departure Port:</label>
                    <input id="departurePlace" name="departurePlace" type="text" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="arrivalPlace" className={style.label}>Destination:</label>
                    <input id="arrivalPlace" name="arrivalPlace" type="text" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="departureDate" className={style.label}>Departure Date:</label>
                    <input id="departureDate" name="departureDate" type="date" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="arrivalDate" className={style.label}>Arrival Date:</label>
                    <input id="arrivalDate" name="arrivalDate" type="date" className={style.input} />
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="price" className={style.label}>Price:</label>
                    <input id="price" name="price" type="number" className={style.input} />
                </div>
                <div className={style.filterGroup}>
                          <label>Cabin Type</label>
                          <select
                            className={style.filterSelect}
                            id="cabinType">
                            <option value="">SELECT CABIN TYPE</option>
                            <option value="Interior">Interior</option>
                            <option value="Ocean View">Ocean View</option>
                            <option value="Balcony">Balcony</option>
                            <option value="Suite">Suite</option>
                          </select>
                </div>
                <div className={style.filterGroup}>
                          <label>Amenities</label>
                          <div className={style.checkboxGroup}>
                            <label>
                              <input
                                type="checkbox"
                                value="Pool"
                                name="amenities"
                              />
                              Pool
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                value="Spa"
                                name="amenities"
                              />
                              Spa
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                value="Casino"
                                name="amenities"
                              />
                              Casino
                            </label>
                            <label>
                              <input
                                type="checkbox"
                                value="Theater"
                                name="amenities"
                              />
                              Theater
                            </label>
                          </div>
                        </div>
                <div className={style.inputGroup}>
                    <label htmlFor="description" className={style.label}>Description:</label>
                    <textarea id="description" name="description" className={style.textarea}></textarea>
                </div>
                <div className={style.buttonContainer}>
                    <button onClick={cancel} type="button" className={style.cancelButton}>Cancel</button>
                    <button onClick={submit} type="button" className={style.submitButton}>Submit</button>
                </div>
            </form>
        </dialog>
    );
}