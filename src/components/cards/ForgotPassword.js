import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Yup from 'yup';

// API calls
import { forgotPassword } from '../../api';
// Actions
import { setAlert } from '../../actions';
import Spinner from '../utils/Spinner';

function ForgotPassword(props) {
    const { removeMe, setAlert } = props;

    const [loading, setloading] = useState(false);

    const initialValues = {
        email: '',
    };
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Please provide a valid email to proceed')
            .required('Email needs to be provided for resetting password'),
    });
    const onSubmit = async (values) => {
        setloading(true);
        const response = await forgotPassword(values);
        setloading(false);
        if (response.success) {
            setAlert('green', response.message, 3);
            removeMe();
        } else {
            setAlert('red', response.message, 4);
        }
    };

    return (
        <div className="forgot-password-container" onClick={() => removeMe()}>
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
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="pubProfile-form-control">
                                <label
                                    className="pubProfile-form-control-label"
                                    htmlFor="forgot-email"
                                >
                                    Email:
                                </label>
                                <Field
                                    className="pubProfile-form-control-input"
                                    id="forgot-email"
                                    name="email"
                                />
                                <ErrorMessage name="email">
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
    withRouter(ForgotPassword)
);
