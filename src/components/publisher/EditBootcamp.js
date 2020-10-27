import React, { createRef, useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
// api calls
import { createEditBootcamp } from '../../api';
// actions
import { resetLoading, getBootcamp } from '../../actions';
// custom utils
import { validateImageFileSize } from '../utils/utilFunctions';

function EditBootcamp(props) {
    const { resetLoading, bootcampId } = props;
    const { loading, bootcamp, getBootcamp } = props;

    useEffect(() => {
        getBootcamp(bootcampId);
    }, [getBootcamp]);

    const initialValues = {
        image: '',
        name: bootcamp ? bootcamp.name : '',
        state: bootcamp ? bootcamp.state : '',
        district: bootcamp ? bootcamp.district : '',
        address: bootcamp ? bootcamp.address : '',
        zipcode: bootcamp ? bootcamp.zipcode : '',
        housing: bootcamp ? bootcamp.housing : 'false',
        jobAssistance: bootcamp ? bootcamp.jobAssistance : 'true',
        jobGuarantee: bootcamp ? bootcamp.jobGuarantee : 'false',
        description: bootcamp ? bootcamp.description : '',
        website: bootcamp ? bootcamp.website : '',
        email: bootcamp ? bootcamp.email : '',
        phone: bootcamp ? bootcamp.phone : '',
        offerings: bootcamp ? bootcamp.offerings : [''],
    };

    const validateOfferingsLength = (values) => {
        console.log(values);
        if (values.length < 2) return false;
        const isEmpty = values.some(
            (text) => text === undefined || text.length === 0
        );
        if (isEmpty) return false;

        return true;
    };
    const validationSchema = Yup.object({
        image: Yup.mixed().test(
            'testFileSize',
            'Please provide image less than 5 MB',
            (value) => validateImageFileSize(value, 5)
        ),
        name: Yup.string().required('Bootcamp name is mandatory'),
        state: Yup.string().required(
            'Plase provide the state where your bbotcamp is located'
        ),
        district: Yup.string().required(
            'Plase provide the district where your bbotcamp is located'
        ),
        address: Yup.string().required(
            'Plase provide the district where your bbotcamp is located'
        ),
        zipcode: Yup.number().required(),
        housing: Yup.string().optional(),
        jobAssistance: Yup.string().optional(),
        jobGuarantee: Yup.string().optional(),
        description: Yup.string()
            .max(500, 'Please provide description less than 500 characters')
            .required('Bootcamp description is mandatory'),
        website: Yup.string().url().optional(),
        email: Yup.string().email().required('Email for contact is mandatory'),
        phone: Yup.number().required('Mobile number for cantact is mandatory'),
        offerings: Yup.array().test(
            'offeringsLengthTest',
            'Please provide atleast 2 offerings',
            (values) => validateOfferingsLength(values)
        ),
    });

    const onSubmit = (values, submitProps) => {
        createEditBootcamp(values, 'edit');
        resetLoading('taggedBootcamps');
    };

    // Tab refs
    const bootcampTabRef = createRef();
    const courseTabRef = createRef();
    const tabs = [bootcampTabRef, courseTabRef];
    // Tab content refs
    const bootcampTabContentRef = createRef();
    const courseTabContentRef = createRef();
    const tabsContent = [bootcampTabContentRef, courseTabContentRef];

    const handleTabClick = (tab) => {
        tabs.forEach((tab) => {
            // console.log(tab.current.classList);
            tab.current.classList.remove('active');
        });
        tabsContent.forEach((tabContent) => {
            tabContent.current.style.display = 'none';
        });
        switch (tab) {
            case 'bootcampTab':
                bootcampTabRef.current.classList.add('active');
                bootcampTabContentRef.current.style.display = 'flex';
                break;
            case 'courseTab':
                courseTabRef.current.classList.add('active');
                courseTabContentRef.current.style.display = 'flex';
                break;
        }
    };

    return !loading ? (
        <div class="main-conatiner-bootcampForm">
            <div class="ui top attached two steps">
                <div
                    ref={bootcampTabRef}
                    class="active step bootcamp-form-step"
                    style={{ cursor: 'pointer' }}
                    onClick={(event) => {
                        console.log(event);
                        handleTabClick('bootcampTab');
                    }}
                >
                    <i aria-hidden="true" class="icon">
                        <svg style={{ height: '3rem', width: '3rem' }}>
                            <use xlinkHref="img/sprite.svg#icon-office"></use>
                        </svg>
                    </i>
                    {/* <svg class="icon">
                        <use xlinkHref="img/sprite.svg#office"></use>
                    </svg> */}
                    <div class="content">
                        <div class="title">Edit Bootcamp Info</div>
                        <div class="description">
                            Bootcamp and location specific information
                        </div>
                    </div>
                </div>
                <div
                    ref={courseTabRef}
                    class={`step bootcamp-form-step`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleTabClick('courseTab')}
                >
                    <i aria-hidden="true" class="icon">
                        <svg style={{ height: '3rem', width: '3rem' }}>
                            <use xlinkHref="img/sprite.svg#icon-laptop"></use>
                        </svg>
                    </i>

                    <div class="content">
                        <div class="title">Courses</div>
                        <div class="description">
                            View, Edit and Delete Courses
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui attached segment">
                <div class="bootcamp-form-content">
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
                                    <div
                                        ref={bootcampTabContentRef}
                                        class="bootcamp-form-content-basic"
                                    >
                                        <div class="bootcamp-form-content-basic-picture">
                                            <img
                                                src={
                                                    bootcamp
                                                        ? bootcamp.photo
                                                        : '/bootcamp_logo.jpg'
                                                }
                                                alt=""
                                                class="pubProfile-tabContent-profile-image-img"
                                            />
                                            <label
                                                for="bootcamp-picture"
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
                                                            id="bootcamp-picture"
                                                            name="image"
                                                            type="file"
                                                            class="pubProfile-form-control-fileInput"
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                setFieldValue(
                                                                    'image',
                                                                    event
                                                                        .currentTarget
                                                                        .files[0]
                                                                );
                                                            }}
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </div>
                                        <div class="bootcamp-form-content-basic-details">
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for="bootcamp-name"
                                                    class="pubProfile-form-control-label"
                                                >
                                                    Bootcamp Name
                                                </label>
                                                <Field
                                                    id="bootcamp-name"
                                                    type="text"
                                                    name="name"
                                                    class="pubProfile-form-control-input"
                                                    placeholder="Tech Pllayground"
                                                />
                                            </div>
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for="bootcamp-state"
                                                    class="pubProfile-form-control-label"
                                                >
                                                    State
                                                </label>
                                                <Field
                                                    id="bootcamp-state"
                                                    type="text"
                                                    name="state"
                                                    class="pubProfile-form-control-input"
                                                    placeholder="Tamil Nadu"
                                                />
                                            </div>
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for="bootcamp-district"
                                                    class="pubProfile-form-control-label"
                                                >
                                                    District
                                                </label>
                                                <Field
                                                    id="bootcamp-district"
                                                    type="text"
                                                    name="district"
                                                    class="pubProfile-form-control-input"
                                                    placeholder="Madurai"
                                                />
                                            </div>
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for="bootcamp-address"
                                                    class="pubProfile-form-control-label"
                                                >
                                                    Complete address
                                                </label>
                                                <Field
                                                    id="bootcamp-address"
                                                    type="text"
                                                    name="address"
                                                    class="pubProfile-form-control-input"
                                                    placeholder="no: 10, xyz apartments, abc nagar, 10th cross street ........."
                                                />
                                            </div>
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for="bootcamp-pincode"
                                                    class="pubProfile-form-control-label"
                                                >
                                                    Pincode
                                                </label>
                                                <Field
                                                    id="bootcamp-pincode"
                                                    type="text"
                                                    name="zipcode"
                                                    class="pubProfile-form-control-input"
                                                    placeholder="600026"
                                                />
                                            </div>
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for=""
                                                    class="pubProfile-form-control-label"
                                                >
                                                    Housing provided
                                                </label>
                                                <div class="pubProfile-form-control-radio">
                                                    <div class="pubProfile-form-control-radio-set">
                                                        <Field
                                                            id="housing-yes"
                                                            type="radio"
                                                            name="housing"
                                                            value="true"
                                                            class="pubProfile-form-control-input"
                                                            checked={
                                                                formik.values
                                                                    .housing ===
                                                                'true'
                                                            }
                                                        />
                                                        <label
                                                            for="housing-yes"
                                                            class="pubProfile-form-control-label"
                                                        >
                                                            Yes
                                                        </label>
                                                    </div>
                                                    <div class="pubProfile-form-control-radio-set">
                                                        <Field
                                                            id="housing-no"
                                                            type="radio"
                                                            name="housing"
                                                            value="false"
                                                            class="pubProfile-form-control-input"
                                                            checked={
                                                                formik.values
                                                                    .housing ===
                                                                'false'
                                                            }
                                                        />
                                                        <label
                                                            for="housing-no"
                                                            class="pubProfile-form-control-label"
                                                        >
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for=""
                                                    class="pubProfile-form-control-label"
                                                >
                                                    Job assistance provided
                                                </label>
                                                <div class="pubProfile-form-control-radio">
                                                    <div class="pubProfile-form-control-radio-set">
                                                        <Field
                                                            id="job-assistance-yes"
                                                            type="radio"
                                                            name="jobAssistance"
                                                            value="true"
                                                            class="pubProfile-form-control-input"
                                                            checked={
                                                                formik.values
                                                                    .jobAssistance ===
                                                                'true'
                                                            }
                                                        />
                                                        <label
                                                            for="job-assistance-yes"
                                                            class="pubProfile-form-control-label"
                                                        >
                                                            Yes
                                                        </label>
                                                    </div>
                                                    <div class="pubProfile-form-control-radio-set">
                                                        <Field
                                                            id="job-assistance-no"
                                                            type="radio"
                                                            name="jobAssistance"
                                                            value="false"
                                                            class="pubProfile-form-control-input"
                                                            checked={
                                                                formik.values
                                                                    .jobAssistance ===
                                                                'false'
                                                            }
                                                        />
                                                        <label
                                                            for="job-assistance-no"
                                                            class="pubProfile-form-control-label"
                                                        >
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for=""
                                                    class="pubProfile-form-control-label"
                                                >
                                                    Job guaranteed
                                                </label>
                                                <div class="pubProfile-form-control-radio">
                                                    <div class="pubProfile-form-control-radio-set">
                                                        <Field
                                                            id="job-guaranteed-yes"
                                                            type="radio"
                                                            name="jobGuarantee"
                                                            value="true"
                                                            class="pubProfile-form-control-input"
                                                            checked={
                                                                formik.values
                                                                    .jobGuarantee ===
                                                                'true'
                                                            }
                                                        />
                                                        <label
                                                            for="job-guaranteed-yes"
                                                            class="pubProfile-form-control-label"
                                                        >
                                                            Yes
                                                        </label>
                                                    </div>
                                                    <div class="pubProfile-form-control-radio-set">
                                                        <Field
                                                            id="job-guaranteed-no"
                                                            type="radio"
                                                            name="jobGuarantee"
                                                            value="false"
                                                            class="pubProfile-form-control-input"
                                                            checked={
                                                                formik.values
                                                                    .jobGuarantee ===
                                                                'false'
                                                            }
                                                        />
                                                        <label
                                                            for="job-guaranteed-no"
                                                            class="pubProfile-form-control-label"
                                                        >
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for="bootcampDesc"
                                                    class="pubProfile-form-control-label"
                                                >
                                                    Description
                                                </label>
                                                <Field
                                                    as="textarea"
                                                    id="bootcampDesc"
                                                    name="description"
                                                    class="pubProfile-form-control-input input-textarea"
                                                    placeholder="Tech Playground where anyone with a learning motive can come and leave with a better you!"
                                                />
                                            </div>
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for="bootcampSite"
                                                    class="pubProfile-form-control-label"
                                                >
                                                    Website
                                                </label>
                                                <Field
                                                    id="bootcampSite"
                                                    type="text"
                                                    name="website"
                                                    class="pubProfile-form-control-input"
                                                    placeholder="www.techcamp.com"
                                                />
                                            </div>
                                            <FieldArray name="offerings">
                                                {(fieldArrayProps) => {
                                                    const {
                                                        push,
                                                        remove,
                                                        form: {
                                                            values: {
                                                                offerings,
                                                            },
                                                        },
                                                    } = fieldArrayProps;
                                                    return (
                                                        <div class="pubProfile-form-control">
                                                            <label
                                                                for="bootcampOfferings"
                                                                class="pubProfile-form-control-label"
                                                            >
                                                                Add offerings to
                                                                highlight your
                                                                bootcamp
                                                            </label>
                                                            {console.log(
                                                                offerings
                                                            )}
                                                            {offerings.map(
                                                                (
                                                                    offering,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        class="input-btns"
                                                                    >
                                                                        <Field
                                                                            key={`{index}field`}
                                                                            // id="bootcampOfferings"
                                                                            type="text"
                                                                            name={`offerings[${index}]`}
                                                                            class="pubProfile-form-control-input"
                                                                            placeholder="Cool place to learn with cool guiders, fee incudes food!"
                                                                        />
                                                                        {offerings.length >
                                                                        2 ? (
                                                                            <button
                                                                                key={`${index}-`}
                                                                                class="btn btn-tertiary btn-sm"
                                                                                style={{
                                                                                    height:
                                                                                        '3rem',
                                                                                }}
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    remove(
                                                                                        index
                                                                                    )
                                                                                }
                                                                            >
                                                                                -
                                                                            </button>
                                                                        ) : null}
                                                                        <button
                                                                            key={`${index}+`}
                                                                            class="btn btn-primary btn-sm"
                                                                            style={{
                                                                                height:
                                                                                    '3rem',
                                                                            }}
                                                                            type="button"
                                                                            onClick={() =>
                                                                                push(
                                                                                    ''
                                                                                )
                                                                            }
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    );
                                                }}
                                            </FieldArray>

                                            <div class="pubProfile-form-control">
                                                <label
                                                    for="bootcampSite"
                                                    class="pubProfile-form-control-label"
                                                >
                                                    Email
                                                </label>
                                                <Field
                                                    id="bootcampMail"
                                                    type="text"
                                                    name="email"
                                                    class="pubProfile-form-control-input"
                                                    placeholder="johndoe@techcamp.com"
                                                />
                                            </div>
                                            <div class="pubProfile-form-control">
                                                <label
                                                    for="bootcampPhone"
                                                    class="pubProfile-form-control-label"
                                                >
                                                    Mobile Number
                                                </label>
                                                <Field
                                                    id="bootcampPhone"
                                                    type="text"
                                                    name="phone"
                                                    class="pubProfile-form-control-input"
                                                    placeholder="9108765432"
                                                />
                                            </div>
                                            <div class="bootcamp-form-content-basic-bottom">
                                                <button
                                                    type="submit"
                                                    class="btn btn-primary btn-md"
                                                    disabled={
                                                        !(
                                                            formik.isValid &&
                                                            formik.dirty
                                                        )
                                                    }
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                    <div
                        ref={courseTabContentRef}
                        class="bootcamp-form-content-tech"
                    ></div>
                </div>
            </div>
        </div>
    ) : (
        <h1> Loading !!!</h1>
    );
}

const mapStateToProps = (store) => ({
    loading: store.bootcamp.loading,
    bootcamp: store.bootcamp.bootcamp,
});

export default connect(mapStateToProps, { resetLoading, getBootcamp })(
    EditBootcamp
);
