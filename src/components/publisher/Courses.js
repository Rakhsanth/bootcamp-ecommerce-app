import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

// components
import CourseCardPublisher from '../cards/coursePage/CourseCardPublisher';
import CourseForm from './CourseForm';

// actions
import { getTaggedCourses } from '../../actions';

function Courses(props) {
    const { loading, courses, getTaggedCourses, bootcampId } = props;

    const [displayCourseForm, setdisplayCourseForm] = useState(false);
    const [displayCourseList, setdisplayCourseList] = useState(true);
    const [editCourseId, seteditCourseId] = useState(null);
    const [query, setquery] = useState(`bootcamp=${bootcampId}`);
    const [reRender, setreRender] = useState(false);

    useEffect(() => {
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
    }, [getTaggedCourses, loading, reRender]);

    const removeForm = () => {
        console.log('removal requested');
        setdisplayCourseForm(false);
    };

    const renderThisCourse = (courseId) => {
        if (courseId) {
            setdisplayCourseList(false);
            seteditCourseId(courseId);
        } else {
            console.log('render the list thing');
            setdisplayCourseList(true);
            seteditCourseId(courseId);
        }
    };

    const causeReRender = () => {
        console.log('causing re-render');
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
    };

    const renderCoursesOrForm = () => {
        if (displayCourseForm) {
            return (
                <CourseForm
                    bootcampId={bootcampId}
                    createOrEdit={'create'}
                    removeForm={removeForm}
                    causeReRender={causeReRender}
                />
            );
        } else {
            if (displayCourseList) {
                return !loading ? (
                    <div class="publisher-bootcamps-container">
                        {courses.length > 0 ? (
                            <Fragment>
                                {courses.map((course, index) => (
                                    <CourseCardPublisher
                                        key={index}
                                        id={course._id}
                                        image={course.picture}
                                        video={course.video}
                                        title={course.title}
                                        description={course.description}
                                        rating={
                                            course.averageRating
                                                ? course.averageRating
                                                : null
                                        }
                                        renderThisCourse={renderThisCourse}
                                        causeReRender={causeReRender}
                                    />
                                ))}
                            </Fragment>
                        ) : (
                            <h1>
                                You have not created courses for this bootcamp
                                yet !!!
                            </h1>
                        )}
                    </div>
                ) : (
                    <h1>Loading !!!</h1>
                );
            } else {
                if (editCourseId) {
                    return (
                        <CourseForm
                            bootcampId={bootcampId}
                            createOrEdit={'edit'}
                            courseId={editCourseId}
                            causeReRender={causeReRender}
                            removeForm={removeForm}
                            renderThisCourse={renderThisCourse}
                        />
                    );
                }
            }
        }
    };

    const renderAddButton = () => {
        if (displayCourseForm || !displayCourseList) {
            return (
                <button
                    class="btn btn-primary btn-md"
                    onClick={() => {
                        setdisplayCourseForm(false);
                        setdisplayCourseList(true);
                    }}
                >
                    {'<< Back'}
                </button>
            );
        } else {
            return (
                <button
                    class="btn btn-primary btn-center btn-circle pubBootcamp-create-btn"
                    onClick={() => setdisplayCourseForm(true)}
                >
                    <svg class="pubBootcamp-create-btn-icon">
                        <use xlinkHref="img/sprite.svg#icon-plus-circle" />
                    </svg>
                </button>
            );
        }
    };

    return (
        <Fragment>
            {renderCoursesOrForm()}
            {renderAddButton()}
        </Fragment>
    );
}

const mapStateToProps = (store) => ({
    loading: store.taggedCourses.loading,
    courses: store.taggedCourses.courses,
});

export default connect(mapStateToProps, { getTaggedCourses })(Courses);
