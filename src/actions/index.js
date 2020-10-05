// react related imports
import axios from 'axios';

// custom config constants imports
import { apiBaseURL } from '../config/config';

// action types;
import { GET_TAG_FILTERED_BOOTCAMPS } from './actionTypes';
import { GET_BOOTCAMPS_ERROR } from './actionTypes';
import { GET_TAG_FILTERED_COURSES } from './actionTypes';
import { GET_COURSES_ERROR } from './actionTypes';

// Async action to get bootcamps based on dev, desgn tag
export const getTaggedBootcamps = (
    category,
    averageRating,
    averageCost,
    select,
    page,
    sort
) => {
    return async function (dispatch) {
        let getURL = `${apiBaseURL}/bootcamps/category/${category}?`;
        if (averageRating) {
            const { filter, value } = averageRating;
            getURL = getURL + `averageRating[${filter}]=${value}`;
        }
        if (averageCost) {
            const { filter, value } = averageCost;
            if (getURL.includes('?')) {
                getURL = getURL + `&averageCost[${filter}]=${value}`;
            } else {
                getURL = getURL + `averageCost[${filter}]=${value}`;
            }
        }
        if (select) {
            if (getURL.includes('?')) {
                getURL = getURL + `&select=${select}`;
            } else {
                getURL = getURL + `select=${select}`;
            }
        }
        if (sort) {
            if (getURL.includes('?')) {
                getURL = getURL + `&sort=${sort}`;
            } else {
                getURL = getURL + `sort=${sort}`;
            }
        }
        if (page) {
            if (getURL.includes('?')) {
                getURL = getURL + `&page=${page}`;
            } else {
                getURL = getURL + `page=${page}`;
            }
        }
        try {
            const response = await axios.get(getURL);
            dispatch({
                type: GET_TAG_FILTERED_BOOTCAMPS,
                payload: response.data,
            });
        } catch (err) {
            dispatch({ type: GET_BOOTCAMPS_ERROR, payload: err.response.data });
        }
    };
};

// Async action to get courses based on dev, desgn tag
export const getTaggedCourses = (
    category,
    averageRating,
    averageCost,
    select,
    page,
    sort
) => {
    console.log(averageRating, averageCost, page);
    return async function (dispatch) {
        let getURL = `${apiBaseURL}/courses/category/${category}?`;
        if (averageRating) {
            const { filter, value } = averageRating;
            getURL = getURL + `averageRating[${filter}]=${value}`;
        }
        if (averageCost) {
            const { filter, value } = averageCost;
            if (getURL.includes('?')) {
                getURL = getURL + `&averageCost[${filter}]=${value}`;
            } else {
                getURL = getURL + `averageCost[${filter}]=${value}`;
            }
        }
        if (select) {
            if (getURL.includes('?')) {
                getURL = getURL + `&select=${select}`;
            } else {
                getURL = getURL + `select=${select}`;
            }
        }
        if (sort) {
            if (getURL.includes('?')) {
                getURL = getURL + `&sort=${sort}`;
            } else {
                getURL = getURL + `sort=${sort}`;
            }
        }
        if (page) {
            if (getURL.includes('?')) {
                getURL = getURL + `&page=${page}`;
            } else {
                getURL = getURL + `page=${page}`;
            }
        }
        try {
            const response = await axios.get(getURL);
            dispatch({
                type: GET_TAG_FILTERED_COURSES,
                payload: response.data,
            });
        } catch (err) {
            dispatch({ type: GET_COURSES_ERROR, payload: err.response.data });
        }
    };
};
