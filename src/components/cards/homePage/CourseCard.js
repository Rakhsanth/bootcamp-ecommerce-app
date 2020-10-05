import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard(props) {
    // const {
    //     image,
    //     title,
    //     author,
    //     rating,
    //     userCount,
    //     price,
    //     description,
    //     keyPointsList,
    // } = props;

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
        <div className="categories-card">
            <img
                src="./img//courseImages/category-img.jpg"
                alt="best seller course"
                className="categories-card-img"
            />
            <h5 className="categories-card-title">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil,
                quos?
            </h5>
            <span className="categories-card-author">Some Name</span>
            <div className="categories-card-rating">
                <span className="categories-card-rating-rate">4.5</span>
                <div className="categories-card-rating stars">
                    {renderStars(4.5)}
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
                <span className="categories-card-rating-count">(12000)</span>
            </div>
            <span className="categories-card-price">&#8377; 700</span>
            <div className="categories-card-details-container">
                <div className="categories-card-details">
                    <h3 className="h3-heading categories-card-details-title">
                        Lorem ipsum, dolor sit amet consectetur adipisicing.
                    </h3>
                    <p className="categories-card-details-description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cumque, delectus sint est ex porro numquam animi commodi
                        quam adipisci explicabo!
                    </p>
                    <ul className="categories-card-details-list">
                        <li className="categories-card-details-list-item">
                            <div className="categories-card-details-list-item-icon">
                                <svg className="categories-card-details-list-item-icon-svg">
                                    <use xlinkHref="img/sprite.svg#icon-check"></use>
                                </svg>
                            </div>
                            <p className="categories-card-details-list-item-text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quaerat, dignissimos?
                            </p>
                        </li>
                        <li className="categories-card-details-list-item">
                            <div className="categories-card-details-list-item-icon">
                                <svg className="categories-card-details-list-item-icon-svg">
                                    <use xlinkHref="img/sprite.svg#icon-check"></use>
                                </svg>
                            </div>
                            <p className="categories-card-details-list-item-text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quaerat, dignissimos?
                            </p>
                        </li>
                        <li className="categories-card-details-list-item">
                            <div className="categories-card-details-list-item-icon">
                                <svg className="categories-card-details-list-item-icon-svg">
                                    <use xlinkHref="img/sprite.svg#icon-check"></use>
                                </svg>
                            </div>
                            <p className="categories-card-details-list-item-text">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quaerat, dignissimos?
                            </p>
                        </li>
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
