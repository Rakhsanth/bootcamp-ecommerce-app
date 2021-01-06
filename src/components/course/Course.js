import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';
import ReactPlayer from 'react-player/lazy';
// api calls
import { getReviews } from '../../api';
// actions
import {
    getCourse,
    addToCart,
    getCoursesByBootcamp,
    getUserProfile,
} from '../../actions';
// config values
import { pusherApiKey, pusherCluster } from '../../config/config';
import ReviewForm from '../cards/ReviewForm';

function Course(props) {
    const {
        loading,
        course,
        user,
        profile,
        getCourse,
        getUserProfile,
        addToCart,
        cartItems,
        getCoursesByBootcamp,
    } = props;
    let { courses } = props;
    const {
        match: {
            params: { courseId },
        },
        history,
    } = props;

    const [reviews, setreviews] = useState([]);
    const [totalReviews, settotalReviews] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);
    const [starPercents, setstarPercents] = useState({});
    const [filterQuery, setfilterQuery] = useState(null);

    // Pusher related stuff for realtime DB related updations
    // const pusher = new Pusher(pusherApiKey, {
    //     cluster: pusherCluster,
    // });
    // const channel = pusher.subscribe('courses');
    // channel.bind('updated', function (data) {
    //     console.log('Pusher subscribed');
    //     if (course) {
    //         if (course._id === data.newUpdatedDoc._id) {
    //             console.log('Found the modefied doc in realtime');
    //             getCourse(courseId);
    //         }
    //     }
    // });

    console.log(courseId, currentPage, starPercents);

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
            reviewList = await getReviews(
                courseId,
                pageNum,
                true,
                query ? query : filterQuery
            );
        } else {
            reviewList = await getReviews(
                courseId,
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
        const review = await getReviews(courseId, null, true);
        setstarPercents(review.percents);
    };

    useEffect(() => {
        setStarPercerntsToState();
        setReviewToState();
        getCourse(courseId);
        if (course !== null) {
            getCoursesByBootcamp(course.bootcamp);
            courses = courses.filter((item) => item._id !== course._id);
        }
        if (user._id !== undefined) {
            getUserProfile(user._id);
        }
    }, [getCourse, getUserProfile, user]);

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

    const handleAddToCart = () => {
        const entries = new Map([
            ['id', course._id],
            ['image', course.image],
            ['title', course.title],
            ['price', course.cost],
            ['description', course.description],
            ['startDate', course.startDate],
            ['endDate', course.endDate],
            ['email', course.user.email],
            ['currentStudentsCount', course.currentStudentsCount],
            ['maxStudentsAllowed', course.maxStudentsAllowed],
        ]);
        const cartItem = Object.fromEntries(entries);
        console.log(cartItem);
        addToCart(cartItem);
    };

    const renderAddToCart = () => {
        const inCart = cartItems.some((item) => item.id === course._id);
        if (inCart) {
            return (
                <Link to="/cart" className="btn btn-primary btn-md btn-center">
                    <span className="btn-text">Go to checkout</span>
                </Link>
            );
        } else {
            if (course.currentStudentsCount < course.maxStudentsAllowed) {
                return (
                    <button
                        className="btn btn-tertiary btn-md"
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </button>
                );
            } else {
                return (
                    <button className="btn btn-tertiary btn-md" disabled>
                        Add to cart
                    </button>
                );
            }
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        history.push('/cart');
    };

    const renderBuyNow = () => {
        const inCart = cartItems.some((item) => item.id === course._id);
        if (inCart) {
            return null;
        } else {
            if (course.currentStudentsCount < course.maxStudentsAllowed) {
                return (
                    <button
                        className="btn btn-secondary btn-md"
                        onClick={handleBuyNow}
                    >
                        Buy now
                    </button>
                );
            } else {
                return (
                    <button className="btn btn-secondary btn-md" disabled>
                        Buy now
                    </button>
                );
            }
        }
    };

    const canIReview = () => {
        if (profile.enrolledCourses.length === 0) {
            return false;
        }
        const match = profile.enrolledCourses.find(
            (course) => course.courseId === courseId
        );
        if (match === undefined) {
            return false;
        }
        return true;
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
                        {course.description}
                    </h5>
                </div>

                <div className="course-payment">
                    <div
                        className="course-video"
                        style={{
                            height: course.video === 'no-video' ? '5%' : '50%',
                        }}
                    >
                        {course.video !== 'no-video' ? (
                            <ReactPlayer
                                width="100%"
                                height="100%"
                                url={course.video}
                                controls
                            />
                        ) : (
                            <h2
                                style={{
                                    margin: '0 auto',
                                    marginTop: '0%',
                                }}
                            >
                                No intro video from the course owner
                            </h2>
                        )}
                    </div>
                    <div className="course-payment-details">
                        <h4 className="course-payment-price">
                            &#8377; {course.cost}
                        </h4>
                        {renderAddToCart()}
                        {renderBuyNow()}
                        {course.currentStudentsCount <
                        course.maxStudentsAllowed ? null : (
                            <span
                                className="center"
                                style={{
                                    color: 'red',
                                    marginTop: '1rem',
                                    padding: '0 1.5rem',
                                }}
                            >
                                Already maximum students have enrolled
                            </span>
                        )}
                        <Link
                            className="btn btn-primary btn-md btn-center"
                            style={{ margin: '1rem 0' }}
                            to={`/bootcamps/${course.bootcamp}`}
                        >
                            Viwe Bootcamp
                        </Link>
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
                        {course.basicRequirements &&
                        course.basicRequirements.length > 0 ? (
                            course.basicRequirements.map((req, index) => (
                                <li
                                    key={index}
                                    className="course-req-desc-req-list-item"
                                >
                                    {req}
                                </li>
                            ))
                        ) : (
                            <h2>
                                No basic requirements mentioned by the course
                                provider
                            </h2>
                        )}
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
                        {courses.length > 0 ? (
                            courses.map((course) =>
                                course._id !== courseId ? (
                                    <Link
                                        key={course._id}
                                        to={`/courses/${course._id}`}
                                        className="container-scrolly-main-item"
                                    >
                                        <img
                                            src={
                                                course.picture !==
                                                'no-photo.jpg'
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
                                ) : null
                            )
                        ) : (
                            <h2>No other courses yet !!!</h2>
                        )}
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
                    {profile !== null && canIReview() ? (
                        <ReviewForm
                            courseOrBootcamp="course"
                            courseOrBootcampId={courseId}
                            setReviewToState={setReviewToState}
                            setStarPercerntsToState={setStarPercerntsToState}
                        />
                    ) : (
                        <h3>
                            You can add review once you enroll for this course
                        </h3>
                    )}
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
        cartItems: store.cart.cartItems,
        courses: store.bootcampCourses.courses,
        reviews: store.reviews.reviews,
        user: store.auth.user,
        profile: store.profile.profile,
    };
};

export default connect(mapStateToProps, {
    getCourse,
    addToCart,
    getCoursesByBootcamp,
    getUserProfile,
})(withRouter(Course));
