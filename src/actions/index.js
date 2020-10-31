// react related imports
import axios from 'axios';

// custom config constants imports
import { apiBaseURL } from '../config/config';

// action types;
import {
    RESET_LOADING,
    REGISTER_USER,
    LOGIN_USER,
    LOAD_USER,
    LOGOUT,
    LOGIN_SIGNUP_ERROR,
    GET_TAG_FILTERED_BOOTCAMPS,
    GET_BOOTCAMPS_ERROR,
    GET_TAG_FILTERED_COURSES,
    GET_COURSES_ERROR,
    GET_BOOTCAMP,
    GET_BOOTCAMP_ERROR,
    GET_COURSE,
    GET_COURSE_ERROR,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CART_ERROR,
    GET_PUBLISHER_NOTIFICATION,
    ADD_PUBLISHER_NOTIFICATION,
    PUBLISHER_NOTIFICATION_ERROR,
    UPDATE_LOADED_COURSE,
    UPDATE_LOADED_CART_ITEM,
} from './actionTypes';

// reset loading property of specified state
export const resetLoading = (state) => {
    return async function (dispatch) {
        dispatch({ type: RESET_LOADING, payload: state });
    };
};

// User register action creator
export const registerUser = (body, history) => {
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
            history.replace('/');
            dispatch({ type: REGISTER_USER, payload: response.data });
            dispatch(loadUser());
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
            dispatch(loadUser());
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
    limit,
    sort,
    history,
    otherQuery,
    append
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
        if (limit) {
            if (getURL.includes('?')) {
                getURL = getURL + `&limit=${limit}`;
            } else {
                getURL = getURL + `limit=${limit}`;
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
            if (append) {
                dispatch({
                    type: GET_TAG_FILTERED_BOOTCAMPS,
                    payload: {
                        count: response.data.count,
                        pagination: response.data.pagination,
                        data: response.data.data,
                        append: true,
                    },
                });
            } else {
                dispatch({
                    type: GET_TAG_FILTERED_BOOTCAMPS,
                    payload: {
                        count: response.data.count,
                        pagination: response.data.pagination,
                        data: response.data.data,
                        append: false,
                    },
                });
            }
        } catch (err) {
            if (err.response.data) {
                console.log(err.response.data);
            }
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
    otherQuery,
    append
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
            if (append) {
                dispatch({
                    type: GET_TAG_FILTERED_COURSES,
                    payload: {
                        count: response.data.count,
                        pagination: response.data.pagination,
                        data: response.data.data,
                        append: true,
                    },
                });
            } else {
                dispatch({
                    type: GET_TAG_FILTERED_COURSES,
                    payload: {
                        count: response.data.count,
                        pagination: response.data.pagination,
                        data: response.data.data,
                        append: false,
                    },
                });
            }
        } catch (err) {
            console.log(err);
            dispatch({ type: GET_COURSES_ERROR, payload: err.response });
        }
    };
};

// get a single bootcamp by id
export const getBootcamp = (bootcampId) => {
    return async function (dispatch) {
        const getURL = `${apiBaseURL}/bootcamps/${bootcampId}`;
        try {
            const response = await axios.get(getURL);
            dispatch({
                type: GET_BOOTCAMP,
                payload: { bootcamp: response.data.data },
            });
        } catch (err) {
            console.log(err);
            dispatch({ type: GET_BOOTCAMP_ERROR, payload: err.response.data });
        }
    };
};

// get a single course by id
export const getCourse = (courseId) => {
    return async function (dispatch) {
        const getURL = `${apiBaseURL}/courses/${courseId}`;
        try {
            const response = await axios.get(getURL);
            dispatch({
                type: GET_COURSE,
                payload: { course: response.data.data },
            });
        } catch (err) {
            console.log(err);
            dispatch({ type: GET_COURSE_ERROR, payload: err.response.data });
        }
    };
};

// Add item to cart action (not async action as it is just payload sending and not API related)
export const addToCart = (cartItem) => {
    return {
        type: ADD_TO_CART,
        payload: cartItem,
    };
};
// Update item in cart action (not async action as it is just payload sending and not API related)
export const updateCartItem = (cartItem) => {
    return {
        type: UPDATE_LOADED_CART_ITEM,
        payload: cartItem,
    };
};
// Remove item from cart action (not async action as it is just payload sending and not API related)
export const removeFromCart = (cartItemId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: cartItemId,
    };
};

export const addPublisherNotification = (notification) => {
    // return async function(dispatch){

    // }

    return {
        type: ADD_PUBLISHER_NOTIFICATION,
        payload: notification,
    };
};

export const updateLoadedCourse = (courseDoc) => {
    return {
        type: UPDATE_LOADED_COURSE,
        payload: courseDoc,
    };
};
