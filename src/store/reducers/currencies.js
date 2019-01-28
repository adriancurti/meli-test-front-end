import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    data: null,
    error: null,
    loading: false
};

const currenciesClean = (state, action) => {
    return updateObject(state, initialState);
};

const currenciesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const currenciesGetListSuccess = (state, action) => {
    return updateObject(state, {
        data: action.data,
        loading: false
    });
};


const currenciesResetError = (state, action) => {
    return updateObject(state, {
        error: null
    });
};


const currenciesStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const reducer = (state = initialState, action) => {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case actionTypes.CURRENCIES_CLEAN: return currenciesClean(state, action);
        case actionTypes.CURRENCIES_FAIL: return currenciesFail(state, action);
        case actionTypes.CURRENCIES_GET_LIST_SUCCESS: return currenciesGetListSuccess(state, action);
        case actionTypes.CURRENCIES_RESET_ERROR: return currenciesResetError(state, action);
        case actionTypes.CURRENCIES_START: return currenciesStart(state, action);
        default: return state;
    }
};

export default reducer;