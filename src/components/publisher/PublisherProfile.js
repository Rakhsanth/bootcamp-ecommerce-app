import React, { createRef, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pusher from 'pusher-js';
// components
import BankForm from './BankForm';
import Bootcamps from './Bootcamps';
import ProfileForm from './ProfileForm';

// Config values
import { pusherApiKey, pusherCluster } from '../../config/config';

function PublisherProfile(props) {
    const pusher = new Pusher(pusherApiKey, {
        cluster: pusherCluster,
    });

    const channel = pusher.subscribe('courses');
    channel.bind('updated', function (data) {
        console.log(JSON.stringify(data));
    });

    const { userType } = props;

    const profileTabRef = createRef();
    const bankTabRef = createRef();
    const bootcampTabRef = createRef();
    const tabs = [profileTabRef, bankTabRef, bootcampTabRef];

    const profileTabContentRef = createRef();
    const bankTabContentRef = createRef();
    const bootcampTabContentRef = createRef();
    const tabContents = [
        profileTabContentRef,
        bankTabContentRef,
        bootcampTabContentRef,
    ];

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
        if (tab === 'bankTab') {
            console.log(bankTabRef.current);
            bankTabRef.current.classList.add('active');
            bankTabContentRef.current.style.display = 'flex';
        }
        if (tab === 'bootcampTab') {
            console.log(bootcampTabRef.current);
            bootcampTabRef.current.classList.add('active');
            bootcampTabContentRef.current.style.display = 'flex';
        }
    };

    return userType === 'publisher' || userType === 'admin' ? (
        <div class="main-conatiner-pubProfile">
            <div class="pubProfile-tabs">
                <div class="ui top attached tabular menu grid three column row">
                    <div
                        ref={profileTabRef}
                        id="profile-tab"
                        class="column active item pubProfile-tabs-profile"
                        onClick={() => handleTabs('profileTab')}
                    >
                        <h5 class="center pubProfile-tabs-text">Profile</h5>
                    </div>
                    <div
                        ref={bankTabRef}
                        id="bank-tab"
                        class="column item pubProfile-tabs-bankDT"
                        onClick={() => handleTabs('bankTab')}
                    >
                        <h5 class="center pubProfile-tabs-text">Details</h5>
                    </div>
                    <div
                        ref={bootcampTabRef}
                        id="bootcamp-tab"
                        class="column item pubProfile-tabs-bootcamp"
                        onClick={() => handleTabs('bootcampTab')}
                    >
                        <h5 class="center pubProfile-tabs-text">Bootcamps</h5>
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
                        ref={bankTabContentRef}
                        class="pubProfile-tabContent-bankDT"
                    >
                        <BankForm />
                    </div>
                    <div
                        ref={bootcampTabContentRef}
                        class="pubProfile-tabContent-bootcamp"
                    >
                        <Bootcamps />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Redirect to="/login" />
    );
}

const mapStateToProps = (store) => ({
    userType: store.auth.user.role,
});

export default connect(mapStateToProps)(PublisherProfile);
