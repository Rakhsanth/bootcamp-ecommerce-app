import { Form, Formik, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';

// actions
import { setAlert } from '../../actions';
import { createOrEditReview, deleteReview } from '../../api';

function ReviewForm(props) {
    const {
        courseOrBootcamp,
        courseOrBootcampId,
        setReviewToState,
        setStarPercerntsToState,
    } = props;
    const { reviews, setAlert } = props;

    const [saving, setsaving] = useState(false);
    const [myReview, setmyReview] = useState({ status: null, review: null });

    let initialValues = {
        title: '',
        review: '',
    };

    const newReview = () => {
        const myReview = reviews.find(
            (review) =>
                review.course === courseOrBootcampId ||
                review.bootcamp === courseOrBootcampId
        );
        if (myReview !== undefined) {
            return { status: false, review: myReview };
        }
        return { status: true, review: null };
    };

    useEffect(() => {
        setmyReview(newReview());
    }, [reviews]);

    if (myReview.status !== null && myReview.status === false) {
        initialValues = {
            title: myReview.review.title,
            review: myReview.review.review,
        };
    }

    const validationSchema = Yup.object({
        title: Yup.string()
            .max(100, 'Main review cannot exceed 100 characters')
            .required('Main review cannot be empty'),
        review: Yup.string()
            .max(500, 'Sub review cannot exceed 500 characters')
            .required('Sub review cannot be empty'),
    });
    const onSubmit = async (values) => {
        setsaving(true);
        let response;
        if (myReview.status) {
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
        await setReviewToState();
        await setStarPercerntsToState();
        setsaving(false);
        if (response.success) {
            setAlert('green', response.message, 3);
        } else {
            setAlert('red', response.message, 4);
        }
    };

    const deleteReviewUtil = async () => {
        setsaving(true);
        await deleteReview();
        await setReviewToState();
        await setStarPercerntsToState();
        setsaving(false);
    };

    return (
        <div className="review-form-container">
            <h3 className="review-form-text"></h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    console.log(formik);
                    return (
                        <Form className="review-form">
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
                                    className="input-textarea"
                                    id="review"
                                    name="review"
                                    type="textarea"
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
                                {myReview.status ? (
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
                                {myReview.status ? null : (
                                    <button
                                        className="btn btn-primary btn-md"
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
    reviews: store.reviews.reviews,
});

export default connect(mapStateToProps, { setAlert })(ReviewForm);
