import React, { Component, Fragment } from 'react';

import classes from './Home.module.sass';
import SearchBox from '../SearchBox/SearchBox';

class Home extends Component {

    searchChangedHandler = search => {
        if (search) {
            this.props.history.push({ pathname: '/items', search: `?search=${search}` });
        }
    }

    render() {
        return (
            <Fragment>
                <SearchBox
                    search={''}
                    changed={this.searchChangedHandler} />
                <div className={classes.Home}>
                </div>
            </Fragment>
        );
    }
}

export default Home;