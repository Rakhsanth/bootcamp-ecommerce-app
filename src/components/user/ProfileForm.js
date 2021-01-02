import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
// APIs
import { getProfileDetails, createOrEditProfileDetails } from '../../api';
// utils
import {
    validateImageFileSize,
    validateDocFileSize,
    validateMobileNumber,
} from '../utils/utilFunctions';
import { getUserProfile, setAlert } from '../../actions';

function ProfileForm(props) {
    let valuesFromBackend;
    // let image = 'no-photo.jpg';

    const { loading, user, history, setAlert, getUserProfile } = props;

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
        email: user ? user.email : '',
        state: profile ? profile.state : '',
        zipcode: profile ? profile.zipcode : '',
        mobile: profile ? profile.mobile : '',
    };
    const validationSchema = Yup.object({
        picture: Yup.mixed().test(
            'testImageSize',
            'Please provide image less than 5 MB',
            (value) => validateImageFileSize(value, 5)
        ),
        name: Yup.string().required(),
        email: Yup.string().email().required('email is mandatory'),
        state: Yup.string().required('State is mandatory field'),
        zipcode: Yup.string().required('Zipcode is mandatory'),
        mobile: Yup.string().test(
            'testMobileNum',
            'Mobile number needs to be a 10 digit number',
            (value) => validateMobileNumber(value)
        ),
    });
    const onSubmit = async (values, submitProps) => {
        console.log(values);
        let result;
        if (profile) {
            result = await createOrEditProfileDetails(
                profile._id,
                'edit',
                values
            );
        } else {
            result = await createOrEditProfileDetails(null, 'create', values);
        }
        if (result) {
            setAlert('green', 'Profile updated successfully', 3);
        } else {
            setAlert('red', 'Something went wrong please try again later', 3);
        }
        getProfileDetailsUtil();
        getUserProfile(user._id);
        history.push('/');
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
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="email"
                                    class="pubProfile-form-control-label"
                                >
                                    Email
                                </label>
                                <Field
                                    style={{ cursor: 'not-allowed' }}
                                    id="email"
                                    name="email"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="abc@def.com"
                                    disabled
                                />
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="state"
                                    class="pubProfile-form-control-label"
                                >
                                    State
                                </label>
                                <Field
                                    id="state"
                                    name="state"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="Tamil Nadu"
                                />
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="zipcode"
                                    class="pubProfile-form-control-label"
                                >
                                    Zipcode
                                </label>
                                <Field
                                    id="zipcode"
                                    name="zipcode"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="600028"
                                />
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="mobile"
                                    class="pubProfile-form-control-label"
                                >
                                    Mobile
                                </label>
                                <Field
                                    id="mobile"
                                    name="mobile"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="9087654321"
                                />
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

export default connect(mapStateToProps, { setAlert, getUserProfile })(
    withRouter(ProfileForm)
);
