// react related
import { combineReducers } from 'redux';
// action types
import {
    REGISTER_USER,
    LOGIN_SIGNUP_ERROR,
    GET_TAG_FILTERED_BOOTCAMPS,
    GET_BOOTCAMPS_ERROR,
    GET_TAG_FILTERED_COURSES,
    GET_COURSES_ERROR,
} from '../actions/actionTypes';

const initialLoginStatus = {
    loading: true,
    loggedIn: false,
    token: null,
    error: false,
};
// reducer to register a user
const userRegisterReducer = (state = initialLoginStatus, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_USER:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                loading: false,
                loggedIn: true,
                token: payload.token,
            };
        case LOGIN_SIGNUP_ERROR:
            return {
                ...state,
                loading: false,
                loggedIn: false,
                token: null,
                error: true,
            };
        default:
            return { ...state };
    }
};

// reducer to login a user
const userLoginReducer = (state = initialLoginStatus, action) => {
    const { type, payload } = action;
};

// reducer to get tagged bootcamps with filters
const initialTaggedBootcampsState = {
    loading: true,
    totalCount: 0,
    prevPage: null,
    nextPage: null,
    bootcamps: [],
    error: false,
};
const taggedBootcampsReducer = (
    state = initialTaggedBootcampsState,
    action
) => {
    const { type, payload } = action;
    switch (type) {
        case GET_TAG_FILTERED_BOOTCAMPS:
            return {
                ...state,
                loading: false,
                prevPage: payload.pagination.prev,
                nextPage: payload.pagination.next,
                bootcamps: payload.data,
                totalCount: payload.count,
            };
        case GET_BOOTCAMPS_ERROR:
            return {
                ...state,
                loading: false,
                prevPage: null,
                nextPage: null,
                error: true,
                bootcamps: [],
                totalCount: payload.count,
            };
        default:
            return state;
    }
};

// reducer to get tagged bootcamps with filters
const initialTaggedCoursesState = {
    loading: true,
    totalCount: 0,
    prevPage: null,
    nextPage: null,
    courses: [],
    error: false,
};
const taggedCoursesReducer = (state = initialTaggedCoursesState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_TAG_FILTERED_COURSES:
            return {
                ...state,
                loading: false,
                prevPage: payload.pagination.prev,
                nextPage: payload.pagination.next,
                courses: payload.data,
                totalCount: payload.count,
            };
        case GET_COURSES_ERROR:
            return {
                ...state,
                loading: false,
                prevPage: null,
                nextPage: null,
                courses: [],
                error: true,
                totalCount: 0,
            };
        default:
            return state;
    }
};

export default combineReducers({
    auth: userRegisterReducer,
    taggedBootcamps: taggedBootcampsReducer,
    taggedCourses: taggedCoursesReducer,
});
