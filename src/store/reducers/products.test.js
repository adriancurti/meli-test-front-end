import reducer from './products';

describe('products reducer', () => {
    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            query: null,
            data: null,
            selected: null,
            error: null,
            loading: false
        });
    });
});