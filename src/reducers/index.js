// react related
import { combineReducers } from 'redux';
// action types
import {
    GET_TAG_FILTERED_BOOTCAMPS,
    GET_BOOTCAMPS_ERROR,
    GET_TAG_FILTERED_COURSES,
    GET_COURSES_ERROR,
} from '../actions/actionTypes';

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
    taggedBootcamps: taggedBootcampsReducer,
    taggedCourses: taggedCoursesReducer,
});
