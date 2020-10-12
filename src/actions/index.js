// react related imports
import axios from 'axios';

// custom config constants imports
import { apiBaseURL } from '../config/config';

// action types;
import {
    REGISTER_USER,
    LOGIN_USER,
    LOAD_USER,
    LOGOUT,
    LOGIN_SIGNUP_ERROR,
    GET_TAG_FILTERED_BOOTCAMPS,
    GET_BOOTCAMPS_ERROR,
    GET_TAG_FILTERED_COURSES,
    GET_COURSES_ERROR,
} from './actionTypes';

// User register action creator
export const registerUser = (body) => {
    return async function (dispatch) {
        const config = {
            'Content-Type': 'application/json',
        };
        try {
            const response = await axios.post(
                `${apiBaseURL}/auth/register`,
                body,
                config
            );
            dispatch({ type: REGISTER_USER, payload: response.data });
        } catch (err) {
            console.log(err.response.data);
            dispatch({ type: LOGIN_SIGNUP_ERROR, payload: err.response.data });
        }
    };
};

// User login action creator
export const loginUser = (body, history) => {
    return async function (dispatch) {
        const config = {
            'Content-Type': 'application/json',
        };
        try {
            const response = await axios.post(
                `${apiBaseURL}/auth/login`,
                body,
                config
            );
            history.replace('/');
            dispatch({ type: LOGIN_USER, payload: response.data });
        } catch (err) {
            console.log(err.response.data);
            dispatch({ type: LOGIN_SIGNUP_ERROR, payload: err.response.data });
        }
    };
};
// logout user
export const logout = () => {
    return function (dispatch) {
        dispatch({ type: LOGOUT });
    };
};

// load user when the app loads to check if he is already logged in (from local storage)
export const loadUser = () => {
    return async function (dispatch) {
        let token;
        if (localStorage.token) {
            token = localStorage.getItem('token');
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        };
        try {
            const response = await axios.get(`${apiBaseURL}/auth/me`, config);
            dispatch({ type: LOAD_USER, payload: response.data.data });
        } catch (err) {
            dispatch({ type: LOGIN_SIGNUP_ERROR, payload: err.response.data });
        }
    };
};

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
        let getURL = `${apiBaseURL}/bootcamps?`;

        if (category) {
            getURL = `${apiBaseURL}/bootcamps/category/${category}?`;
        }
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
    limit,
    sort,
    history,
    otherQuery
) => {
    return async function (dispatch) {
        let getURL = `${apiBaseURL}/courses?`;

        if (category) {
            getURL = `${apiBaseURL}/courses/category/${category}?`;
        }
        if (averageRating) {
            const { filter, value } = averageRating;
            getURL = getURL + `averageRating[${filter}]=${value}`;
        }
        if (averageCost) {
            const { filter, value } = averageCost;
            if (getURL.endsWith('?')) {
                getURL = getURL + `averageCost[${filter}]=${value}`;
            } else {
                getURL = getURL + `&averageCost[${filter}]=${value}`;
            }
        }
        if (select) {
            if (getURL.endsWith('?')) {
                getURL = getURL + `select=${select}`;
            } else {
                getURL = getURL + `&select=${select}`;
            }
        }
        if (sort) {
            if (getURL.endsWith('?')) {
                getURL = getURL + `sort=${sort}`;
            } else {
                getURL = getURL + `&sort=${sort}`;
            }
        }
        if (page) {
            if (getURL.endsWith('?')) {
                getURL = getURL + `page=${page}`;
            } else {
                getURL = getURL + `&page=${page}`;
            }
        }
        if (limit) {
            if (getURL.endsWith('?')) {
                getURL = getURL + `limit=${limit}`;
            } else {
                getURL = getURL + `&limit=${limit}`;
            }
        }
        if (otherQuery) {
            if (getURL.endsWith('?')) {
                getURL = getURL + `${otherQuery}`;
            } else {
                getURL = getURL + `&${otherQuery}`;
            }
        }
        try {
            const response = await axios.get(getURL);
            if (history) history.push('/courseResults');
            console.log(response.data);
            dispatch({
                type: GET_TAG_FILTERED_COURSES,
                payload: response.data,
            });
        } catch (err) {
            dispatch({ type: GET_COURSES_ERROR, payload: err.response });
        }
    };
};
