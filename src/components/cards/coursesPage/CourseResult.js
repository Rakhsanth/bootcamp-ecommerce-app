import React from 'react';

function CourseResult(props) {
    const {
        image,
        title,
        description,
        author,
        rating,
        ratingCount,
        price,
        keyPointsList,
    } = props;

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
        return iconsList;
    };

    return (
        <div className="filter-result-card">
            <img
                src="./img/courseImages/courseCardImg.jpg"
                alt="dev-course-img"
                className="filter-result-card-img"
            />
            <div className="filter-result-card-details">
                <h5 className="filter-result-card-details-title">
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                </h5>
                <p className="filter-result-card-details-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    consequuntur maiores nam, neque alias quas?
                </p>
                <span className="filter-result-card-details-author">
                    Author : Somebody authored
                </span>
                <div className="filter-result-card-details-rating">
                    <span className="filter-result-card-details-rating-text">
                        4.5
                    </span>
                    {renderStars(4.5)}
                    <span className="filter-result-card-details-rating-count">
                        (23212)
                    </span>
                </div>
            </div>
            <span className="filter-result-card-price">&#8377; 15000</span>

            <div className="filter-result-card-popup">
                <span className="filter-result-card-popup-cap"></span>
                <span className="filter-result-card-popup-cap-hider"></span>
                <h4 className="filter-result-card-popup-title">
                    What you will learn
                </h4>
                <ul className="filter-result-card-popup-list">
                    <li className="filter-result-card-popup-list-item">
                        <svg className="filter-result-card-popup-list-item-icon">
                            <use xlinkHref="img/sprite.svg#icon-check"></use>
                        </svg>
                        <span className="filter-result-card-popup-list-item-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aliquam eligendi dolorum beatae quibusdam
                            commodi cupiditate.
                        </span>
                    </li>
                    <li className="filter-result-card-popup-list-item">
                        <svg className="filter-result-card-popup-list-item-icon">
                            <use xlinkHref="img/sprite.svg#icon-check"></use>
                        </svg>
                        <span className="filter-result-card-popup-list-item-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aliquam eligendi dolorum beatae quibusdam
                            commodi cupiditate.
                        </span>
                    </li>
                    <li className="filter-result-card-popup-list-item">
                        <svg className="filter-result-card-popup-list-item-icon">
                            <use xlinkHref="img/sprite.svg#icon-check"></use>
                        </svg>
                        <span className="filter-result-card-popup-list-item-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aliquam eligendi dolorum beatae quibusdam
                            commodi cupiditate.
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default CourseResult;
