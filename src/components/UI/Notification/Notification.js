import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheckCircle, faExclamationTriangle, faExclamationCircle, faCog } from '@fortawesome/free-solid-svg-icons';

import classes from './Notification.module.sass';

export const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    className: classes.Toast,
    bodyClassName: classes.ToastBody,
    progressClassName: classes.ToastProgress
};

export const spinnerOptions = {
    position: "bottom-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    closeButton: false,
    className: classes.ToastSpinner,
    bodyClassName: classes.ToastBody,
    progressClassName: classes.ToastProgress
};

const notification = (props) => {
    let content = null;
    switch (props.toastType) {
        case 'info':
            content = (
                <div className={classes.Notification}>
                    <div className={classes.Icon}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
                    <div className={classes.Text}>
                        <h2>{props.title}</h2>
                        <p>{props.message}</p>
                    </div>
                </div>
            );
            break;
        case 'success':
            content = (
                <div className={classes.Notification}>
                    <div className={classes.Icon}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </div>
                    <div className={classes.Text}>
                        <h2>{props.title}</h2>
                        <p>{props.message}</p>
                    </div>
                </div>
            );
            break;
        case 'warning':
            content = (
                <div className={classes.Notification}>
                    <div className={classes.IconWarning}>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                    </div>
                    <div className={classes.Text}>
                        <h2>{props.title}</h2>
                        <p>{props.message}</p>
                    </div>
                </div>
            );
            break;
        case 'error':
            content = (
                <div className={classes.Notification}>
                    <div className={classes.Icon}>
                        <FontAwesomeIcon icon={faExclamationCircle} />
                    </div>
                    <div className={classes.Text}>
                        <h2>{props.title}</h2>
                        <p>{props.message}</p>
                    </div>
                </div>
            );
            break;
        default:
            content = (
                <div className={classes.Notification}>
                    <div className={classes.Icon}>
                        <FontAwesomeIcon icon={faCog} spin />
                    </div>
                    <div className={classes.Text}>
                        <h2>{props.title}</h2>
                        <p>{props.message}</p>
                    </div>
                </div>
            );
            break;
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    );
};

export default notification;