import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.sass';

class Layout extends Component {
    state = {}

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div className={classes.Layout}>
                <header>
                    <nav></nav>
                </header>
                <main className={classes.Main}>
                    {this.props.children}
                </main>
                <footer></footer>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        appVersion: state.env.appVersion
    };
};

export default connect(mapStateToProps)(Layout);