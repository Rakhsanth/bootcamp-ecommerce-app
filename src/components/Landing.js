// react related imports
import React, { useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { connect } from 'react-redux';
// component imports
import CourseCard from './cards/homePage/CourseCard';
// actions imports
import { getTaggedBootcamps, getTaggedCourses, resetLoading } from '../actions';

const defaultTab = 'design';

function Landing(props) {
    const {
        resetLoading,
        taggedBootcamps,
        taggedCourses,
        taggedBootcampsCount,
        taggedCoursesCount,
        taggedBootcampsLoading,
        taggedCoursesLoading,
        taggedCoursesNextPage,
    } = props;

    const { history } = props;

    // action creators
    const { getTaggedBootcamps, getTaggedCourses } = props;

    const [activeCourseTab, setactiveCourseTab] = useState(defaultTab);
    const [activeBootcampTab, setactiveBootcampTab] = useState(defaultTab);
    const [taggedCourseIndex, settaggedCourseIndex] = useState({
        start: 0,
        end: 0,
    });
    const [taggedBootcampIndex, settaggedBootcampIndex] = useState({
        start: 0,
        end: 0,
    });

    const courseDesignTab = useRef();
    const courseDevelopmentTab = useRef();
    const courseDataScienceTab = useRef();
    const courseDigitalMarketingTab = useRef();
    const courseFinanceTab = useRef();

    const coursesLeftNav = useRef();
    const coursesRightNav = useRef();

    const bootcampDesignTab = useRef();
    const bootcampDevelopmentTab = useRef();
    const bootcampDataScienceTab = useRef();
    const bootcampDigitalMarketingTab = useRef();
    const bootcampFinanceTab = useRef();

    const isMobile = useMediaQuery({ query: '(max-width: 37.5em)' });
    const isTabletPortrait = useMediaQuery({ query: '(max-width: 56.25em)' });
    const isTabletLandscape = useMediaQuery({ query: '(max-width: 75em)' });
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 75em)' });

    useEffect(() => {
        courseDesignTab.current.classList.add('focus-tab');
        bootcampDesignTab.current.classList.add('focus-tab');
        getTaggedCourses(defaultTab);
        getTaggedBootcamps(defaultTab);
    }, [getTaggedBootcamps, getTaggedCourses]);

    useEffect(() => {
        settaggedCourseIndex({ start: 0, end: taggedCoursesCount });
        settaggedBootcampIndex({ start: 0, end: taggedBootcampsCount });
    }, [taggedBootcampsCount, taggedCoursesCount]);

    console.log(taggedCourseIndex);
    console.log(taggedBootcampIndex);

    const handleCourseTabs = (event, category) => {
        // To remove the focus
        if (activeCourseTab === 'design') {
            courseDesignTab.current.classList.remove('focus-tab');
        }
        if (activeCourseTab === 'development') {
            courseDevelopmentTab.current.classList.remove('focus-tab');
        }
        if (activeCourseTab === 'data science') {
            courseDataScienceTab.current.classList.remove('focus-tab');
        }
        if (activeCourseTab === 'digital marketing') {
            courseDigitalMarketingTab.current.classList.remove('focus-tab');
        }
        if (activeCourseTab === 'finance') {
            courseFinanceTab.current.classList.remove('focus-tab');
        }
        // To enable focus
        if (category === 'design') {
            courseDesignTab.current.classList.add('focus-tab');
        }
        if (category === 'development') {
            courseDevelopmentTab.current.classList.add('focus-tab');
        }
        if (category === 'data science') {
            courseDataScienceTab.current.classList.add('focus-tab');
        }
        if (category === 'digital marketing') {
            courseDigitalMarketingTab.current.classList.add('focus-tab');
        }
        if (category === 'finance') {
            courseFinanceTab.current.classList.add('focus-tab');
        }
        setactiveCourseTab(category);
        getTaggedCourses(
            category,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            false
        );
    };

    const handleBootcampTabs = (event, category) => {
        // To remove the focus
        if (activeBootcampTab === 'design') {
            bootcampDesignTab.current.classList.remove('focus-tab');
        }
        if (activeBootcampTab === 'development') {
            bootcampDevelopmentTab.current.classList.remove('focus-tab');
        }
        if (activeBootcampTab === 'data science') {
            bootcampDataScienceTab.current.classList.remove('focus-tab');
        }
        if (activeBootcampTab === 'digital marketing') {
            bootcampDigitalMarketingTab.current.classList.remove('focus-tab');
        }
        if (activeBootcampTab === 'finance') {
            bootcampFinanceTab.current.classList.remove('focus-tab');
        }
        // To enable focus
        if (category === 'design') {
            bootcampDesignTab.current.classList.add('focus-tab');
        }
        if (category === 'development') {
            bootcampDevelopmentTab.current.classList.add('focus-tab');
        }
        if (category === 'data science') {
            bootcampDataScienceTab.current.classList.add('focus-tab');
        }
        if (category === 'digital marketing') {
            bootcampDigitalMarketingTab.current.classList.add('focus-tab');
        }
        if (category === 'finance') {
            bootcampFinanceTab.current.classList.add('focus-tab');
        }
        setactiveBootcampTab(category);
        getTaggedBootcamps(category);
    };

    const handleCoursesLeftNavButton = () => {
        let tempStartIndex;
        if (isTabletPortrait) {
            tempStartIndex = taggedCourseIndex.start - 3;
            if (tempStartIndex < 0) {
                tempStartIndex = 0;
            }
        }
        if (isTabletLandscape) {
            tempStartIndex = taggedCourseIndex.start - 4;
            if (tempStartIndex < 0) {
                tempStartIndex = 0;
            }
        }
        if (isDesktopOrLaptop) {
            tempStartIndex = taggedCourseIndex.start - 5;
            if (tempStartIndex < 0) {
                tempStartIndex = 0;
            }
        }
        settaggedCourseIndex({ ...taggedCourseIndex, start: tempStartIndex });
    };
    const renderCoursesLeftNavButton = () => {
        if (taggedCourseIndex.start !== 0) {
            return (
                <button
                    ref={coursesLeftNav}
                    className="btn btn-secondary btn-circle btn-circle-lg home-categories-btn"
                    onClick={handleCoursesLeftNavButton}
                >
                    <svg className="btn-icon">
                        <use xlinkHref="img/sprite.svg#icon-chevron-left"></use>
                    </svg>
                </button>
            );
        }
    };
    const handleCoursesRightNavButton = () => {
        let tempStartIndex;
        if (isTabletPortrait) {
            tempStartIndex = taggedCourseIndex.start + 3;
            if (tempStartIndex >= taggedCoursesCount) {
                tempStartIndex = taggedCoursesCount - 3;
            }
        }
        if (isTabletLandscape) {
            tempStartIndex = taggedCourseIndex.start + 4;
            if (tempStartIndex >= taggedCoursesCount) {
                tempStartIndex = taggedCoursesCount - 4;
            }
        }
        if (isDesktopOrLaptop) {
            tempStartIndex = taggedCourseIndex.start + 5;
            if (tempStartIndex >= taggedCoursesCount) {
                tempStartIndex = taggedCoursesCount - 5;
            }
        }
        if (
            taggedCoursesNextPage !== null &&
            taggedCourses.length - taggedCourseIndex.start <= 5
        ) {
            resetLoading('taggedCourses');
            getTaggedCourses(
                activeCourseTab,
                null,
                null,
                null,
                taggedCoursesNextPage,
                null,
                null,
                null,
                null,
                true
            );
        }
        settaggedCourseIndex({ ...taggedCourseIndex, start: tempStartIndex });
    };
    const renderCoursesRightNavButton = () => {
        if (isTabletPortrait) {
            if (taggedCourseIndex.start + 3 < taggedCoursesCount) {
                return (
                    <button
                        ref={coursesRightNav}
                        className="btn btn-secondary btn-circle btn-circle-lg home-categories-btn"
                        onClick={handleCoursesRightNavButton}
                    >
                        <svg className="btn-icon">
                            <use xlinkHref="img/sprite.svg#icon-chevron-right"></use>
                        </svg>
                    </button>
                );
            }
        }
        if (isTabletLandscape) {
            if (taggedCourseIndex.start + 4 < taggedCoursesCount) {
                return (
                    <button
                        ref={coursesRightNav}
                        className="btn btn-secondary btn-circle btn-circle-lg home-categories-btn"
                        onClick={handleCoursesRightNavButton}
                    >
                        <svg className="btn-icon">
                            <use xlinkHref="img/sprite.svg#icon-chevron-right"></use>
                        </svg>
                    </button>
                );
            }
        }
        if (isDesktopOrLaptop) {
            if (taggedCourseIndex.start + 5 < taggedCoursesCount) {
                return (
                    <button
                        ref={coursesRightNav}
                        className="btn btn-secondary btn-circle btn-circle-lg home-categories-btn"
                        onClick={handleCoursesRightNavButton}
                    >
                        <svg className="btn-icon">
                            <use xlinkHref="img/sprite.svg#icon-chevron-right"></use>
                        </svg>
                    </button>
                );
            }
        }
    };

    const renderCourses = (
        isMobile,
        isTabletPortrait,
        isTabletLandscape,
        isDesktopOrLaptop
    ) => {
        if (taggedCoursesCount > 0) {
            if (isMobile) {
                return;
            }
            if (isTabletPortrait) {
                return;
            }
            if (isTabletLandscape) {
                const cardList = [];
                for (
                    let index = taggedCourseIndex.start;
                    index < taggedCourseIndex.start + 4 &&
                    index < taggedCoursesCount;
                    index++
                ) {
                    cardList.push(<CourseCard key={index} />);
                }
                return cardList;
            }
            if (isDesktopOrLaptop) {
                const cardList = [];
                for (
                    let index = taggedCourseIndex.start;
                    index < taggedCourseIndex.start + 5 &&
                    index < taggedCoursesCount;
                    index++
                ) {
                    console.log(taggedCourses);
                    if (!taggedCoursesLoading) {
                        const course = taggedCourses[index];
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
                        cardList.push(
                            <CourseCard
                                key={index}
                                courseId={_id}
                                image={picture}
                                author={author}
                                title={title}
                                description={description}
                                keyPointsList={contentList}
                                price={cost}
                                rating={averageRating}
                                userCount={ratings}
                            />
                        );
                    }
                }
                return cardList;
            }
        } else {
            return (
                <h2 className="center" style={{ marginTop: '10rem' }}>
                    No Courses yet on this category
                </h2>
            );
        }
    };

    // const handleCategoryCard = (event, category) => {
    //     console.log(category);
    //     getTaggedCourses(
    //         category,
    //         null,
    //         null,
    //         null,
    //         null,
    //         10,
    //         '-averageRating',
    //         history
    //     );
    // };

    return (
        <main className="main-conatiner-home">
            <section className="hero-section">
                <img
                    src="./img/hero-image.jpg"
                    alt="hero-image"
                    className="hero-section-img"
                />
            </section>
            <div id="category-tabs" className="category-tabs-courses">
                <Link
                    ref={courseDesignTab}
                    to="/"
                    id="course-design-tab"
                    className="category-tabs-courses-tab"
                    onClick={(event) => handleCourseTabs(event, 'design')}
                >
                    <span className="category-tabs-courses-tab-text">
                        Design
                    </span>
                </Link>
                <Link
                    ref={courseDevelopmentTab}
                    to="/"
                    id="course-development-tab"
                    className="category-tabs-courses-tab"
                    onClick={(event) => handleCourseTabs(event, 'development')}
                >
                    <span className="category-tabs-courses-tab-text">
                        Development
                    </span>
                </Link>
                <Link
                    ref={courseDataScienceTab}
                    to="/"
                    id="course-data-science-tab"
                    className="category-tabs-courses-tab"
                    onClick={(event) => handleCourseTabs(event, 'data science')}
                >
                    <span className="category-tabs-courses-tab-text">
                        Data Science
                    </span>
                </Link>
                <Link
                    ref={courseDigitalMarketingTab}
                    to="/"
                    id="course-digital-marketing-tab"
                    className="category-tabs-courses-tab"
                    onClick={(event) =>
                        handleCourseTabs(event, 'digital marketing')
                    }
                >
                    <span className="category-tabs-courses-tab-text">
                        Digital Marketing
                    </span>
                </Link>
                <Link
                    ref={courseFinanceTab}
                    to="/"
                    id="course-finance-tab"
                    className="category-tabs-courses-tab"
                    onClick={(event) => handleCourseTabs(event, 'finance')}
                >
                    <span className="category-tabs-courses-tab-text">
                        Finance
                    </span>
                </Link>
                <h4 className="category-tabs-courses-title">Courses</h4>
            </div>
            <div className="categories">
                {renderCoursesLeftNavButton()}
                {renderCourses(
                    isMobile,
                    isTabletPortrait,
                    isTabletLandscape,
                    isDesktopOrLaptop
                )}
                {renderCoursesRightNavButton()}
            </div>
            <div id="category-tabs" className="category-tabs-bootcamps">
                <Link
                    ref={bootcampDesignTab}
                    to="/"
                    id="bootcamp-design-tab"
                    className="category-tabs-courses-tab"
                    onClick={(event) => handleBootcampTabs(event, 'design')}
                >
                    <span className="category-tabs-courses-tab-text">
                        Design
                    </span>
                </Link>
                <Link
                    ref={bootcampDevelopmentTab}
                    to="/"
                    id="bootcamp-development-tab"
                    className="category-tabs-courses-tab"
                    onClick={(event) =>
                        handleBootcampTabs(event, 'development')
                    }
                >
                    <span className="category-tabs-courses-tab-text">
                        Development
                    </span>
                </Link>
                <Link
                    ref={bootcampDataScienceTab}
                    to="/"
                    id="bootcamp-data-science-tab"
                    className="category-tabs-courses-tab"
                    onClick={(event) =>
                        handleBootcampTabs(event, 'data science')
                    }
                >
                    <span className="category-tabs-courses-tab-text">
                        Data Science
                    </span>
                </Link>
                <Link
                    ref={bootcampDigitalMarketingTab}
                    to="/"
                    id="bootcamp-digital-marketing-tab"
                    className="category-tabs-courses-tab"
                    onClick={(event) =>
                        handleBootcampTabs(event, 'digital marketing')
                    }
                >
                    <span className="category-tabs-courses-tab-text">
                        Digital Marketing
                    </span>
                </Link>
                <Link
                    ref={bootcampFinanceTab}
                    to="/"
                    id="bootcamp-finance-tab"
                    className="category-tabs-courses-tab"
                    onClick={(event) => handleBootcampTabs(event, 'finance')}
                >
                    <span className="category-tabs-courses-tab-text">
                        Finance
                    </span>
                </Link>
                <h4 className="category-tabs-courses-title">Bootcamps</h4>
            </div>
            <div className="categories-bootcamps">
                {/* TO be populated by JS logic */}
                {/* {renderBootcamps(
                    isMobile,
                    isTabletPortrait,
                    isTabletLandscape,
                    isDesktopOrLaptop
                )} */}
            </div>
            <div className="top-catagories-container">
                <h3 className="h3-heading top-catagories-heading">
                    Top Categories
                </h3>
                <div className="top-catagories-cards">
                    <Link
                        to="/courseResults/design"
                        className="top-catagories-card"
                    >
                        <img
                            src="./img/courseImages/course.png"
                            alt=""
                            className="top-catagories-card-img"
                        />
                        <h5 className="top-catagories-card-title">Design</h5>
                    </Link>
                    <Link
                        to="/courseResults/development"
                        className="top-catagories-card"
                    >
                        <img
                            src="./img/courseImages/course.png"
                            alt=""
                            className="top-catagories-card-img"
                        />
                        <h5 className="top-catagories-card-title">
                            Development
                        </h5>
                    </Link>
                    <Link
                        to="/courseResults/data science"
                        className="top-catagories-card"
                    >
                        <img
                            src="./img/courseImages/course.png"
                            alt=""
                            className="top-catagories-card-img"
                        />
                        <h5 className="top-catagories-card-title">
                            Data Science
                        </h5>
                    </Link>
                    <Link
                        to="/courseResults/digital marketing"
                        className="top-catagories-card"
                    >
                        <img
                            src="./img/courseImages/course.png"
                            alt=""
                            className="top-catagories-card-img"
                        />
                        <h5 className="top-catagories-card-title">
                            Digital Marketing
                        </h5>
                    </Link>
                    <Link
                        to="/courseResults/finance"
                        className="top-catagories-card"
                    >
                        <img
                            src="./img/courseImages/course.png"
                            alt=""
                            className="top-catagories-card-img"
                        />
                        <h5 className="top-catagories-card-title">Finance</h5>
                    </Link>
                </div>
            </div>
        </main>
    );
}

const mapStateToProps = (store) => {
    return {
        taggedBootcampsLoading: store.taggedBootcamps.loading,
        taggedCoursesLoading: store.taggedCourses.loading,
        taggedBootcamps: store.taggedBootcamps.bootcamps,
        taggedBootcampsCount: store.taggedBootcamps.totalCount,
        taggedCourses: store.taggedCourses.courses,
        taggedCoursesCount: store.taggedCourses.totalCount,
        taggedBootcampsNextPage: store.taggedBootcamps.nextPage,
        taggedCoursesNextPage: store.taggedCourses.nextPage,
    };
};

export default connect(mapStateToProps, {
    getTaggedBootcamps,
    getTaggedCourses,
    resetLoading,
})(withRouter(Landing));
