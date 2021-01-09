import React, { createRef, Fragment, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
// action creators
import { resetLoading, loginUser } from '../actions';
// 3rd party logins
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
// configs
import { googleSignInClientId, facebookSignInAppId } from '../config/config';
// utils
import { validatePassword } from '../components/utils/utilFunctions';
import Spinner from './utils/Spinner';
// Components
import ForgotPassword from './cards/ForgotPassword';

function Login(props) {
    const { loading, loggedIn } = props;
    const { resetLoading, loginUser, history } = props;

    const [forgotPassword, setforgotPassword] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('invalid email')
            .required('email is required for native login'),
        password: Yup.string(),
    });
    const onSubmit = (values, onSubmitProps) => {
        console.log(values);
        const body = values;
        resetLoading('auth');
        loginUser(body, history);
    };

    const userTabRef = createRef();
    const publisherTabRef = createRef();
    const tabs = [userTabRef, publisherTabRef];

    const thirdPartyRef = createRef();

    const handleTabs = (tab) => {
        tabs.forEach((tab, index) => {
            if (tab.current.classList.contains('active')) {
                tab.current.classList.remove('active');
                console.log(`removed active from ${tab.current}`);
            }
        });

        thirdPartyRef.current.style.display = 'none';

        if (tab === 'userTab') {
            console.log(userTabRef.current);
            userTabRef.current.classList.add('active');
            thirdPartyRef.current.style.display = 'flex';
        }
        if (tab === 'publisherTab') {
            console.log(publisherTabRef.current);
            publisherTabRef.current.classList.add('active');
        }
    };

    const responseGoogle = (response) => {
        const {
            googleId,
            profileObj: { name, email, imageUrl },
        } = response;
        const body = {};
        body.thirdParty = true;
        body.thirdPartyId = `google_${googleId}`;
        body.name = name;
        body.email = email;
        body.imageUrl = imageUrl;
        console.log(body);
        resetLoading('auth');
        loginUser(body, history);
    };

    const responseGoogleFail = (response) => {
        console.log(response);
    };

    const responseFacebook = (response) => {
        const {
            id,
            name,
            email,
            picture: {
                data: { url },
            },
        } = response;
        const body = {};
        body.thirdParty = true;
        body.thirdPartyId = `facebook_${id}`;
        body.name = name;
        body.email = email;
        body.imageUrl = url;
        console.log(body);
        resetLoading('auth');
        loginUser(body, history);
    };

    const removeMe = () => {
        setforgotPassword(false);
    };

    return loggedIn ? (
        <Redirect to="/" />
    ) : (
        <Fragment>
            <div class="login-container" style={{ position: 'relative' }}>
                <div class="pubProfile-tabs">
                    <div class="ui top attached tabular menu grid two column row">
                        <div
                            ref={userTabRef}
                            id="profile-tab"
                            class="column active item pubProfile-tabs-profile"
                            onClick={() => handleTabs('userTab')}
                        >
                            <h5 class="center pubProfile-tabs-text">User</h5>
                        </div>
                        <div
                            ref={publisherTabRef}
                            id="bank-tab"
                            class="column item pubProfile-tabs-bankDT"
                            onClick={() => handleTabs('publisherTab')}
                        >
                            <h5 class="center pubProfile-tabs-text">
                                Publisher
                            </h5>
                        </div>
                    </div>
                    <div class="ui bottom attached tab segment active pubProfile-tabContent">
                        <div
                            class="login-container-inner"
                            style={{ margin: '0 auto' }}
                        >
                            <div class="login-container-message">
                                {' '}
                                Login with your Bootcamp account{' '}
                            </div>
                            <div class="login-container-thirdparty">
                                <div
                                    className="login-container-thirdparty-inner"
                                    ref={thirdPartyRef}
                                >
                                    <div class="login-container-google">
                                        <GoogleLogin
                                            className="google-signin-provider"
                                            clientId={googleSignInClientId}
                                            // buttonText="Login"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogleFail}
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </div>
                                    <div class="login-container-facebook">
                                        <FacebookLogin
                                            className="facebook-signin-provider"
                                            appId={facebookSignInAppId}
                                            fields="name,email,picture"
                                            // onClick={componentClicked}
                                            callback={responseFacebook}
                                        />
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
                                                <Form style={{ width: '100%' }}>
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
                            </div>

                            <div class="login-container-forgotpw">
                                Or{' '}
                                <a
                                    href="#"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setforgotPassword(true);
                                    }}
                                >
                                    Forgot Password
                                </a>
                            </div>
                            <div class="login-container-signup">
                                Don't have an account?{' '}
                                <Link to="/register">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {loading ? <Spinner size="lg" /> : null}
                {/* <Spinner size="lg" /> */}
            </div>
            {forgotPassword ? <ForgotPassword removeMe={removeMe} /> : null}
        </Fragment>
    );
}

const mapStateToProps = (store) => {
    return { loading: store.auth.loading, loggedIn: store.auth.loggedIn };
};

export default connect(mapStateToProps, { resetLoading, loginUser })(
    withRouter(Login)
);
