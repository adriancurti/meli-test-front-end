import reducer from './currencies';

describe('currencies reducer', () => {
    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            data: null,
            error: null,
            loading: false
        });
    });
});