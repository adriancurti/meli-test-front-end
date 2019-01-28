import axios from 'axios';

import * as actionTypes from './actionTypes';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export const productsGet = (id, currencies, serverURL) => {
    return dispatch => {
        dispatch(productsStart());
        let meliTestSession = JSON.parse(sessionStorage.getItem('meli-test-session'));
        if (!meliTestSession) {
            meliTestSession = {};
        }

        let selected = {
            author: {
                name: 'Adrian', // Hard-coded
                lastname: 'Curti' // Hard-coded
            },
            item: {}
        };

        let url = serverURL + '/items/' + id;
        axios.get(url)
            .then(response => {
                meliTestSession.id = id;
                sessionStorage.setItem('meli-test-session', JSON.stringify(meliTestSession));

                const item = response.data;
                const currency = currencies.filter(currency => currency.id === item.currency_id);
                const price = item.price ? item.price.toString().split('.') : [0, 0];
                const amount = parseInt(price[0]);
                const decimals = price.length === 2 ? parseInt(price[1]) : 0;
                selected.item = {
                    id: item.id,
                    title: item.title,
                    price: {
                        currency: currency.length > 0 ? currency[0].symbol : item.currency_id,
                        amount: amount,
                        decimals: decimals >= 10 ? decimals : parseInt(decimals + '0')
                    },
                    picture: item.thumbnail ? item.thumbnail.replace('http:', 'https:').replace('-I.', '-O.') : '',
                    condition: item.condition,
                    free_shipping: item.shipping.free_shipping,
                    sold_quantity: item.sold_quantity,
                    description: 'Ninguna'
                };

                url = serverURL + '/items/' + id + '/description';
                axios.get(url)
                    .then(response => {
                        const description = response.data.plain_text;
                        selected.item.description = description;

                        dispatch(productsGetSuccess(selected));
                    })
                    .catch(error => {
                        console.log(error);
                        dispatch(productsGetSuccess(selected));
                    });
            })
            .catch(error => {
                console.log(error);
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

export const productsGetList = (query, currencies, serverURL) => {
    return dispatch => {
        dispatch(productsStart());
        let meliTestSession = JSON.parse(sessionStorage.getItem('meli-test-session'));
        if (!meliTestSession) {
            meliTestSession = {};
        }

        let data = {
            author: {
                name: 'Adrian', // Hard-coded
                lastname: 'Curti' // Hard-coded
            },
            categories: [],
            items: []
        };

        let params = `?q=${query.q}`;
        let url = serverURL + '/sites/MLA/search' + params;
        axios.get(url)
            .then(response => {
                meliTestSession.search = query;
                sessionStorage.setItem('meli-test-session', JSON.stringify(meliTestSession));

                const filters = response.data.filters;
                for (let filter of filters) {
                    if (filter.id === 'category') {
                        const values = filter.values;
                        for (let value of values) {
                            if (value.path_from_root) {
                                const categories = value.path_from_root;
                                for (let category of categories) {
                                    data.categories.push(category.name);
                                }
                                break;
                            }
                        }
                        break;
                    }
                }
                const results = response.data.results;
                for (let result of results) {
                    const currency = currencies.filter(currency => currency.id === result.currency_id);
                    const price = result.price ? result.price.toString().split('.') : [0, 0];
                    const amount = parseInt(price[0]);
                    const decimals = price.length === 2 ? parseInt(price[1]) : 0;
                    let item = {
                        id: result.id,
                        title: result.title,
                        price: {
                            currency: currency.length > 0 ? currency[0].symbol : result.currency_id,
                            amount: amount,
                            decimals: decimals >= 10 ? decimals : parseInt(decimals + '0')
                        },
                        picture: result.thumbnail ? result.thumbnail.replace('http:', 'https:').replace('-I.', '-O.') : '',
                        condition: result.condition,
                        free_shipping: result.shipping.free_shipping,
                        address: result.address.state_name
                    };
                    data.items.push(item);
                }

                dispatch(productsGetListSuccess(query, data));
            })
            .catch(error => {
                console.log(error);
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