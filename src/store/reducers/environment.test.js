import reducer from './environment';
import * as actionTypes from '../actions/actionTypes';

describe('environment reducer', () => {
    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            appVersion: '0.0.0',
            appEnv: null,
            debugMode: null,
            serverURL: null
        });
    });

    it('action: ENV_LOAD', () => {
        let environment = {
            appVersion: '1.0.0',
            appEnv: 'dev',
            debugMode: true,
            serverURL: 'http://host:port'
        };

        expect(reducer(
            {
                appVersion: '0.0.0',
                appEnv: null,
                debugMode: null,
                serverURL: null
            }, {
                type: actionTypes.ENV_LOAD,
                environment
            })).toEqual({
                appVersion: '1.0.0',
                appEnv: 'dev',
                debugMode: true,
                serverURL: 'http://host:port'
            });
    });
});