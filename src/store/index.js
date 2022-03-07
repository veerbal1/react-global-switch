import { createStore } from 'redux';

const initialState = {
    id: 1,
    name: 'Veerbal',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ID':
            return {
                ...state,
                id: action.id,
            };
        case 'SET_NAME':
            return {
                ...state,
                name: action.name,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;
