// React
import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/Header';
import Landing from './components/Landing';
import Register from './components/Register';
import Login from './components/Login';
import CourseResults from './components/course/CourseResults';
import Course from './components/course/Course';
import Bootcamp from './components/bootcamp/Bootcamp';
import Cart from './components/Cart';
import UserProfile from './components/user/UserProfile';
import PublisherProfile from './components/publisher/PublisherProfile';
import PublisherNotification from './components/notification/PublisherNotification';
import UserNotification from './components/notification/UserNotification';
import ProtectedRoute from './components/ProtectedRoute';
import Alert from './components/utils/Alert';

// Redux store and actions
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { loadUser, setAlert } from './actions';

// Redux presist related
import { PersistGate } from 'redux-persist/integration/react';
import AlertWrapper from './components/utils/AlertWrapper';

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Header />
                    <AlertWrapper />
                    <Route exact path="/" component={Landing} />
                    <Switch>
                        {/* Other specific dynamic routes and pages goes here */}
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route
                            path="/courseResults"
                            component={CourseResults}
                        />
                        <Route
                            exact
                            path="/courses/:courseId"
                            component={Course}
                        />
                        <Route
                            exact
                            path="/bootcamps/:bootcampId"
                            component={Bootcamp}
                        />
                        <Route exact path="/cart" component={Cart} />
                        <ProtectedRoute
                            exact
                            path="/user/profile"
                            component={UserProfile}
                        />
                        <ProtectedRoute
                            exact
                            path="/publisher/profile"
                            component={PublisherProfile}
                        />
                        <ProtectedRoute
                            exact
                            path="/notifications/publisher/:profileId"
                            component={PublisherNotification}
                        />
                        <ProtectedRoute
                            exact
                            path="/notifications/user/:profileId"
                            component={UserNotification}
                        />
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
