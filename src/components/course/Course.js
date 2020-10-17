import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

// api calls
import { getReviews } from '../../api';
// actions
import { getCourse } from '../../actions';

function Course(props) {
    const { loading, course, getCourse } = props;
    const {
        match: {
            params: { courseId },
        },
    } = props;

    const [reviews, setreviews] = useState([]);
    const [totalReviews, settotalReviews] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);

    console.log(courseId, currentPage);

    const setReviewToState = async (pageNum) => {
        let reviewList;
        if (pageNum) {
            reviewList = await getReviews(courseId, pageNum);
        } else {
            reviewList = await getReviews(courseId, currentPage);
        }
        setreviews(reviews.concat(reviewList.data));
        settotalReviews(reviewList.count);
    };

    useEffect(() => {
        setReviewToState();
        getCourse(courseId);
    }, [getCourse]);

    console.log(reviews, totalReviews);

    const renderStars = (stars) => {
        const fullStars = Math.floor(stars);
        const iconsList = [];
        for (let star = 1; star <= fullStars; star++) {
            iconsList.push(
                <svg
                    className="course-feedback-top-rating-stars-star"
                    key={star}
                >
                    <use xlinkHref="img/sprite.svg#icon-star-full"></use>
                </svg>
            );
        }
        if (fullStars < stars) {
            iconsList.push(
                <svg
                    className="course-feedback-top-rating-stars-star"
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
                        className="course-feedback-top-rating-stars-star"
                        key={index}
                    >
                        <use xlinkHref="img/sprite.svg#icon-star-empty"></use>
                    </svg>
                );
            }
        }

        return iconsList;
    };

    const handleSeeMore = () => {
        setReviewToState(currentPage + 1);
        setcurrentPage(currentPage + 1);
    };

    return !loading && course ? (
        <Fragment>
            <div className="main-conatiner-course">
                <img
                    src={
                        course.picture !== 'no-photo.jpg'
                            ? course.picture
                            : '/bootcamp_logo.jpg'
                    }
                    alt="course-image"
                    className="course-image"
                />
                <span className="image-overlay course-image-overlay"></span>
                <div className="course-top-details">
                    <h2 className="course-top-details-title">{course.title}</h2>
                    <h5 className="course-top-details-bootcamp">
                        Lorem ipsum dolor sit amet.
                    </h5>
                </div>

                <div className="course-payment">
                    <div className="course-video"></div>
                    <div className="course-payment-details">
                        <h4 className="course-payment-price">
                            &#8377; {course.cost}
                        </h4>
                        <button className="btn btn-tertiary btn-md">
                            Add to cart
                        </button>
                        <button className="btn btn-secondary btn-md">
                            Buy now
                        </button>
                    </div>
                </div>

                <div className="course-maindesc">
                    <h2 className="course-maindesc-title">
                        What you will learn
                    </h2>
                    <ul className="course-maindesc-list">
                        {course.contentList.map((content, index) => (
                            <li
                                key={index}
                                className="course-maindesc-list-item"
                            >
                                <svg className="course-maindesc-list-item-icon">
                                    <use xlinkHref="img/sprite.svg#icon-check"></use>
                                </svg>
                                <h5 className="course-maindesc-list-item-text">
                                    {content}
                                </h5>
                            </li>
                        ))}
                    </ul>
                    <span className="course-maindesc-fade1"></span>
                    <span className="course-maindesc-fade2"></span>
                </div>
                <div className="course-req-desc">
                    <div className="course-req-desc-req">
                        <h2 className="course-req-desc-req-heading">
                            Requirements
                        </h2>
                        <li className="course-req-desc-req-list-item">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Earum, tenetur.
                        </li>
                        <li className="course-req-desc-req-list-item">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Earum, tenetur.
                        </li>
                    </div>
                    <div className="course-req-desc-desc">
                        <h2 className="course-req-desc-desc-heading">
                            Description
                        </h2>
                        <p className="course-req-desc-desctext">
                            {course.requirementDescription}
                        </p>
                    </div>
                </div>
                <div className="container-scrolly">
                    <h2 className="container-scrolly-heading">
                        Courses from same Bootcamp
                    </h2>
                    <div className="container-scrolly-main">
                        <div className="container-scrolly-main-item">
                            <img
                                src="./img/courseImages/courseCardImg.jpg"
                                alt="course"
                                className="container-scrolly-main-item-img"
                            />
                            <div className="container-scrolly-main-item-titledesc">
                                <h4 className="container-scrolly-main-item-titledesc-title">
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Quae, perferendis.
                                </h4>
                                <p className="container-scrolly-main-item-titledesc-desc">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Quisquam, ipsum laboriosam
                                    in quo ipsa non recusandae autem culpa dicta
                                    libero!
                                </p>
                            </div>

                            <div className="container-scrolly-main-item-rating">
                                <h5 className="container-scrolly-main-item-rating-text">
                                    4.7
                                </h5>
                                <svg className="container-scrolly-main-item-rating-icon">
                                    <use xlinkHref="img/sprite.svg#icon-star-full"></use>
                                </svg>
                            </div>
                            <div className="container-scrolly-main-item-ratecount">
                                <svg className="container-scrolly-main-item-rating-icon">
                                    <use xlinkHref="img/sprite.svg#icon-users"></use>
                                </svg>
                                <span className="container-scrolly-main-item-ratecount-text">
                                    11000
                                </span>
                            </div>
                            <span className="container-scrolly-main-item-price">
                                &#8377; 12000
                            </span>
                        </div>
                    </div>
                </div>
                <div className="course-feedback">
                    <h2 className="course-feedback-heading">User Feedback</h2>
                    <div className="course-feedback-top">
                        <div className="course-feedback-top-rating">
                            <h3 className="course-feedback-top-rating-text">
                                {course.averageRating}
                            </h3>
                            <div className="course-feedback-top-rating-stars">
                                {renderStars(course.averageRating)}
                            </div>
                        </div>
                        <div className="course-feedback-top-percents">
                            <div className="course-feedback-top-percents5">
                                <div className="course-feedback-top-percents5-bar">
                                    <span className="course-feedback-top-percents5-bar-empty"></span>
                                    <span className="course-feedback-top-percents5-bar-fill"></span>
                                </div>
                                <div className="course-feedback-top-rating-stars">
                                    {renderStars(5)}
                                </div>
                                <span className="course-feedback-top-percents-text">
                                    60%
                                </span>
                            </div>
                            <div className="course-feedback-top-percents4">
                                <div className="course-feedback-top-percents4-bar">
                                    <span className="course-feedback-top-percents4-bar-empty"></span>
                                    <span className="course-feedback-top-percents4-bar-fill"></span>
                                </div>
                                <div className="course-feedback-top-rating-stars">
                                    {renderStars(4)}
                                </div>
                                <span className="course-feedback-top-percents-text">
                                    20%
                                </span>
                            </div>
                            <div className="course-feedback-top-percents3">
                                <div className="course-feedback-top-percents3-bar">
                                    <span className="course-feedback-top-percents3-bar-empty"></span>
                                    <span className="course-feedback-top-percents3-bar-fill"></span>
                                </div>
                                <div className="course-feedback-top-rating-stars">
                                    {renderStars(3)}
                                </div>
                                <span className="course-feedback-top-percents-text">
                                    10%
                                </span>
                            </div>
                            <div className="course-feedback-top-percents2">
                                <div className="course-feedback-top-percents2-bar">
                                    <span className="course-feedback-top-percents2-bar-empty"></span>
                                    <span className="course-feedback-top-percents2-bar-fill"></span>
                                </div>
                                <div className="course-feedback-top-rating-stars">
                                    {renderStars(2)}
                                </div>
                                <span className="course-feedback-top-percents-text">
                                    5%
                                </span>
                            </div>
                            <div className="course-feedback-top-percents1">
                                <div className="course-feedback-top-percents1-bar">
                                    <span className="course-feedback-top-percents1-bar-empty"></span>
                                    <span className="course-feedback-top-percents1-bar-fill"></span>
                                </div>
                                <div className="course-feedback-top-rating-stars">
                                    {renderStars(1)}
                                </div>
                                <span className="course-feedback-top-percents-text">
                                    5%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="course-feedback-main">
                        <h2 className="course-feedback-main-heading">
                            Reviews
                        </h2>
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div
                                    key={index}
                                    className="course-feedback-main-review"
                                >
                                    <h5 className="course-feedback-main-review-author">
                                        {review.user.name}
                                    </h5>
                                    <div className="course-feedback-top-rating-stars">
                                        {renderStars(review.rating)}
                                    </div>
                                    <h5 className="course-feedback-main-review-text">
                                        {review.title}
                                    </h5>
                                    <p className="course-feedback-main-review-text">
                                        {review.review}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <h1>No reviews yet be the 1st to review</h1>
                        )}
                    </div>
                    {reviews.length < totalReviews ? (
                        <button
                            className="btn btn-secondary course-review-btn"
                            onClick={handleSeeMore}
                        >
                            See more
                        </button>
                    ) : null}
                </div>
            </div>
        </Fragment>
    ) : (
        <h1>Loading</h1>
    );
}

const mapStateToProps = (store) => {
    return {
        loading: store.course.loading,
        course: store.course.course,
    };
};

export default connect(mapStateToProps, { getCourse })(Course);
