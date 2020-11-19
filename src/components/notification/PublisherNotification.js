import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// actions
import { resetNotificationCount } from '../../actions';
// API calls
import { getProfileNotifications, deleteNotification } from '../../api';
import PublisherNotifyCard from '../cards/notificationPage/PublisherNotifyCard';

function PublisherNotification(props) {
    const { resetNotificationCount, notificationCount, user } = props;
    const {
        match: {
            params: { profileId },
        },
    } = props;
    console.log(props);

    const [notifications, setnotifications] = useState([]);

    const getProfileDetailsUtil = async () => {
        const allNotifications = await getProfileNotifications(profileId);
        if (allNotifications) {
            setnotifications(allNotifications);
        }
    };

    console.log(notifications);

    useEffect(() => {
        console.log(notificationCount);
        resetNotificationCount(profileId);
        getProfileDetailsUtil();
    }, [notificationCount]);

    const deleteNotificationUtil = async (userId, notificationId) => {
        const remainingNotifications = await deleteNotification(
            userId,
            notificationId
        );
        setnotifications(remainingNotifications);
    };
    // Used for reverse props passing for deleting a notification from the child card
    const handleNotificationDelete = (id) => {
        deleteNotificationUtil(user._id, id);
    };

    return (
        <div class="main-conatiner-pubProfile">
            <div
                class="ui bottom attached tab segment active pubProfile-tabContent"
                style={{ maxHeight: '80vh', overflowY: 'auto' }}
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
                    {notifications && notifications.length !== 0 ? (
                        notifications.map((notification, index) => (
                            <PublisherNotifyCard
                                key={notification._id}
                                notificationId={notification._id}
                                title={notification.title}
                                description={notification.description}
                                handleNotificationDelete={
                                    handleNotificationDelete
                                }
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
    user: store.auth.user,
    notificationCount: store.notification.count,
});
export default connect(mapStateToProps, { resetNotificationCount })(
    withRouter(PublisherNotification)
);
