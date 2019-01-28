import axios from 'axios';

import currencies from '../../shared/currencies.json';

import * as actionTypes from './actionTypes';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export const currenciesGetList = serverURL => {
    return dispatch => {
        dispatch(currenciesStart());

        let url = serverURL + '/currencies';
        axios.get(url)
            .then(response => {
                const data = response.data;
                dispatch(currenciesGetListSuccess(data));
            })
            .catch(error => {
                console.log(error);
                const data = currencies; // Hard-coded
                dispatch(currenciesGetListSuccess(data));

                // if (!error.response) {
                //     dispatch(currenciesFail({ message: '¡No se pudo conectar con el Servidor!' }));
                //     return;
                // }
                // dispatch(currenciesFail({ message: '¡No se ha obtenido la lista de monedas!' }));
            });
    };
};

export const currenciesClean = () => {
    return {
        type: actionTypes.CURRENCIES_CLEAN
    };
};

export const currenciesFail = error => {
    return {
        type: actionTypes.CURRENCIES_FAIL,
        error: error
    };
};

export const currenciesGetListSuccess = data => {
    return {
        type: actionTypes.CURRENCIES_GET_LIST_SUCCESS,
        data: data
    };
};

export const currenciesResetError = () => {
    return {
        type: actionTypes.CURRENCIES_RESET_ERROR
    };
};

export const currenciesStart = () => {
    return {
        type: actionTypes.CURRENCIES_START
    };
};