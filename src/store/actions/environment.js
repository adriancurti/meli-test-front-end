import * as actionTypes from './actionTypes';

export const envLoad = environment => {
    return {
        type: actionTypes.ENV_LOAD,
        environment: environment
    };
};