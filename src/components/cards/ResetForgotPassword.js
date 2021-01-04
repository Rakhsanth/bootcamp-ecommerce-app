import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Yup from 'yup';

// API calls
import { resetForgotPassword } from '../../api';
// Actions
import { setAlert } from '../../actions';
import Spinner from '../utils/Spinner';
// utils
import { validatePassword } from '../utils/utilFunctions';

function ResetForgotPassword(props) {
    const { setAlert, history } = props;

    const [loading, setloading] = useState(false);

    const initialValues = {
        resetToken: '',
        password: '',
        confirmPassword: '',
    };
    const validationSchema = Yup.object({
        resetToken: Yup.string().required(
            'Reset token needs to be provided for resetting password'
        ),
        password: Yup.string().test(
            'test-pwd',
            'Password must have uppercase, lowercase, numbers and special charachers and atleast 7 characters',
            (value) => validatePassword(value)
        ),
        confirmPassword: Yup.string().test(
            'validate confirm password',
            'New password and confirm password must be same',
            function (value) {
                return value === this.parent.password;
            }
        ),
    });
    const onSubmit = async (values) => {
        setloading(true);
        const response = await resetForgotPassword(values);
        setloading(false);
        if (response.success) {
            setAlert('green', response.message, 3);
            history.replace('/');
        } else {
            setAlert('red', response.message, 4);
        }
    };

    return (
        <div
            className="forgot-password-container"
            onClick={() => {
                history.replace('/');
            }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {(formik) => {
                    console.log(formik);

                    return (
                        <Form
                            className="forgot-password-form"
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <div className="pubProfile-form-control">
                                <Field
                                    className="pubProfile-form-control-input"
                                    id="resetToken"
                                    name="resetToken"
                                    placeHolder="Reset Token"
                                />
                                <ErrorMessage name="resetToken">
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
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeHolder="New Password"
                                />
                                <ErrorMessage name="password">
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
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeHolder="Conform Password"
                                />
                                <ErrorMessage name="confirmPassword">
                                    {(errorMsg) => (
                                        <span className="errorMessage">
                                            {errorMsg}
                                        </span>
                                    )}
                                </ErrorMessage>
                            </div>
                            <button
                                className="btn btn-primary btn-md"
                                type="submit"
                                style={{
                                    marginLeft: '50%',
                                    transform: 'translateX(-50%)',
                                    marginTop: '1rem',
                                }}
                            >
                                Reset
                            </button>
                        </Form>
                    );
                }}
            </Formik>
            {loading ? <Spinner size="md" /> : null}
        </div>
    );
}

const mapStateToProps = (store) => ({});

export default connect(mapStateToProps, { setAlert })(
    withRouter(ResetForgotPassword)
);
