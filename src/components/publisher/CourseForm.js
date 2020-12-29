import React, { createRef, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import Moment from 'react-moment';
// Datepicker with styles
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// api calls
import { createEditCourse } from '../../api';

// custom utils
import {
    validateImageFileSize,
    validateVideoFileSize,
    validateMobileNumber,
} from '../utils/utilFunctions';

// actions
import { resetLoading, getTaggedCourses, getCourse } from '../../actions';

const customDatePickerStyle = {
    marginBottom: '1rem',
    height: '3rem',
    outline: 'none',
    borderRadius: '0.5rem',
    textIndent: '1rem',
    border: '1px solid #989586',
};

function CourseForm(props) {
    const {
        history,
        loading,
        course,
        removeForm,
        resetLoading,
        getTaggedCourses,
        getCourse,
        causeReRender,
        bootcampId,
        createOrEdit,
        courseId,
    } = props;

    let img = 'no-photo.jpg';

    let query = `bootcamp=${bootcampId}`;

    useEffect(() => {
        if (createOrEdit === 'edit') {
            getCourse(courseId);
        }
    }, [getCourse]);

    // const initialValues = formikInit;
    let initialValues = {
        image: '',
        video: '',
        title: '',
        category: 'development',
        cost: '',
        author: '',
        maxStudentsAllowed: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 6),
        requirementDescription: '',
        requiredSkillSet: 'beginner',
        contentList: [''],
        basicRequirements: [''],
    };

    if (createOrEdit === 'edit') {
        initialValues = {
            image: course && course.image !== undefined ? course.image : '',
            video: course && course.video !== undefined ? course.video : '',
            title: course && course.title !== undefined ? course.title : '',
            category:
                course && course.category !== undefined
                    ? course.category
                    : 'development',
            cost: course && course.cost !== undefined ? course.cost : '',
            author: course && course.author !== undefined ? course.author : '',
            maxStudentsAllowed:
                course && course.maxStudentsAllowed !== undefined
                    ? course.maxStudentsAllowed
                    : '',
            description:
                course && course.description !== undefined
                    ? course.description
                    : '',
            startDate:
                course && course.startDate !== undefined
                    ? new Date(course.startDate)
                    : new Date(),
            endDate:
                course && course.endDate !== undefined
                    ? new Date(course.endDate)
                    : new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 6),
            requirementDescription:
                course && course.requirementDescription !== undefined
                    ? course.requirementDescription
                    : '',
            requiredSkillSet:
                course && course.requiredSkillSet !== undefined
                    ? course.requiredSkillSet
                    : 'beginner',
            contentList:
                course && course.contentList.length !== 0
                    ? course.contentList
                    : [''],
            basicRequirements:
                course && course.basicRequirements.length !== 0
                    ? course.basicRequirements
                    : [''],
        };
    }
    const validateContentListLength = (values) => {
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
        video: Yup.mixed().test(
            'testFileSize',
            'Please provide video less than 100 MB',
            (value) => validateVideoFileSize(value, 100)
        ),
        title: Yup.string().required('Course title is mandatory'),
        description: Yup.string()
            .max(500, 'Please provide description less than 500 characters')
            .required('Bootcamp description is mandatory'),
        requirementDescription: Yup.string()
            .max(500, 'Please provide description less than 3500 characters')
            .required('Bootcamp description is mandatory'),
        requiredSkillSet: Yup.string().required(
            'please choose a skillset needed for this course'
        ),
        maxStudentsAllowed: Yup.number().required(
            'Plase provide no of students allowed for this course'
        ),
        startDate: Yup.date().required('this date is mandatory'),
        endDate: Yup.date()
            .min(Yup.ref('startDate'))
            .required(
                'this date is mandatory and it should be greated that start date'
            ),
        author: Yup.string().optional(),
        category: Yup.string().required('Please choose a category'),
        cost: Yup.number().required(
            'please provide cost of this course in INR'
        ),
        contentList: Yup.array().test(
            'offeringsLengthTest',
            'Please provide atleast 2 offerings',
            (values) => validateContentListLength(values)
        ),
        basicRequirements: Yup.array().test(
            'basicRequirementsLengthTest',
            'Please provide atleast 2 requirements',
            (values) => validateContentListLength(values)
        ),
    });

    const onSubmit = async (values, submitProps) => {
        if (createOrEdit === 'create') {
            await createEditCourse(values, 'create', null, bootcampId);
        } else {
            await createEditCourse(values, 'edit', courseId);
        }
        getTaggedCourses(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            query,
            null
        );
        removeForm();
        resetLoading('taggedCourses');
    };

    return (
        <div class="main-conatiner-bootcampForm">
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
                                <div class="bootcamp-form-content-basic">
                                    <div class="bootcamp-form-content-basic-picture">
                                        <img
                                            src={
                                                img !== 'no-photo.jpg'
                                                    ? img
                                                    : '/bootcamp_logo.jpg'
                                            }
                                            alt=""
                                            class="pubProfile-tabContent-profile-image-img"
                                        />
                                        <label
                                            for="course-picture"
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
                                                        id="course-picture"
                                                        name="image"
                                                        type="file"
                                                        class="pubProfile-form-control-fileInput"
                                                        onChange={(event) => {
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
                                    <div class="bootcamp-form-content-basic-picture">
                                        <label
                                            for="course-video"
                                            class="btn btn-primary pubProfile-form-control-label text-center label-btn"
                                        >
                                            Upload video
                                        </label>
                                        <Field>
                                            {(fieldProps) => {
                                                const {
                                                    form: { setFieldValue },
                                                } = fieldProps;
                                                return (
                                                    <input
                                                        id="course-video"
                                                        name="video"
                                                        type="file"
                                                        class="pubProfile-form-control-fileInput"
                                                        onChange={(event) => {
                                                            setFieldValue(
                                                                'video',
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
                                                for="course-title"
                                                class="pubProfile-form-control-label"
                                            >
                                                Title
                                            </label>
                                            <Field
                                                id="course-title"
                                                type="text"
                                                name="title"
                                                class="pubProfile-form-control-input"
                                                placeholder="Tech Pllayground"
                                            />
                                        </div>
                                        <div class="pubProfile-form-control">
                                            <label
                                                for="description"
                                                class="pubProfile-form-control-label"
                                            >
                                                description
                                            </label>
                                            <Field
                                                id="description"
                                                type="text"
                                                name="description"
                                                class="pubProfile-form-control-input"
                                                placeholder="Tamil Nadu"
                                            />
                                        </div>
                                        <div class="pubProfile-form-control">
                                            <label
                                                for="requirement-description"
                                                class="pubProfile-form-control-label"
                                            >
                                                Requirement description
                                            </label>
                                            <Field
                                                id="requirement-description"
                                                type="text"
                                                name="requirementDescription"
                                                class="pubProfile-form-control-input"
                                            />
                                        </div>
                                        <div class="pubProfile-form-control">
                                            <label
                                                for="maxStudentsAllowed"
                                                class="pubProfile-form-control-label"
                                            >
                                                Max Students Allowed
                                            </label>
                                            <Field
                                                id="maxStudentsAllowed"
                                                type="text"
                                                name="maxStudentsAllowed"
                                                class="pubProfile-form-control-input"
                                            />
                                        </div>
                                        <div class="pubProfile-form-control">
                                            <label
                                                for="requiredSkillSet"
                                                class="pubProfile-form-control-label"
                                            >
                                                Required skill set for you
                                                course
                                            </label>
                                            <Field
                                                as="select"
                                                name="requiredSkillSet"
                                                class="ui compact selection dropdown map-select"
                                            >
                                                <option value="beginner">
                                                    Beginner
                                                </option>
                                                <option value="intermediate">
                                                    Intermediate
                                                </option>
                                                <option value="advanced">
                                                    Advanced
                                                </option>
                                                <i class="dropdown icon map-select-icon"></i>
                                            </Field>
                                        </div>
                                        <div class="pubProfile-form-control">
                                            <label
                                                for="requiredSkillSet"
                                                class="pubProfile-form-control-label"
                                            >
                                                Category of the course
                                            </label>
                                            <Field
                                                as="select"
                                                name="category"
                                                class="ui compact selection dropdown map-select"
                                            >
                                                <option value="development">
                                                    Development
                                                </option>
                                                <option value="design">
                                                    Design
                                                </option>
                                                <option value="data science">
                                                    Data science
                                                </option>
                                                <option value="digital marketing">
                                                    Digital marketing
                                                </option>
                                                <option value="finance">
                                                    Finance
                                                </option>
                                                <i class="dropdown icon map-select-icon"></i>
                                            </Field>
                                        </div>
                                        <div class="pubProfile-form-control">
                                            <label
                                                for="start-date"
                                                class="pubProfile-form-control-label"
                                            >
                                                Start Date
                                            </label>
                                            <Field
                                                name="startDate"
                                                class="pubProfile-form-control-input"
                                            >
                                                {(fieldProps) => {
                                                    const {
                                                        field,
                                                        form,
                                                    } = fieldProps;
                                                    const {
                                                        setFieldValue,
                                                    } = form;
                                                    const { value } = field;
                                                    return (
                                                        <DatePicker
                                                            style={
                                                                customDatePickerStyle
                                                            }
                                                            id="start-date"
                                                            selected={value}
                                                            onChange={(val) =>
                                                                setFieldValue(
                                                                    'startDate',
                                                                    val
                                                                )
                                                            }
                                                            minDate={new Date()}
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </div>
                                        <div class="pubProfile-form-control">
                                            <label
                                                for="end-date"
                                                class="pubProfile-form-control-label"
                                            >
                                                End Date
                                            </label>
                                            <Field
                                                name="endDate"
                                                class="pubProfile-form-control-input"
                                            >
                                                {(fieldProps) => {
                                                    const {
                                                        field,
                                                        form,
                                                    } = fieldProps;
                                                    const {
                                                        setFieldValue,
                                                    } = form;
                                                    const { value } = field;
                                                    return (
                                                        <DatePicker
                                                            style={
                                                                customDatePickerStyle
                                                            }
                                                            id="end-date"
                                                            selected={value}
                                                            onChange={(val) =>
                                                                setFieldValue(
                                                                    'endDate',
                                                                    val
                                                                )
                                                            }
                                                            minDate={
                                                                new Date(
                                                                    new Date(
                                                                        formik.values.startDate
                                                                    ).valueOf() +
                                                                        1000 *
                                                                            60 *
                                                                            60 *
                                                                            24 *
                                                                            6
                                                                )
                                                            }
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </div>
                                        <div class="pubProfile-form-control">
                                            <label
                                                for="author"
                                                class="pubProfile-form-control-label"
                                            >
                                                Author
                                            </label>
                                            <Field
                                                id="author"
                                                type="text"
                                                name="author"
                                                class="pubProfile-form-control-input"
                                            />
                                        </div>
                                        <div class="pubProfile-form-control">
                                            <label
                                                for="cost"
                                                class="pubProfile-form-control-label"
                                            >
                                                Cost
                                            </label>
                                            <Field
                                                id="cost"
                                                type="number"
                                                name="cost"
                                                class="pubProfile-form-control-input"
                                            />
                                        </div>
                                        <FieldArray name="contentList">
                                            {(fieldArrayProps) => {
                                                const {
                                                    push,
                                                    remove,
                                                    form: {
                                                        values: { contentList },
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
                                                            course
                                                        </label>
                                                        {console.log(
                                                            contentList
                                                        )}
                                                        {contentList.map(
                                                            (
                                                                content,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    class="input-btns"
                                                                >
                                                                    <Field
                                                                        key={`{index}field`}
                                                                        // id="bootcampOfferings"
                                                                        type="text"
                                                                        name={`contentList[${index}]`}
                                                                        class="pubProfile-form-control-input"
                                                                        placeholder="Cool place to learn with cool guiders, fee incudes food!"
                                                                    />
                                                                    {contentList.length >
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
                                        <FieldArray name="basicRequirements">
                                            {(fieldArrayProps) => {
                                                const {
                                                    push,
                                                    remove,
                                                    form: {
                                                        values: {
                                                            basicRequirements,
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
                                                            course
                                                        </label>
                                                        {console.log(
                                                            basicRequirements
                                                        )}
                                                        {basicRequirements.map(
                                                            (
                                                                requirements,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                    class="input-btns"
                                                                >
                                                                    <Field
                                                                        key={`{index}field`}
                                                                        // id="bootcampOfferings"
                                                                        type="text"
                                                                        name={`basicRequirements[${index}]`}
                                                                        class="pubProfile-form-control-input"
                                                                        placeholder="Cool place to learn with cool guiders, fee incudes food!"
                                                                    />
                                                                    {basicRequirements.length >
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
                                    </div>

                                    <div class="bootcamp-form-content-basic-bottom">
                                        <button
                                            // type="button"
                                            class="btn btn-primary btn-md"
                                            disabled={
                                                !(
                                                    createOrEdit === 'create' ||
                                                    (createOrEdit === 'edit' &&
                                                        formik.dirty &&
                                                        formik.isValid)
                                                )
                                            }
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

const mapStateTopProps = (store) => ({
    loading: store.course.loading,
    course: store.course.course,
});

export default connect(mapStateTopProps, {
    resetLoading,
    getTaggedCourses,
    getCourse,
})(withRouter(CourseForm));
