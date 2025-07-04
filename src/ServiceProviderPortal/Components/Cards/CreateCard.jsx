import React from 'react';
import style from './CreateCard.module.css';

export default function CreateCard({ type }) {
    let title;
    if (type === "flight") {
        title = "Create New Flight";
    }
    else if (type === "housing") {
        title = "Create New Housing Listing";
    } 
    else if (type === "cruise") {
        title = "Create New Cruise";
    }
    return (
        <div className={style.card}>
            <div className={style.cardImageContainer}>
                <div className={style.plusSign}>+</div>
            </div>
            
            <div className={style.cardContent}>
                <div className={style.cardInfo}>
                    <h3 className={style.cardTitle}>{title}</h3>
                    <p className={style.cardSubtitle}>Add a new {type} listing to your portfolio</p>
                </div>

                <div className={style.cardFooter}>
                    <button className={style.cardButton}>
                        Create Listing
                    </button>
                </div>
            </div>
        </div>
    );
}
