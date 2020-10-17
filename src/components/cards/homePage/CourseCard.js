import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard(props) {
    const {
        image,
        title,
        author,
        rating,
        userCount,
        price,
        description,
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
        <div className="categories-card">
            <img
                src={image !== 'no-photo.jpg' ? image : '/bootcamp_logo.jpg'}
                alt="best seller course"
                className="categories-card-img"
            />
            <h5 className="categories-card-title">{title}</h5>
            <span className="categories-card-author">{author}</span>
            <div className="categories-card-rating">
                <span className="categories-card-rating-rate">{rating}</span>
                <div className="categories-card-rating stars">
                    {renderStars(rating)}
                    {/* {starsList.map((star) => star)} */}
                    {/* <svg className="categories-card-rating-stars-star">
                        <use xlinkHref="img/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg className="categories-card-rating-stars-star">
                        <use xlinkHref="img/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg className="categories-card-rating-stars-star">
                        <use xlinkHref="img/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg className="categories-card-rating-stars-star">
                        <use xlinkHref="img/sprite.svg#icon-star-full"></use>
                    </svg>
                    <svg className="categories-card-rating-stars-star">
                        <use xlinkHref="img/sprite.svg#icon-star-half"></use>
                    </svg> */}
                </div>
                <span className="categories-card-rating-count">
                    ({userCount})
                </span>
            </div>
            <span className="categories-card-price">&#8377; {price}</span>
            <div className="categories-card-details-container">
                <div className="categories-card-details">
                    <h3 className="h3-heading categories-card-details-title">
                        {title}
                    </h3>
                    <p className="categories-card-details-description">
                        {description}
                    </p>
                    <ul className="categories-card-details-list">
                        {keyPointsList.map((eachPoint, index) => (
                            <li
                                key={index}
                                className="categories-card-details-list-item"
                            >
                                <div className="categories-card-details-list-item-icon">
                                    <svg className="categories-card-details-list-item-icon-svg">
                                        <use xlinkHref="img/sprite.svg#icon-check"></use>
                                    </svg>
                                </div>
                                <p className="categories-card-details-list-item-text">
                                    {eachPoint}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <Link to="/" className="btn btn-tertiary btn-lg btn-center">
                        <span className="btn-text">Add to cart</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
