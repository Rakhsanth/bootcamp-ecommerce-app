import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoute(props) {
    const { component: Component, loading, loggedIn, ...rest } = props;

    return !loading ? (
        <Route
            {...rest}
            render={(props) =>
                loggedIn ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    ) : (
        <h1>Loading ...</h1>
    );
}

const mapStateToProps = (store) => ({
    loading: store.auth.loading,
    loggedIn: store.auth.loggedIn,
});

export default connect(mapStateToProps)(ProtectedRoute);
