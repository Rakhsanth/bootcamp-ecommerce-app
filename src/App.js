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
import Cart from './components/Cart';
import UserProfile from './components/user/UserProfile';
import PublisherProfile from './components/publisher/PublisherProfile';
import ProtectedRoute from './components/ProtectedRoute';

// Redux store and actions
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { loadUser } from './actions';

// Redux presist related
import { PersistGate } from 'redux-persist/integration/react';

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Header />
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
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
