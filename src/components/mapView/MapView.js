import React, { createRef, Fragment, useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as d3 from 'd3';

function MapView(props) {
    const [renderDistanceDropdown, setrenderDistanceDropdown] = useState(false);

    const dropDownRef = createRef();

    const classes = {};

    const radioInputs = [
        { key: 'show-all', value: 'all', text: 'All Bootcamps' },
        { key: 'show-near', value: 'near', text: 'Bootcamps near me' },
    ];

    const initialValues = {
        filter: radioInputs[0].value,
        radialDistance: '',
    };

    const validationSchema = Yup.object({
        filter: Yup.string().required('The filter condition is mandatory'),
        radialDistance: Yup.string().optional(),
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <Fragment>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validate={onSubmit}
            >
                {(formik) => {
                    console.log(formik);
                    if (formik.values.filter === radioInputs[1].value) {
                        console.log('display');
                        if (dropDownRef.current !== null) {
                            dropDownRef.current.parentElement.style =
                                'display:block;';
                        }
                    } else {
                        console.log('do not display');
                        if (dropDownRef.current !== null) {
                            dropDownRef.current.parentElement.style =
                                'display:none;';
                        }
                    }
                    return (
                        <Form class="map-view-form">
                            {radioInputs.map(({ key, value, text }, index) => (
                                <div key={index} class="map-form-control">
                                    <Field
                                        type="radio"
                                        class="map-form-control-input"
                                        name="filter"
                                        id={key}
                                        value={value}
                                        checked={formik.values.filter === value}
                                    />
                                    <label
                                        for={key}
                                        class="map-form-control-label"
                                    >
                                        {text}
                                    </label>
                                </div>
                            ))}
                            <select
                                ref={dropDownRef}
                                class="ui compact selection dropdown map-select"
                            >
                                <i class="dropdown icon map-select-icon"></i>
                                <div class="menu">
                                    <div class="item">
                                        <option value="">
                                            Radial Distance
                                        </option>
                                    </div>
                                    <div class="item">
                                        <option value="10">10 KMs</option>
                                    </div>
                                    <div class="item">
                                        <option value="20">20 KMs</option>
                                    </div>
                                    <div class="item">
                                        <option value="30">30 KMs</option>
                                    </div>
                                </div>
                            </select>
                        </Form>
                    );
                }}
            </Formik>
        </Fragment>
    );
}

export default MapView;
