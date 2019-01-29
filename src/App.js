import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classes from './App.module.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Home from './containers/Home/Home';
import Layout from './hoc/Layout/Layout';

import * as actions from './store/actions/index';

const asyncSearchResult = asyncComponent(() => {
    return import('./containers/SearchResult/SearchResult')
});

const asyncProductDetail = asyncComponent(() => {
    return import('./containers/ProductDetail/ProductDetail')
});

class App extends Component {

    componentDidMount() {
        const environment = {
            appVersion: '1.0.0',
            appEnv: process.env.REACT_APP_ENV,
            debugMode: process.env.REACT_APP_DEBUG_MODE === 'true',
            serverURL: process.env.REACT_APP_API_URL
        }
        this.props.onEnvLoad(environment);
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/items/:id" component={asyncProductDetail} />
                <Route path="/items" component={asyncSearchResult} />
                <Route path="/" exact component={Home} />
                <Redirect to="/" />
            </Switch>
        );

        return (
            <div className={classes.App}>
                <ToastContainer
                    transition={Flip}
                    newestOnTop={false}
                    rtl={false}
                    pauseOnVisibilityChange={false} />
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEnvLoad: environment => dispatch(actions.envLoad(environment))
    };
};

export default withRouter(connect(null, mapDispatchToProps)(App));