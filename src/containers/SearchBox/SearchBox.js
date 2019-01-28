import React, { Component } from 'react';

import classes from './SearchBox.module.css';
import imageLogoML from '../../assets/images/Logo_ML@2x.png.png';
import imageIconSearch from '../../assets/images/ic_Search@2x.png.png';

import { updateObject } from '../../shared/utility';

class SearchBox extends Component {
    state = {
        controls: {
            search: {
                value: ''
            }
        }
    };

    componentDidMount() {
        if (this.props.search) {
            this.loadSearch();
        }
    }

    loadSearch = () => {
        const updatedControls = updateObject(this.state.controls, {
            search: updateObject(this.state.controls.search, {
                value: this.props.search
            })
        });
        this.setState({ controls: updatedControls });
    }

    inputKeyPressedHandler = (event, controlName) => {
        let isValid = false;
        let valid = '';
        switch (controlName) {
            default:
                valid = '';
        }
        if (!valid || (valid && valid.includes(event.key))) {
            isValid = true;
        }
        if (!isValid && event.key !== 'Enter') {
            event.preventDefault();
        }
        if (event.key === 'Enter') {
            this.props.changed(this.state.controls.search.value);
        }
    }

    inputChangedHandler = (event, controlName) => {
        let value = '';
        switch (controlName) {
            default:
                value = event.target.value;
        }
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: value
            })
        });
        this.setState({ controls: updatedControls });
    }

    iconClickedHandler = () => {
        this.props.changed(this.state.controls.search.value);
    }

    render() {
        return (
            <div className={classes.SearchBox}>
                <div className={classes.Flex}>
                    <img
                        className={classes.Logo}
                        src={imageLogoML}
                        alt="Mercado Libre"
                        draggable="false" />
                    <div className={classes.InputContainer}>
                        <input
                            className={classes.InputSearch}
                            type="search"
                            value={this.state.controls.search.value}
                            onChange={event => this.inputChangedHandler(event, 'search')}
                            onKeyPress={event => this.inputKeyPressedHandler(event, 'search')}
                            placeholder="Nunca dejes de buscar" />
                        <img
                            className={classes.IconSearch}
                            src={imageIconSearch}
                            alt="Buscar"
                            onClick={this.iconClickedHandler}
                            draggable="false" />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBox;