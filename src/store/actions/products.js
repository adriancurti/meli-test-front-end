import axios from 'axios';

import * as actionTypes from './actionTypes';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export const productsGet = (id, serverURL) => {
    return dispatch => {
        dispatch(productsStart());
        let meliTestSession = JSON.parse(sessionStorage.getItem('meli-test-session'));
        if (!meliTestSession) {
            meliTestSession = {};
        }

        let url = `${serverURL}/items/${id}`;
        axios.get(url)
            .then(response => {
                meliTestSession.id = id;
                sessionStorage.setItem('meli-test-session', JSON.stringify(meliTestSession));

                dispatch(productsGetSuccess(response.data));
            })
            .catch(error => {
                delete meliTestSession.id;
                sessionStorage.setItem('meli-test-session', JSON.stringify(meliTestSession));

                if (!error.response) {
                    dispatch(productsFail({ message: '¡No se pudo conectar con el Servidor!' }));
                    return;
                }
                dispatch(productsFail({ message: '¡No se ha obtenido el detalle del producto!' }));
            });
    };
};

export const productsGetList = (query, serverURL) => {
    return dispatch => {
        dispatch(productsStart());
        let meliTestSession = JSON.parse(sessionStorage.getItem('meli-test-session'));
        if (!meliTestSession) {
            meliTestSession = {};
        }

        let params = `?q=${query.q}`;
        let url = `${serverURL}/items${params}`;
        axios.get(url)
            .then(response => {
                meliTestSession.search = query;
                sessionStorage.setItem('meli-test-session', JSON.stringify(meliTestSession));

                dispatch(productsGetListSuccess(query, response.data));
            })
            .catch(error => {
                delete meliTestSession.search;
                sessionStorage.setItem('meli-test-session', JSON.stringify(meliTestSession));

                if (!error.response) {
                    dispatch(productsFail({ message: '¡No se pudo conectar con el Servidor!' }));
                    return;
                }
                dispatch(productsFail({ message: '¡No se ha realizado la búsqueda de productos!' }));
            });
    };
};

export const productsClean = () => {
    return {
        type: actionTypes.PRODUCTS_CLEAN
    };
};

export const productsFail = error => {
    return {
        type: actionTypes.PRODUCTS_FAIL,
        error: error
    };
};

export const productsGetListSuccess = (query, data) => {
    return {
        type: actionTypes.PRODUCTS_GET_LIST_SUCCESS,
        query: query,
        data: data
    };
};

export const productsGetSuccess = selected => {
    return {
        type: actionTypes.PRODUCTS_GET_SUCCESS,
        selected: selected
    };
};

export const productsResetError = () => {
    return {
        type: actionTypes.PRODUCTS_RESET_ERROR
    };
};

export const productsResetSelected = () => {
    return {
        type: actionTypes.PRODUCTS_RESET_SELECTED
    };
};

export const productsStart = () => {
    return {
        type: actionTypes.PRODUCTS_START
    };
};