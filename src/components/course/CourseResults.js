import React, { Fragment, useState, createRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// actions
import { getTaggedCourses } from '../../actions';
import CourseResult from '../cards/coursesPage/CourseResult';

const dropDownToggle = (event) => {
    const dropdownIcon = event.target.children[1];
    const dropdownElement = event.target.nextElementSibling;
    if (dropdownElement.classList.contains('dropdown-close')) {
        dropdownElement.classList.remove('dropdown-close');
        dropdownElement.classList.add('dropdown-open');
        dropdownIcon.style.transform = 'rotate(180deg)';
    } else if (dropdownElement.classList.contains('dropdown-open')) {
        dropdownElement.classList.remove('dropdown-open');
        dropdownElement.classList.add('dropdown-close');
        dropdownIcon.style.transform = 'none';
    }
};

function CourseResults(props) {
    console.log(props);
    const {
        location: { pathname, search },
        history,
        getTaggedCourses,
    } = props;
    const { loading, totalCount, courses } = props;

    const [showFilter, setshowFilter] = useState(true);
    const [currentPage, setcurrentPage] = useState(1);
    const [currentBoundaries, setcurrentBoundaries] = useState({
        start: 1,
        end: 10,
    });
    const [sortResult, setsortResult] = useState('-averageRating');
    const [filterQuery, setfilterQuery] = useState(null);

    const filterContainer = createRef();
    const filterResults = createRef();

    let totalPages;
    if (!loading) {
        totalPages = Math.ceil(totalCount / 10);
        // console.log(totalPages);
    }

    const category =
        pathname.split('/')[2] !== undefined ? pathname.split('/')[2] : null;

    useEffect(() => {
        getTaggedCourses(
            category,
            null,
            null,
            null,
            null,
            10,
            sortResult,
            null,
            null,
            false
        );
    }, [getTaggedCourses, pathname]);
    useEffect(() => {
        if (totalCount !== 0) {
            if (showFilter) {
                filterContainer.current.style.width = '100%';
                filterContainer.current.style.height = '100%';
                filterContainer.current.style.opacity = '1';
                filterContainer.current.style.gridColumn =
                    'col-start 1 / col-end 2';
                filterResults.current.style.gridColumn = 'col-start 3 / -1';
            } else {
                filterContainer.current.style.width = '0.1px';
                filterContainer.current.style.height = '0.1px';
                filterContainer.current.style.opacity = '0';
                filterContainer.current.style.gridColumn =
                    'col-start 1 / col-start 1';
                filterResults.current.style.gridColumn = 'col-start 1 / -1';
            }
        }
    }, [totalCount, showFilter]);

    const toggleFilter = () => {
        setshowFilter(!showFilter);
    };

    const levelCheckboxOptions = [
        { key: 'Beginner', value: '[eq]=beginner' },
        { key: 'Intermediate', value: '[eq]=intermediate' },
        { key: 'Advanced', value: '[eq]=advanced' },
    ];
    const lengthCheckboxOptions = [
        {
            key: '1 - 3 months',
            value: '[gte]=1&[lte]=3',
        },
        {
            key: '3 - 6 months',
            value: '[gte]=4&[lte]=6',
        },
        {
            key: '6+ months',
            value: `[gte]=7&[lte]=${Number.MAX_SAFE_INTEGER}`,
        },
    ];
    const sortInitialValues = {
        sortBy: '-averageRating', // - is used for ordering in mongoDB query
    };
    const checkBoxesInitialValues = {
        selectLevel: [],
        selectLength: [],
    };
    const sortValidationSchema = Yup.object({
        sortBy: Yup.string().optional(),
    });
    const filterValidationSchema = Yup.object({
        selectLevel: Yup.string().optional(),
        selectLength: Yup.string().optional(),
    });
    const onSubmitSort = (values) => {
        console.log(values);

        setsortResult(values.sortBy);
        getTaggedCourses(
            category,
            null,
            null,
            null,
            null,
            10,
            values.sortBy,
            null,
            filterQuery,
            false
        );
    };
    const onSubmitCheckboxes = (values) => {
        console.log(values);

        let selectLevelQuery = null;
        let selectLengthQuery = null;

        if (values.selectLevel !== undefined) {
            selectLevelQuery = values.selectLevel.join('&requiredSkillSet');
            if (values.selectLevel.length > 1) {
                selectLevelQuery = selectLevelQuery.replaceAll(
                    '[eq',
                    (match) => '[in'
                );
            }
        }
        if (values.selectLength !== undefined) {
            const selectLengthQueryList = values.selectLength.map((each) => {
                if (each.includes('&')) {
                    each = each.replace('&', (match) => '&duration');
                    return each;
                }
                return each;
            });
            selectLengthQuery = selectLengthQueryList.join('&duration');
        }

        if (selectLevelQuery.length !== 0) {
            selectLevelQuery = 'requiredSkillSet' + selectLevelQuery;
        }
        if (selectLengthQuery.length !== 0) {
            selectLengthQuery = 'duration' + selectLengthQuery;
        }

        let query;
        if (selectLevelQuery.length !== 0) {
            query = selectLevelQuery + '&' + selectLengthQuery;
        } else {
            query = selectLengthQuery;
        }
        console.log(query);

        setfilterQuery(query);
        getTaggedCourses(
            category,
            null,
            null,
            null,
            null,
            10,
            sortResult,
            null,
            query,
            false
        );
    };

    const handlePrev = () => {
        setcurrentBoundaries({
            start: currentBoundaries.start - 10,
            end: currentBoundaries.end - 10,
        });
    };
    const handlePageNumber = (pageNum) => {
        setcurrentPage(pageNum);
        getTaggedCourses(
            category,
            null,
            null,
            null,
            pageNum,
            10,
            sortResult,
            null,
            filterQuery,
            false
        );
    };
    const renderPageNumbers = () => {
        let pageNumbers = [];
        for (
            let pageNum = currentBoundaries.start;
            pageNum <= currentBoundaries.end && pageNum <= totalPages;
            pageNum++
        ) {
            let pageNumber;
            if (pageNum === currentPage) {
                pageNumber = (
                    <a
                        key={pageNum}
                        className="courses-pagination-pagenum focus-pagenum"
                        onClick={() => handlePageNumber(pageNum)}
                    >
                        {pageNum}
                    </a>
                );
            } else {
                pageNumber = (
                    <a
                        key={pageNum}
                        className="courses-pagination-pagenum"
                        onClick={() => handlePageNumber(pageNum)}
                    >
                        {pageNum}
                    </a>
                );
            }
            pageNumbers.push(pageNumber);
        }
        return pageNumbers;
    };
    const handleNext = () => {
        setcurrentBoundaries({
            start: currentBoundaries.start + 10,
            end: currentBoundaries.end + 10,
        });
    };

    return (
        <div className="main-conatiner-courses">
            <div className="search-title">
                <h2 className="h2-heading">
                    {totalCount} results for “unreal game programming”
                </h2>
            </div>
            <div className="filter-sort">
                <button
                    type="button"
                    className="btn btn-secondary btn-center btn-md filter-sort-btn"
                    onClick={toggleFilter}
                >
                    <svg className="filter-sort-btn-icon">
                        <use xlinkHref="img/sprite.svg#icon-filter"></use>
                    </svg>
                    <span className="filter-sort-btn-text">Filter</span>
                </button>
                <Formik
                    initialValues={sortInitialValues}
                    validationSchema={sortValidationSchema}
                    onSubmit={onSubmitSort}
                    validate={onSubmitSort}
                >
                    {(formikSort) => {
                        // console.log(formikSort);
                        return (
                            <Form>
                                <Field
                                    as="select"
                                    name="sortBy"
                                    id="sortCourses"
                                    className="ui dropdown filter-sort-sort"
                                >
                                    <option value="-averageRating">
                                        Highest Rated
                                    </option>

                                    <option value="-createdAt">Newest</option>
                                </Field>
                            </Form>
                        );
                    }}
                </Formik>

                <span className="filter-result-count">10,000 results</span>
            </div>
            <Formik
                initialValues={checkBoxesInitialValues}
                validationSchema={filterValidationSchema}
                onSubmit={onSubmitCheckboxes}
                validate={onSubmitCheckboxes}
            >
                {(formikFilter) => {
                    // console.log(formikFilter);
                    return (
                        <Form
                            ref={filterContainer}
                            className="filter-criteria-container"
                        >
                            <div className="filter-criteria">
                                <div
                                    className="filter-criteria-top"
                                    onClick={(event) => dropDownToggle(event)}
                                >
                                    <h5 className="filter-criteria-top-title">
                                        Level
                                    </h5>
                                    <svg className="filter-criteria-top-icon">
                                        <use xlinkHref="img/sprite.svg#icon-circle-down"></use>
                                    </svg>
                                </div>
                                <div className="filter-dropdown dropdown-close">
                                    {levelCheckboxOptions.map(
                                        (option, index) => (
                                            <div
                                                key={index}
                                                className="input-group"
                                            >
                                                <Field
                                                    type="checkbox"
                                                    name="selectLevel"
                                                    id={option.key}
                                                    value={option.value}
                                                    className="filter-criteria-checkbox"
                                                />
                                                <label
                                                    htmlFor={option.key}
                                                    className="input-group-label-checkbox"
                                                >
                                                    <svg className="input-group-label-checkbox-check">
                                                        <use xlinkHref="img/sprite.svg#icon-check"></use>
                                                    </svg>
                                                    <span>{option.key}</span>
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="filter-criteria">
                                <div
                                    className="filter-criteria-top"
                                    onClick={(event) => dropDownToggle(event)}
                                >
                                    <h5 className="filter-criteria-top-title">
                                        Length
                                    </h5>
                                    <svg className="filter-criteria-top-icon">
                                        <use xlinkHref="img/sprite.svg#icon-circle-down"></use>
                                    </svg>
                                </div>
                                <div className="filter-dropdown dropdown-close">
                                    {lengthCheckboxOptions.map(
                                        (option, index) => (
                                            <div
                                                key={index}
                                                className="input-group"
                                            >
                                                <Field
                                                    type="checkbox"
                                                    name="selectLength"
                                                    id={option.key}
                                                    value={option.value}
                                                    className="filter-criteria-checkbox"
                                                />
                                                <label
                                                    htmlFor={option.key}
                                                    className="input-group-label-checkbox"
                                                >
                                                    <svg className="input-group-label-checkbox-check">
                                                        <use xlinkHref="img/sprite.svg#icon-check"></use>
                                                    </svg>
                                                    <span>{option.key}</span>
                                                </label>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>

            <div ref={filterResults} className="filter-results-container">
                {totalCount !== 0 ? (
                    courses.map((course, index) => {
                        const {
                            _id,
                            picture,
                            author,
                            title,
                            description,
                            contentList,
                            averageRating,
                            ratings,
                            cost,
                        } = course;
                        return (
                            <CourseResult
                                key={index}
                                courseId={_id}
                                image={picture}
                                title={title}
                                description={description}
                                author={author}
                                rating={averageRating}
                                ratingCount={ratings}
                                price={cost}
                                keyPointsList={contentList}
                            />
                        );
                    })
                ) : (
                    <h2>Nothing matches the current filter</h2>
                )}
                {/* {courses.map((course, index) => (
                            <CourseResult key={index} />
                        ))} */}
            </div>

            <div className="courses-pagination">
                {currentBoundaries.start !== 1 ? (
                    <button
                        className="btn btn-secondary btn-circle btn-circle-sm"
                        onClick={handlePrev}
                    >
                        <svg className="btn-icon">
                            <use xlinkHref="img/sprite.svg#icon-chevron-left"></use>
                        </svg>
                    </button>
                ) : null}
                {renderPageNumbers()}
                {currentBoundaries.end < totalPages ? (
                    <button
                        className="btn btn-secondary btn-circle btn-circle-sm"
                        onClick={handleNext}
                    >
                        <svg className="btn-icon">
                            <use xlinkHref="img/sprite.svg#icon-chevron-right"></use>
                        </svg>
                    </button>
                ) : null}

                <span className="courses-pagination-text">
                    Total pages : {totalPages}
                </span>
            </div>
        </div>
    );
}

const mapStateToProps = (store) => {
    return {
        loading: store.taggedCourses.loading,
        totalCount: store.taggedCourses.totalCount,
        courses: store.taggedCourses.courses,
    };
};

export default connect(mapStateToProps, { getTaggedCourses })(
    withRouter(CourseResults)
);
