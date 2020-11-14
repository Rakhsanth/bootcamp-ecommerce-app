import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// actions
import { resetNotificationCount } from '../../actions';

function UserNotification(props) {
    const { resetNotificationCount, notificationCount } = props;
    const {
        match: {
            params: { profileId },
        },
    } = props;

    console.log(props);

    useEffect(() => {
        console.log(notificationCount);
        resetNotificationCount(profileId);
    }, [notificationCount]);

    return <div></div>;
}

const mapStateToProps = (store) => ({
    notificationCount: store.notification.count,
});

export default connect(mapStateToProps, { resetNotificationCount })(
    UserNotification
);
