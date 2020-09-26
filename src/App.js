// React related
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/Header';
import Landing from './components/Landing';

// Redux related
import { Provider } from 'react-redux';
import store from './store';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Route exact path="/" component={Landing} />
                <Switch>
                    {/* Other specific dynamic routes and pages goes here */}
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
