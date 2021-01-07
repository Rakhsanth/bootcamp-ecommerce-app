import { Form, Formik, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';

// actions
import {
    setAlert,
    getUserReviews,
    resetLoading,
    getBootcamp,
    getCourse,
} from '../../actions';
import { createOrEditReview, deleteReview } from '../../api';

function ReviewForm(props) {
    const {
        currentPage,
        courseOrBootcamp,
        courseOrBootcampId,
        setReviewToState,
        setStarPercerntsToState,
    } = props;
    const {
        reviews,
        user,
        setAlert,
        resetLoading,
        getUserReviews,
        getCourse,
        getBootcamp,
        reviewLoading,
    } = props;

    const [saving, setsaving] = useState(false);
    const [myReview, setmyReview] = useState(null);
    const [rating, setrating] = useState(0);
    const [hover, sethover] = useState(0);
    // debugger;
    useEffect(() => {
        if (user._id !== undefined) {
            getUserReviews(user._id);
        }
        if (reviews.length !== 0) {
            setMyReviewUtil();
        }
    }, [getUserReviews, user, reviewLoading]);

    const setMyReviewUtil = () => {
        console.log(myReview);
        const toState = newReview();
        setmyReview(toState);
        if (toState !== null) {
            setrating(toState.rating);
        }
    };

    // Vannila javascript related variables
    const starColor = '#eb8a2f';
    const pirmaryColor = '#0f7c90';
    const fullStar = `<use xlink:href="img/sprite.svg#icon-star-full"></use>`;
    const emptyStar = `<use xlink:href="img/sprite.svg#icon-star-empty"></use>`;

    let initialValues = {
        title: '',
        review: '',
        rating: '',
    };

    const newReview = () => {
        console.log(reviews);
        const userReview = reviews.find(
            (review) =>
                (review.course && review.course._id === courseOrBootcampId) ||
                (review.bootcamp && review.bootcamp._id === courseOrBootcampId)
        );
        if (userReview !== undefined) {
            console.log(userReview);
            return userReview;
        }
        return null;
    };

    if (myReview !== null) {
        initialValues = {
            title: myReview.title,
            review: myReview.review,
            rating: myReview.rating,
        };
        // setrating(myReview.rating);
    }

    const validationSchema = Yup.object({
        title: Yup.string()
            .max(100, 'Main review cannot exceed 100 characters')
            .required('Main review cannot be empty'),
        review: Yup.string()
            .max(500, 'Sub review cannot exceed 500 characters')
            .required('Sub review cannot be empty'),
        rating: Yup.number().min(1).max(5).required('Please provide a rating'),
    });
    const onSubmit = async (values) => {
        setsaving(true);
        let response;
        if (myReview === null) {
            response = await createOrEditReview(
                'create',
                courseOrBootcamp,
                courseOrBootcampId,
                null,
                values
            );
        } else {
            response = await createOrEditReview(
                'edit',
                null,
                null,
                myReview._id,
                values
            );
        }
        await setReviewToState(currentPage, 'limit=5');
        await setStarPercerntsToState();
        if (courseOrBootcamp === 'course') {
            getCourse(courseOrBootcampId);
        } else {
            getBootcamp(courseOrBootcampId);
        }
        setsaving(false);
        resetLoading('reviews');
        if (response.success) {
            setAlert('green', response.message, 3);
        } else {
            setAlert('red', response.message, 4);
        }
    };

    const deleteReviewUtil = async () => {
        setsaving(true);
        await deleteReview(myReview._id);
        await setReviewToState(currentPage, 'limit=5');
        await setStarPercerntsToState();
        setmyReview(null);
        setrating(0);
        handleRatingStarHoverOut();
        if (courseOrBootcamp === 'course') {
            getCourse(courseOrBootcampId);
        } else {
            getBootcamp(courseOrBootcampId);
        }
        setsaving(false);
    };

    const handleRatingStarHoverIn = (num) => {
        const stars = document.querySelectorAll(
            '.course-feedback-top-rating-stars-star-review'
        );
        stars.forEach((star, index) => {
            if (index < num) {
                // const use = document.createElement('use').setAttribute('')
                star.innerHTML = fullStar;
            } else {
                star.innerHTML = emptyStar;
            }
        });
    };
    const handleRatingStarHoverOut = () => {
        const stars = document.querySelectorAll(
            '.course-feedback-top-rating-stars-star-review'
        );
        stars.forEach((star, index) => {
            if (index < rating) {
                star.innerHTML = fullStar;
            } else {
                star.innerHTML = emptyStar;
            }
        });
    };

    const renderStars = (stars) => {
        const fullStars = Math.floor(stars);
        const iconsList = [];
        for (let star = 1; star <= fullStars; star++) {
            iconsList.push(
                <svg
                    className="course-feedback-top-rating-stars-star-review"
                    key={star}
                    onClick={() => setrating(star)}
                    onMouseMoveCapture={(event) => {
                        event.stopPropagation();
                        handleRatingStarHoverIn(star);
                    }}
                    onMouseOut={(event) => {
                        event.stopPropagation();
                        handleRatingStarHoverOut(star);
                    }}
                >
                    <use xlinkHref="img/sprite.svg#icon-star-full"></use>
                </svg>
            );
        }
        if (iconsList.length < 5) {
            for (let index = iconsList.length + 1; index <= 5; index++) {
                iconsList.push(
                    <svg
                        className="course-feedback-top-rating-stars-star-review"
                        key={index}
                        onClick={() => setrating(index)}
                        onMouseMoveCapture={(event) => {
                            event.stopPropagation();
                            handleRatingStarHoverIn(index);
                        }}
                        onMouseOut={(event) => {
                            event.stopPropagation();
                            handleRatingStarHoverOut(index);
                        }}
                    >
                        <use xlinkHref="img/sprite.svg#icon-star-empty"></use>
                    </svg>
                );
            }
        }

        return iconsList;
    };

    const getRatingText = (stars) => {
        if (stars === 1) {
            return (
                <span
                    className="errorMessage"
                    style={{ color: 'red', fontSize: '3rem' }}
                >
                    Worst
                </span>
            );
        } else if (stars === 2) {
            return (
                <span
                    className="errorMessage"
                    style={{ color: 'red', fontSize: '3rem' }}
                >
                    Bad
                </span>
            );
        } else if (stars === 3) {
            return (
                <span
                    className="errorMessage"
                    style={{ color: pirmaryColor, fontSize: '3rem' }}
                >
                    Good
                </span>
            );
        } else if (stars === 4) {
            return (
                <span
                    className="errorMessage"
                    style={{ color: 'green', fontSize: '3rem' }}
                >
                    Great
                </span>
            );
        } else if (stars === 5) {
            return (
                <span
                    className="errorMessage"
                    style={{ color: 'green', fontSize: '3rem' }}
                >
                    Best
                </span>
            );
        } else {
            return (
                <span
                    className="errorMessage"
                    style={{ color: pirmaryColor, fontSize: '3rem' }}
                >
                    Select a star to rate
                </span>
            );
        }
        return null;
    };

    return (
        <div className="review-form-container">
            <h3 className="review-form-text"></h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {(formik) => {
                    console.log(formik);
                    if (formik.values.rating !== rating) {
                        formik.setFieldValue('rating', rating);
                    }
                    return (
                        <Form className="review-form">
                            {renderStars(rating)}
                            <div className="pubProfile-form-control">
                                {getRatingText(rating)}
                                <ErrorMessage name="rating">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="pubProfile-form-control">
                                <Field
                                    className="pubProfile-form-control-input"
                                    id="title"
                                    name="title"
                                    placeHolder="What you wanna highlight ?"
                                />
                                <ErrorMessage name="title">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="pubProfile-form-control">
                                <Field
                                    as="textarea"
                                    className="input-textarea"
                                    id="review"
                                    name="review"
                                    placeHolder="Detailed review"
                                />
                                <ErrorMessage name="review">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div className="review-form-buttons">
                                {myReview === null ? (
                                    <button
                                        className="btn btn-primary btn-md"
                                        type="submit"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-primary btn-md"
                                        type="submit"
                                        disabled={
                                            !(formik.dirty && formik.isValid)
                                        }
                                    >
                                        Edit
                                    </button>
                                )}
                                {myReview === null ? null : (
                                    <button
                                        className="btn btn-tertiary btn-md"
                                        style={{ width: '15rem' }}
                                        type="button"
                                        onClick={deleteReviewUtil}
                                    >
                                        Delete your review
                                    </button>
                                )}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

const mapStateToProps = (store) => ({
    user: store.auth.user,
    reviewLoading: store.reviews.loading,
    reviews: store.reviews.reviews,
});

export default connect(mapStateToProps, {
    setAlert,
    resetLoading,
    getUserReviews,
    getCourse,
    getBootcamp,
})(ReviewForm);
