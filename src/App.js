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

// Redux store and actions
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions';

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Route exact path="/" component={Landing} />
                <Switch>
                    {/* Other specific dynamic routes and pages goes here */}
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/courseResults" component={CourseResults} />
                    <Route path="/courses/:courseId" component={Course} />
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
