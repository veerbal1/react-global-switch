import { createStore } from 'redux';

const initialState = {
    id: 1,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ID':
            return {
                ...state,
                id: action.id,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;
