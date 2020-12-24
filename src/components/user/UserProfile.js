import React, { createRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
// custom components
import ProfileForm from './ProfileForm';
import Enrollings from './enrollings/Enrollings';
import { getUserProfile } from '../../actions';

function UserProfile(props) {
    const { loading, loggedIn, user, getUserProfile, history } = props;

    useEffect(() => {
        if (!loggedIn) {
            history.replace('/login');
        }
        if (user !== null) {
            getUserProfile(user._id);
        }
    }, [loggedIn, user]);

    const profileTabRef = createRef();
    const enrolledTabRef = createRef();
    const tabs = [profileTabRef, enrolledTabRef];

    const profileTabContentRef = createRef();
    const enrolledTabContentRef = createRef();
    const tabContents = [profileTabContentRef, enrolledTabContentRef];

    const handleTabs = (tab) => {
        tabs.forEach((tab, index) => {
            if (tab.current.classList.contains('active')) {
                tab.current.classList.remove('active');
                console.log(`removed active from ${tab.current}`);
            }
        });
        tabContents.forEach((eachTabContent, index) => {
            eachTabContent.current.style.display = 'none';
        });
        if (tab === 'profileTab') {
            console.log(profileTabRef.current);
            profileTabRef.current.classList.add('active');
            profileTabContentRef.current.style.display = 'flex';
        }
        if (tab === 'enrolledTab') {
            console.log(enrolledTabRef.current);
            enrolledTabRef.current.classList.add('active');
            enrolledTabContentRef.current.style.display = 'flex';
        }
    };

    return !loading &&
        loggedIn &&
        (user.role === 'user' || user.role === 'admin') ? (
        <div class="main-conatiner-pubProfile">
            <div class="pubProfile-tabs">
                <div class="ui top attached tabular menu grid two column row">
                    <div
                        ref={profileTabRef}
                        id="profile-tab"
                        class="column active item pubProfile-tabs-profile"
                        onClick={() => handleTabs('profileTab')}
                    >
                        <h5 class="center pubProfile-tabs-text">Profile</h5>
                    </div>
                    <div
                        ref={enrolledTabRef}
                        id="enrolled-tab"
                        class="column item pubProfile-tabs-bootcamp"
                        onClick={() => handleTabs('enrolledTab')}
                    >
                        <h5 class="center pubProfile-tabs-text">Enrollings</h5>
                    </div>
                </div>
                <div class="ui bottom attached tab segment active pubProfile-tabContent">
                    <div
                        ref={profileTabContentRef}
                        class="pubProfile-tabContent-profile"
                    >
                        <ProfileForm />
                    </div>
                    <div
                        ref={enrolledTabContentRef}
                        class="pubProfile-tabContent-bootcamp"
                    >
                        <Enrollings />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Redirect to="/login" />
    );
}

const mapStateToProps = (store) => ({
    loading: store.auth.loading,
    loggedIn: store.auth.loggedIn,
    user: store.auth.user,
});

export default connect(mapStateToProps, { getUserProfile })(
    withRouter(UserProfile)
);
