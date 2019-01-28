import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classes from './App.module.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Home from './containers/Home/Home';
import Layout from './hoc/Layout/Layout';
import Notification, { toastOptions } from './components/UI/Notification/Notification';

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
        this.props.onCurrenciesGetList(process.env.REACT_APP_API_URL);
    }

    componentDidUpdate() {
        if (this.props.error) {
            this.props.onCurrenciesResetError();
        }
    }

    render() {
        if (this.props.error) {
            toast.dismiss();
            toast.error(<Notification toastType="error" title="Error" message={this.props.error.message} />, toastOptions);
        }

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

const mapStateToProps = state => {
    return {
        error: state.currencies.error,
        loading: state.currencies.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEnvLoad: environment => dispatch(actions.envLoad(environment)),
        onCurrenciesGetList: serverURL => dispatch(actions.currenciesGetList(serverURL))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));