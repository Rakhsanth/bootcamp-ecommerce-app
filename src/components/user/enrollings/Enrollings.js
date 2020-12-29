import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// redux related
import { connect } from 'react-redux';
import { getUserProfile } from '../../../actions';
// Api calls
import { createOrEditProfileDetails } from '../../../api';
// custom components
import EnrolledCard from './EnrolledCard';

function Enrollings(props) {
    const { isLoggedIn, user, profile, history, getUserProfile } = props;
    console.log(props);

    useEffect(() => {
        if (!isLoggedIn) {
            history.replace('/login');
        }
    }, [isLoggedIn, user]);

    // Used for reverse props passing for deleting a notification from the child card
    const endCourse = async (courseId) => {
        const enrolledCourses = profile.enrolledCourses.filter(
            (course) => course.courseId !== courseId
        );
        await createOrEditProfileDetails(profile._id, 'edit', {
            enrolledCourses,
        });
        await getUserProfile(user._id);
    };

    return (
        <div class="main-conatiner-pubProfile">
            <div
                class="ui bottom attached tab segment active pubProfile-tabContent"
                style={{ maxHeight: '80vh', width: '90vw', overflowY: 'auto' }}
            >
                <div
                    class="pubProfile-tabContent-profile"
                    style={{
                        width: '90%',
                        height: '95%',
                        paddingBottom: '1rem',
                        // overflowY: 'scroll',
                    }}
                >
                    {profile && profile.enrolledCourses.length !== 0 ? (
                        profile.enrolledCourses.map((course, index) => (
                            <EnrolledCard
                                key={course._id}
                                courseId={course.courseId}
                                title={course.title}
                                description={course.description}
                                endCourse={endCourse}
                            />
                        ))
                    ) : (
                        <h1>No new notifications yet !!!</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (store) => ({
    isLoggedIn: store.auth.loggedIn,
    user: store.auth.user,
    profile: store.profile.profile,
});

export default connect(mapStateToProps, { getUserProfile })(
    withRouter(Enrollings)
);
