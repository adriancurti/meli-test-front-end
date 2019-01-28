import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    query: null,
    data: null,
    selected: null,
    error: null,
    loading: false
};

const productsClean = (state, action) => {
    return updateObject(state, initialState);
};

const productsFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const productsGetListSuccess = (state, action) => {
    return updateObject(state, {
        query: action.query,
        data: action.data,
        loading: false
    });
};

const productsGetSuccess = (state, action) => {
    return updateObject(state, {
        selected: action.selected,
        loading: false
    });
};

const productsResetError = (state, action) => {
    return updateObject(state, {
        error: null
    });
};

const productsResetSelected = (state, action) => {
    return updateObject(state, {
        selected: null
    });
};

const productsStart = (state, action) => {
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
        case actionTypes.PRODUCTS_CLEAN: return productsClean(state, action);
        case actionTypes.PRODUCTS_FAIL: return productsFail(state, action);
        case actionTypes.PRODUCTS_GET_LIST_SUCCESS: return productsGetListSuccess(state, action);
        case actionTypes.PRODUCTS_GET_SUCCESS: return productsGetSuccess(state, action);
        case actionTypes.PRODUCTS_RESET_ERROR: return productsResetError(state, action);
        case actionTypes.PRODUCTS_RESET_SELECTED: return productsResetSelected(state, action);
        case actionTypes.PRODUCTS_START: return productsStart(state, action);
        default: return state;
    }
};

export default reducer;