import React from 'react'
import style from './LodingCard.module.css'
export const LoadingMovieCard = () => {
    return (
        <div className={style.card}>
            <div className={style.cardMovieImg}></div>
        </div>
    )
}

export const LoadingPerson = () => {
    return (
        <div className={style.card}>
            <div className={style.cardPersonImg}></div>
            <div className={style.cardPersonName}></div>
            <div className={style.cardPersonName}></div>
        </div>
    )
}

export const LoadingMovieDetails = () => {
    return (
        <div className={style.cardDetails}>
            <div className={style.cardDetailsImg}></div>
            <div className={style.cardDetailsText}></div>
            <div className={style.cardDetailsText}></div>
            <div className={style.cardDetailsRB}>
                <div className={style.cardDetailsrating}></div>
                <div className={style.cardDetailsButton}></div>
            </div>
        </div>
    )
}

export const LoadingDetails = () => {
    return (
        <div className={style.Details}>
            <div className={style.DetailsImg}></div>
            <div className={style.DetailsTextArea}>
                <div className={style.DetailsText}></div>
                <div className={style.DetailsText}></div>
                <div className={style.DetailsText}></div>
                <div className={style.DetailsText}></div>
                <div className={style.DetailsText}></div>
            </div>

        </div>
    )
}
