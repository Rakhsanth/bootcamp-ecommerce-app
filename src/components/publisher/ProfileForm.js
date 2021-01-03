import React, { Fragment, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
// actions
import { setAlert } from '../../actions';
// APIs
import { getProfileDetails, createOrEditProfileDetails } from '../../api';
// utils
import {
    validateImageFileSize,
    validateDocFileSize,
    validateMobileNumber,
} from '../utils/utilFunctions';

function ProfileForm(props) {
    let valuesFromBackend;
    // let image = 'no-photo.jpg';

    const { loading, user, setAlert } = props;

    const [profile, setprofile] = useState(null);

    const getProfileDetailsUtil = async () => {
        const profile = await getProfileDetails(user._id);
        setprofile(profile);
    };
    useEffect(() => {
        if (!loading) {
            getProfileDetailsUtil();
        }
    }, [loading]);

    const initialValues = {
        picture: profile ? profile.picture : '',
        name: profile ? profile.name : '',
        resume: profile ? profile.resume : '',
        websiteLink: profile ? profile.websiteLink : '',
        mobile: profile ? profile.mobile : '',
    };
    const validationSchema = Yup.object({
        picture: Yup.mixed().test(
            'testImageSize',
            'Please provide image less than 5 MB',
            (value) => validateImageFileSize(value, 5)
        ),
        name: Yup.string().required(),
        resume: Yup.mixed().test(
            'testFileTypeAndSize',
            'Resume or certificate must me a PDF and less than 5 MB',
            (value) => validateDocFileSize(value)
        ),
        websiteLink: Yup.string().url('Please provide a valid URL').optional(),
        mobile: Yup.string().test(
            'testMobileNum',
            'Mobile number needs to be a 10 digit number',
            (value) => validateMobileNumber(value)
        ),
    });
    const onSubmit = async (values, submitProps) => {
        console.log(values);
        let response;
        if (profile) {
            response = await createOrEditProfileDetails(
                profile._id,
                'edit',
                values
            );
        } else {
            response = await createOrEditProfileDetails(null, 'create', values);
        }
        if (response.success) {
            setAlert('green', response.message, 3);
        } else {
            setAlert('red', response.message, 4);
        }
        getProfileDetailsUtil();
    };

    return (
        <Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {(formik) => {
                    console.log(formik);
                    return (
                        <Form>
                            <div class="pubProfile-tabContent-profile-image">
                                <img
                                    style={{ borderRadius: '50%' }}
                                    src={
                                        profile
                                            ? profile.picture !== 'no-photo.jpg'
                                                ? profile.picture
                                                : '/bootcamp_logo.jpg'
                                            : '/bootcamp_logo.jpg'
                                    }
                                    alt="profile-picture"
                                    class="pubProfile-tabContent-profile-image-img"
                                />
                                <label
                                    for="pubProfile-picture"
                                    class="btn btn-primary pubProfile-form-control-label text-center label-btn"
                                >
                                    Change picture
                                </label>
                                <Field>
                                    {(fieldProps) => {
                                        const {
                                            form: { setFieldValue },
                                        } = fieldProps;
                                        return (
                                            <input
                                                id="pubProfile-picture"
                                                name="picture"
                                                type="file"
                                                class="pubProfile-form-control-fileInput"
                                                multiple
                                                onChange={(event) => {
                                                    setFieldValue(
                                                        'picture',
                                                        event.currentTarget
                                                            .files[0]
                                                    );
                                                }}
                                            />
                                        );
                                    }}
                                </Field>
                                <ErrorMessage name="picture">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>

                            <div class="pubProfile-form-control">
                                <label
                                    for="name"
                                    class="pubProfile-form-control-label"
                                >
                                    Name
                                </label>
                                <Field
                                    id="name"
                                    name="name"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="Name"
                                />
                                <ErrorMessage name="name">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="resume"
                                    class="pubProfile-form-control-label"
                                >
                                    Resume / Certificate
                                </label>
                                <label
                                    for="resume"
                                    class="btn btn-primary pubProfile-form-control-label text-center label-btn"
                                >
                                    Upload
                                </label>
                                <Field name="resume">
                                    {({ form: { setFieldValue } }) => {
                                        return (
                                            <input
                                                id="resume"
                                                type="file"
                                                name="resume"
                                                class="pubProfile-form-control-fileInput"
                                                multiple
                                                onChange={(event) => {
                                                    setFieldValue(
                                                        'resume',
                                                        event.currentTarget
                                                            .files[0]
                                                    );
                                                }}
                                            />
                                        );
                                    }}
                                </Field>
                                <ErrorMessage name="resume">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="website-link"
                                    class="pubProfile-form-control-label"
                                >
                                    Website
                                </label>
                                <Field
                                    id="website-link"
                                    name="websiteLink"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="www.foo_bar.com"
                                />
                                <ErrorMessage name="websiteLink">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="mobile-number"
                                    class="pubProfile-form-control-label"
                                >
                                    Mobile number
                                </label>
                                <Field
                                    id="mobile-number"
                                    name="mobile"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="9087654321"
                                />
                                <ErrorMessage name="mobile">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <input
                                type="submit"
                                class="btn btn-secondary pubProfile-form-submit"
                                value="Save"
                            />
                        </Form>
                    );
                }}
            </Formik>
        </Fragment>
    );
}

const mapStateToProps = (store) => ({
    loading: store.auth.loading,
    user: store.auth.user,
});

export default connect(mapStateToProps, { setAlert })(ProfileForm);
