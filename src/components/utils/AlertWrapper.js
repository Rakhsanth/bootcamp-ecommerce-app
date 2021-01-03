import React from 'react';
import { Fragment } from 'react';
// redux related
import { connect } from 'react-redux';
//actions
// import {} from '../../actions';
import Alert from './Alert';

function AlertWrapper(props) {
    const { loading, alerts } = props;
    console.log(alerts);
    return (
        <div className="tempAlert-container">
            {alerts && alerts.length > 0
                ? alerts.map(({ color, message }) => (
                      <Alert color={color} message={message} />
                  ))
                : null}
        </div>
    );
}

const mapStateToProps = (store) => ({
    alerts: store.alert.alerts,
});

export default connect(mapStateToProps)(AlertWrapper);
