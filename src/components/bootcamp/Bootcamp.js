import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// api calls
import { getBootcampReviews } from '../../api';
// actions
import { getBootcamp, getCoursesByBootcamp } from '../../actions';
// config values

function Bootcamp(props) {
    const {
        loading,
        bootcamp,
        courses,
        getBootcamp,
        getCoursesByBootcamp,
    } = props;
    const {
        match: {
            params: { bootcampId },
        },
        history,
    } = props;

    const [reviews, setreviews] = useState([]);
    const [totalReviews, settotalReviews] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [starPercents, setstarPercents] = useState({});
    const [filterQuery, setfilterQuery] = useState(null);

    console.log(bootcampId, currentPage, starPercents);

    const classes = {
        five: {
            width: `${starPercents.five ? starPercents.five : 0}%`,
        },
        four: {
            width: `${starPercents.four ? starPercents.four : 0}%`,
        },
        three: {
            width: `${starPercents.three ? starPercents.three : 0}%`,
        },
        two: {
            width: `${starPercents.two ? starPercents.two : 0}%`,
        },
        one: {
            width: `${starPercents.one ? starPercents.one : 0}%`,
        },
    };

    const setReviewToState = async (pageNum, query) => {
        let reviewList;
        if (pageNum) {
            reviewList = await getBootcampReviews(
                bootcampId,
                pageNum,
                true,
                query ? query : filterQuery
            );
        } else {
            reviewList = await getBootcampReviews(
                bootcampId,
                currentPage,
                true,
                query ? query : filterQuery
            );
        }
        if (query) {
            setreviews(reviewList.data);
        } else {
            setreviews(reviews.concat(reviewList.data));
        }
        settotalReviews(reviewList.count);
    };
    const setStarPercerntsToState = async () => {
        const review = await getBootcampReviews(bootcampId, null, true);
        setstarPercents(review.percents);
    };

    useEffect(() => {
        setStarPercerntsToState();
        setReviewToState();
        getBootcamp(bootcampId);
        getCoursesByBootcamp(bootcampId);
    }, [getBootcamp, getCoursesByBootcamp]);

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

    const handleStarFilter = (noOfStars) => {
        const query = `rating[gte]=${noOfStars}&rating[lt]=${noOfStars + 1}`;
        setReviewToState(1, query);
        setcurrentPage(1);
        setfilterQuery(query);
    };

    const handleSeeMore = () => {
        setReviewToState(currentPage + 1);
        setcurrentPage(currentPage + 1);
    };

    return !loading && bootcamp ? (
        <Fragment>
            <div className="main-conatiner-course">
                <img
                    src={
                        bootcamp.photo !== 'no-photo.jpg'
                            ? bootcamp.photo
                            : '/bootcamp_logo.jpg'
                    }
                    alt="bootcamp-pic"
                    className="course-image"
                />
                <span className="image-overlay course-image-overlay"></span>
                <div className="course-top-details">
                    <h2 className="course-top-details-title">
                        {bootcamp.name}
                    </h2>
                    <h5 className="course-top-details-bootcamp">
                        {bootcamp.description}
                    </h5>
                </div>

                <div className="course-maindesc" style={{ width: '100%' }}>
                    <h2 className="course-maindesc-title">
                        What you will get from our bootcamp
                    </h2>
                    <ul className="course-maindesc-list">
                        {bootcamp.offerings.map((content, index) => (
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
                <div className="course-req-desc" style={{ width: '100%' }}>
                    <div className="course-req-desc-req">
                        <h2 className="course-req-desc-req-heading">
                            Location details
                        </h2>
                        <li className="course-req-desc-req-list-item">
                            {bootcamp.address}
                        </li>
                        <li className="course-req-desc-req-list-item">
                            {bootcamp.district}
                        </li>
                        <li className="course-req-desc-req-list-item">
                            {bootcamp.state}
                            {` - ${bootcamp.zipcode}`}
                        </li>
                    </div>
                    <div className="course-req-desc-desc">
                        <h2 className="course-req-desc-desc-heading">
                            Other details
                        </h2>
                        <li className="course-req-desc-req-list-item">
                            {bootcamp.jobAssistance
                                ? 'Job assistance provided'
                                : 'Job assistance not provided'}
                        </li>
                        <li className="course-req-desc-req-list-item">
                            {bootcamp.jobGuarantee
                                ? 'Job guarantee assured'
                                : 'Job guarantee not assured'}
                        </li>
                        <li className="course-req-desc-req-list-item">
                            {bootcamp.housing
                                ? 'Housing / hostel facility is available'
                                : 'Housing / hostel facility is not available'}
                        </li>
                    </div>
                </div>
                <div className="container-scrolly" style={{ width: '100%' }}>
                    <h2 className="container-scrolly-heading">
                        Courses from this Bootcamp
                    </h2>
                    <div className="container-scrolly-main">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <Link
                                    key={course._id}
                                    to={`/courses/${course._id}`}
                                    className="container-scrolly-main-item"
                                >
                                    <img
                                        src={
                                            course.picture !== 'no-photo.jpg'
                                                ? course.picture
                                                : './img/courseImages/courseCardImg.jpg'
                                        }
                                        alt="course"
                                        className="container-scrolly-main-item-img"
                                    />
                                    <div className="container-scrolly-main-item-titledesc">
                                        <h4 className="container-scrolly-main-item-titledesc-title">
                                            {course.title}
                                        </h4>
                                        <p className="container-scrolly-main-item-titledesc-desc">
                                            {course.description}
                                        </p>
                                    </div>

                                    <div className="container-scrolly-main-item-rating">
                                        <h5 className="container-scrolly-main-item-rating-text">
                                            {course.averageRating}
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
                                            {course.ratings}
                                        </span>
                                    </div>
                                    <span className="container-scrolly-main-item-price">
                                        &#8377; {course.cost}
                                    </span>
                                </Link>
                            ))
                        ) : (
                            <h2>New bootcamp, courses yet to be added</h2>
                        )}
                    </div>
                </div>
                <div className="course-feedback" style={{ width: '100%' }}>
                    <h2 className="course-feedback-heading">User Feedback</h2>
                    <div className="course-feedback-top">
                        <div className="course-feedback-top-rating">
                            <h3 className="course-feedback-top-rating-text">
                                {bootcamp.averageRating}
                            </h3>
                            <div className="course-feedback-top-rating-stars">
                                {renderStars(bootcamp.averageRating)}
                            </div>
                        </div>
                        <div className="course-feedback-top-percents">
                            <div
                                className="course-feedback-top-percents5"
                                onClick={() => handleStarFilter(5)}
                            >
                                <div className="course-feedback-top-percents5-bar">
                                    <span
                                        className="course-feedback-top-percents5-bar-empty"
                                        style={classes.five}
                                    ></span>
                                    <span
                                        className="course-feedback-top-percents5-bar-fill"
                                        style={classes.five}
                                    ></span>
                                </div>
                                <div className="course-feedback-top-rating-stars">
                                    {renderStars(5)}
                                </div>
                                <span className="course-feedback-top-percents-text">
                                    {starPercents.five ? starPercents.five : 0}%
                                </span>
                            </div>
                            <div
                                className="course-feedback-top-percents4"
                                onClick={() => handleStarFilter(4)}
                            >
                                <div className="course-feedback-top-percents4-bar">
                                    <span className="course-feedback-top-percents4-bar-empty"></span>
                                    <span
                                        className="course-feedback-top-percents4-bar-fill"
                                        style={classes.four}
                                    ></span>
                                </div>
                                <div className="course-feedback-top-rating-stars">
                                    {renderStars(4)}
                                </div>
                                <span className="course-feedback-top-percents-text">
                                    {starPercents.four ? starPercents.four : 0}%
                                </span>
                            </div>
                            <div
                                className="course-feedback-top-percents3"
                                onClick={() => handleStarFilter(3)}
                            >
                                <div className="course-feedback-top-percents3-bar">
                                    <span className="course-feedback-top-percents3-bar-empty"></span>
                                    <span
                                        className="course-feedback-top-percents3-bar-fill"
                                        style={classes.three}
                                    ></span>
                                </div>
                                <div className="course-feedback-top-rating-stars">
                                    {renderStars(3)}
                                </div>
                                <span className="course-feedback-top-percents-text">
                                    {starPercents.three
                                        ? starPercents.three
                                        : 0}
                                    %
                                </span>
                            </div>
                            <div
                                className="course-feedback-top-percents2"
                                onClick={() => handleStarFilter(2)}
                            >
                                <div className="course-feedback-top-percents2-bar">
                                    <span className="course-feedback-top-percents2-bar-empty"></span>
                                    <span
                                        className="course-feedback-top-percents2-bar-fill"
                                        style={classes.two}
                                    ></span>
                                </div>
                                <div className="course-feedback-top-rating-stars">
                                    {renderStars(2)}
                                </div>
                                <span className="course-feedback-top-percents-text">
                                    {starPercents.two ? starPercents.two : 0}%
                                </span>
                            </div>
                            <div
                                className="course-feedback-top-percents1"
                                onClick={() => handleStarFilter(1)}
                            >
                                <div className="course-feedback-top-percents1-bar">
                                    <span className="course-feedback-top-percents1-bar-empty"></span>
                                    <span
                                        className="course-feedback-top-percents1-bar-fill"
                                        style={classes.one}
                                    ></span>
                                </div>
                                <div className="course-feedback-top-rating-stars">
                                    {renderStars(1)}
                                </div>
                                <span className="course-feedback-top-percents-text">
                                    {starPercents.one ? starPercents.one : 0}%
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
        bootcamp: store.bootcamp.bootcamp,
        courses: store.bootcampCourses.courses,
    };
};

export default connect(mapStateToProps, { getBootcamp, getCoursesByBootcamp })(
    withRouter(Bootcamp)
);
