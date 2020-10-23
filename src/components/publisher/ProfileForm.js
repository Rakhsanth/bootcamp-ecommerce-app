import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function ProfileForm(props) {
    let valuesFromBackend;
    let image = 'no-photo.jpg';

    const initialValues = {
        picture: '',
        name: '',
        resume: '',
        websiteLink: '',
    };
    const validationSchema = Yup.object({
        name: Yup.string().required(),
        websiteLink: Yup.string().url('Please provide a valid URL').optional(),
    });
    const onSubmit = (values, submitProps) => {
        console.log(values);
    };

    return (
        <Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    console.log(formik);
                    return (
                        <Form>
                            <div class="pubProfile-tabContent-profile-image">
                                <img
                                    src={
                                        image !== 'no-photo.jpg'
                                            ? image
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

export default ProfileForm;
