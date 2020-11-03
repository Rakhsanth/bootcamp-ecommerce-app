import React, { useState } from 'react';

// API calls
import { deleteBootcamp } from '../../../api';

function BootcampCard(props) {
    const { id, image, name, address, rating } = props;
    // For calling method from parent component
    const { renderThisBootcamp, causeReRender } = props;

    // custom css related variable:
    const lineSeperatorColor = 'rgb(220, 218, 203)';

    const renderStars = (stars) => {
        const fullStars = Math.floor(stars);
        const iconsList = [];
        for (let star = 1; star <= fullStars; star++) {
            iconsList.push(
                <svg className="categories-card-rating-stars-star" key={star}>
                    <use xlinkHref="img/sprite.svg#icon-star-full"></use>
                </svg>
            );
        }
        if (fullStars < stars) {
            iconsList.push(
                <svg
                    className="categories-card-rating-stars-star"
                    key={fullStars + 1}
                >
                    <use xlinkHref="img/sprite.svg#icon-star-half"></use>
                </svg>
            );
        }
        if (iconsList.length < 5) {
            for (let index = iconsList.length + 1; index <= 5; index++) {
                iconsList.push(
                    <svg
                        className="categories-card-rating-stars-star"
                        key={index}
                    >
                        <use xlinkHref="img/sprite.svg#icon-star-empty"></use>
                    </svg>
                );
            }
        }
        return iconsList;
    };

    const handleBootcampCard = (event, editOrDelete) => {
        switch (editOrDelete) {
            case 'edit':
                console.log('edit');
                renderThisBootcamp(id);
                break;
            case 'delete':
                console.log('delete');
                event.stopPropagation();
                deleteBootcamp(id);
                causeReRender();
                causeReRender();
                break;
        }
    };

    return (
        <div
            class="filter-result-card"
            style={{ borderBottom: `1px solid ${lineSeperatorColor}` }}
            onClick={(event) => handleBootcampCard(event, 'edit')}
        >
            <img
                src={image !== 'no-photo.jpg' ? image : '/bootcamp_logo.jpg'}
                alt="dev-course-img"
                class="filter-result-card-img"
            />
            <div class="filter-result-card-details">
                <h5 class="filter-result-card-details-title">{name}</h5>
                <p class="filter-result-card-details-description">
                    Address : {address}
                </p>
                <div class="filter-result-card-details-rating">
                    <span class="filter-result-card-details-rating-text">
                        {rating ? rating : 1}
                    </span>
                    <div class="filter-result-card-details-rating-stars">
                        {renderStars(rating ? rating : 1)}
                    </div>
                </div>
            </div>
            <button
                class="btn btn-circle pubBootcampCard-btn"
                onClick={(event) => handleBootcampCard(event, 'delete')}
            >
                <svg style={{ width: '2rem', height: '2rem' }}>
                    {/*Inline styled for ease*/}
                    <use xlinkHref="img/sprite.svg#icon-bin2"></use>
                </svg>
            </button>
        </div>
    );
}

export default BootcampCard;
