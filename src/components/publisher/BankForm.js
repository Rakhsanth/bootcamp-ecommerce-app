import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function BankForm(props) {
    const initialValues = {
        accountNumber: '',
        ifsc: '',
    };
    const validationSchema = Yup.object({
        accountNumber: Yup.number(
            'Account number cannot have letters'
        ).required('Account number is required'),
        ifsc: Yup.string().required('IFSC code is required'),
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
                            <div class="pubProfile-form-control">
                                <label
                                    for="account-number"
                                    class="pubProfile-form-control-label"
                                >
                                    Account Number
                                </label>
                                <Field
                                    id="account-number"
                                    name="accountNumber"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="1234567890123456"
                                />
                            </div>
                            <div class="pubProfile-form-control">
                                <label
                                    for="ifsc"
                                    class="pubProfile-form-control-label"
                                >
                                    IFSC code
                                </label>
                                <Field
                                    id="ifsc"
                                    name="ifsc"
                                    type="text"
                                    class="pubProfile-form-control-input"
                                    placeholder="abcd0002457"
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

export default BankForm;
