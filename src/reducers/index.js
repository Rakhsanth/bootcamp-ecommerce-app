import { combineReducers } from 'redux';

const dummyObj = {
    dummyStore: 'Dummy Store',
};

const dummyReducer = (state = dummyObj, action) => {
    return { ...state };
};

export default combineReducers({
    dummy: dummyReducer,
});
