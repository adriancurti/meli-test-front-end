import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    appVersion: '0.0.0',
    appEnv: null,
    debugMode: null,
    serverURL: null
};

const envLoad = (state, action) => {
    return updateObject(state, action.environment);
};

const reducer = (state = initialState, action) => {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case actionTypes.ENV_LOAD: return envLoad(state, action);
        default: return state;
    }
};

export default reducer;