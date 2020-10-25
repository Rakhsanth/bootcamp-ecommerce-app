import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
// action creators
import { loginUser } from '../actions';
// utils
import { validatePassword } from '../components/utils/utilFunctions';

function Login(props) {
    const { loading, loggedIn } = props;
    const { loginUser, history } = props;

    const initialValues = {
        email: '',
        password: '',
    };
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('invalid email')
            .required('email is required for native login'),
        password: Yup.string(),
        // .test(
        //     'test-pwd',
        //     'password must have uppercase, lowercase, numbers and special charachers and atleast 7 characters',
        //     (value) => validatePassword(value)
        // ),
    });
    const onSubmit = (values, onSubmitProps) => {
        console.log(values);
        const body = values;
        loginUser(body, history);
    };

    return !loading ? (
        loggedIn ? (
            <Redirect to="/" />
        ) : (
            <div class="login-container">
                <div class="login-container-inner">
                    <div class="login-container-message">
                        <strong> Login with your Bootcamp account </strong>
                    </div>
                    <div class="login-container-thirdparty">
                        <div class="login-container-google">
                            <button class="btn btn-google-login">
                                <img src="./img/logos/google.jpg" />
                                <a>Log in via Google</a>
                            </button>
                        </div>
                        <div class="login-container-facebook">
                            <button class="btn btn-facebook-login">
                                <img src="./img/logos/fb.jpg" />
                                <a>Log in via Facebook</a>
                            </button>
                        </div>
                    </div>
                    <div class="login-container-form">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {(formik) => {
                                return (
                                    <Form>
                                        <div class="login-container-email pubProfile-form-control">
                                            <Field
                                                type="email"
                                                name="email"
                                                placeholder="email"
                                            />
                                            <ErrorMessage name="email">
                                                {(errorMsg) => (
                                                    <span className="errorMessage">
                                                        {errorMsg}
                                                    </span>
                                                )}
                                            </ErrorMessage>
                                        </div>
                                        <div class="login-container-password pubProfile-form-control">
                                            <Field
                                                type="password"
                                                name="password"
                                                placeholder="password"
                                            />
                                            <ErrorMessage name="password">
                                                {(errorMsg) => (
                                                    <span className="errorMessage">
                                                        {errorMsg}
                                                    </span>
                                                )}
                                            </ErrorMessage>
                                        </div>

                                        <div class="login-container-button">
                                            <button class="btn btn-loginpage">
                                                Login
                                            </button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                    <div class="login-container-forgotpw">
                        Or <Link to="/resetPassword">Forgot Password</Link>
                    </div>
                    <div class="login-container-signup">
                        Don't have an account?{' '}
                        <Link to="/register">Sign Up</Link>
                    </div>
                </div>
            </div>
        )
    ) : (
        <h1>Loading ...</h1>
    );
}

const mapStateToProps = (store) => {
    return { loading: store.auth.loading, loggedIn: store.auth.loggedIn };
};

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
