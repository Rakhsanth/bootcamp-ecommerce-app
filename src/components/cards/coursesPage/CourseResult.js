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

    return (
        <div className="filter-result-card">
            <img
                src={image !== 'no-photo.jpg' ? image : '/bootcamp_logo.jpg'}
                alt="dev-course-img"
                className="filter-result-card-img"
            />
            <div className="filter-result-card-details">
                <h5 className="filter-result-card-details-title">{title}</h5>
                <p className="filter-result-card-details-description">
                    {description}
                </p>
                <span className="filter-result-card-details-author">
                    Author : {author}
                </span>
                <div className="filter-result-card-details-rating">
                    <span className="filter-result-card-details-rating-text">
                        {rating}
                    </span>
                    {renderStars(rating)}
                    <span className="filter-result-card-details-rating-count">
                        ({ratingCount})
                    </span>
                </div>
            </div>
            <span className="filter-result-card-price">&#8377; {price}</span>

            <div className="filter-result-card-popup">
                <span className="filter-result-card-popup-cap"></span>
                <span className="filter-result-card-popup-cap-hider"></span>
                <h4 className="filter-result-card-popup-title">
                    What you will learn
                </h4>
                <ul className="filter-result-card-popup-list">
                    {keyPointsList.map((keyPoint, index) => (
                        <li
                            key={index}
                            className="filter-result-card-popup-list-item"
                        >
                            <svg className="filter-result-card-popup-list-item-icon">
                                <use xlinkHref="img/sprite.svg#icon-check"></use>
                            </svg>
                            <span className="filter-result-card-popup-list-item-text">
                                {keyPoint}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CourseResult;
