// react related
import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
// action creators
import { resetLoading, registerUser } from '../actions';
// utils
import { validatePassword } from '../components/utils/utilFunctions';
import Spinner from './utils/Spinner';

function Register(props) {
    const { resetLoading, registerUser, history, loading, loggedIn } = props;

    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        password2: '',
        role: 'user',
    };
    const validationSchema = Yup.object({
        fullName: Yup.string().required('name is mandatory'),
        email: Yup.string()
            .email('invalid email')
            .required('email is mandatory'),
        password: Yup.string().test(
            'test-pwd',
            'password must have uppercase, lowercase, numbers and special charachers and atleast 7 characters',
            (value) => validatePassword(value)
        ),
        password2: Yup.string().test(
            'validate confirm password',
            'password and confirm password must be same',
            function (value) {
                return value === this.parent.password;
            }
        ),
    });
    const onSubmit = (values, onSubmitProps) => {
        console.log(values);
        console.log(onSubmitProps);
        const body = values;
        body.name = values.fullName;
        body.thirdParty = false;
        body.role = values.role === 'publisher' ? values.role : 'user';
        resetLoading('auth');
        registerUser(body, history);
    };

    return loggedIn ? (
        <Redirect to="/" />
    ) : (
        <div className="signup-container">
            <div className="signup-container-message">
                Sign Up and Enroll !!
            </div>
            <div className="signup-container-form">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => {
                        console.log(formik);
                        return (
                            <Form className="signup-container-form-details">
                                <div className="signup-container-form-input">
                                    <Field
                                        name="fullName"
                                        type="text"
                                        placeholder="Full Name"
                                    />
                                    <ErrorMessage name="fullName">
                                        {(errorMsg) => (
                                            <span className="errorMessage">
                                                {errorMsg}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div class="ui toggle checkbox">
                                    <Field
                                        id="role"
                                        type="checkbox"
                                        name="role"
                                        value="publisher"
                                    />
                                    <label htmlFor="role">
                                        Join as publisher
                                    </label>
                                </div>
                                <div
                                    className="signup-container-form-email"
                                    style={{ marginTop: '1rem' }}
                                >
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                    <ErrorMessage name="email">
                                        {(errorMsg) => (
                                            <span className="errorMessage">
                                                {errorMsg}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="signup-container-form-password">
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage name="password">
                                        {(errorMsg) => (
                                            <span
                                                className="errorMessage"
                                                style={{ width: '350px' }}
                                            >
                                                {errorMsg}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="signup-container-form-password">
                                    <Field
                                        name="password2"
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                    <ErrorMessage name="password2">
                                        {(errorMsg) => (
                                            <span className="errorMessage">
                                                {errorMsg}
                                            </span>
                                        )}
                                    </ErrorMessage>
                                </div>
                                <div className="signup-container-form-submit">
                                    <button className="btn btn-loginpage">
                                        Register
                                    </button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
            <div className="signup-container-signin">
                Already have an account ? <Link to="/login">Sign In</Link>
            </div>
            {loading ? <Spinner size="lg" /> : null}
        </div>
    );
}

const mapStateToProps = (store) => {
    return {
        loading: store.auth.loading,
        loggedIn: store.auth.loggedIn,
        auth: store.auth,
    };
};

export default connect(mapStateToProps, { resetLoading, registerUser })(
    withRouter(Register)
);
