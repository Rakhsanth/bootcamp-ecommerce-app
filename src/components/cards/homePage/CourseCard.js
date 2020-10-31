import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// redux actions
import { addToCart } from '../../../actions';

function CourseCard(props) {
    const {
        courseId,
        image,
        title,
        author,
        rating,
        userCount,
        price,
        description,
        keyPointsList,
        currentStudentsCount,
        maxStudentsAllowed,
        startDate,
        endDate,
    } = props;

    const { cartItems, addToCart } = props;

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

    const handleAddToCart = () => {
        const entries = new Map([
            ['id', courseId],
            ['image', image],
            ['title', title],
            ['price', price],
            ['description', description],
            ['startDate', startDate],
            ['endDate', endDate],
            ['currentStudentsCount', currentStudentsCount],
            ['maxStudentsAllowed', maxStudentsAllowed],
        ]);
        const cartItem = Object.fromEntries(entries);
        console.log(cartItem);
        addToCart(cartItem);
    };
    const getAddOrCheckButton = () => {
        const thisCourse = cartItems.find(
            (cartItem) => cartItem.id === courseId
        );
        console.log(thisCourse);
        if (thisCourse === undefined) {
            console.log(currentStudentsCount, maxStudentsAllowed);
            if (currentStudentsCount < maxStudentsAllowed) {
                return (
                    <button
                        to="/"
                        className="btn btn-tertiary btn-lg btn-center"
                        onClick={handleAddToCart}
                    >
                        <span className="btn-text">Add to cart</span>
                    </button>
                );
            } else {
                return (
                    <button
                        to="/"
                        className="btn btn-tertiary btn-lg btn-center"
                        disabled
                    >
                        <span className="btn-text">Add to cart</span>
                    </button>
                );
            }
        } else {
            return (
                <Link to="/cart" className="btn btn-primary btn-lg btn-center">
                    <span className="btn-text">Go to checkout</span>
                </Link>
            );
        }
    };

    return (
        <Link to={`/courses/${courseId}`} className="categories-card">
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
                </div>
                <span className="categories-card-rating-count">
                    ({userCount})
                </span>
            </div>
            <span className="categories-card-price">&#8377; {price}</span>
            <div className="categories-card-details-container">
                <Link to="" className="categories-card-details">
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
                    {getAddOrCheckButton()}
                    {currentStudentsCount < maxStudentsAllowed ? null : (
                        <span
                            className="center"
                            style={{ color: 'red', marginTop: '1rem' }}
                        >
                            Already maximum students have enrolled
                        </span>
                    )}
                </Link>
            </div>
        </Link>
    );
}

const mapStateToProps = (store) => ({
    cartItems: store.cart.cartItems,
});

export default connect(mapStateToProps, { addToCart })(CourseCard);
