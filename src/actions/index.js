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
    GET_COURSES_BY_BOOTCAMP,
    GET_COURSES_ERROR,
    GET_BOOTCAMP,
    GET_BOOTCAMP_ERROR,
    GET_COURSE,
    GET_COURSE_ERROR,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    CART_ERROR,
    GET_PUBLISHER_NOTIFICATION,
    ADD_PUBLISHER_NOTIFICATION,
    PUBLISHER_NOTIFICATION_ERROR,
    UPDATE_LOADED_COURSE,
    UPDATE_LOADED_CART_ITEM,
    GET_MAP_BOOTCAMPS,
    MAP_BOOTCAMPS_ERROR,
    GET_PROFILE,
    PROFILE_ERROR,
    GET_NOTIFICATION_COUNT,
    RESET_NOTIFICATION_COUNT,
    NOTIFICATION_ERROR,
    SET_ALERT,
    REMOVE_ALERT,
} from './actionTypes';

// reset loading property of specified state
export const resetLoading = (state) => {
    return async function (dispatch) {
        dispatch({ type: RESET_LOADING, payload: state });
    };
};

// action to show alerts or info
export const setAlert = (color, message, timeout) => {
    // not an async function as it is not related to API calls and just static timeout
    return function (dispatch) {
        dispatch({ type: SET_ALERT, payload: { color, message } });
        setTimeout(
            () => dispatch({ type: REMOVE_ALERT, payload: { color, message } }),
            timeout * 1000
        );
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
            dispatch(
                setAlert('green', 'Signed up and logged in successfully', 3)
            );
        } catch (err) {
            console.log(err.response.status);
            dispatch({ type: LOGIN_SIGNUP_ERROR, payload: err.response.data });
            if (err.response.data !== undefined) {
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Something went wrong, please try again later',
                        4
                    )
                );
            }
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
            dispatch(setAlert('green', 'Logged in successfully', 3));
            dispatch(loadUser());
        } catch (err) {
            console.log(err.response.status);
            dispatch({ type: LOGIN_SIGNUP_ERROR, payload: err.response.data });
            if (err.response.data !== undefined) {
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Something went wrong, please try again later',
                        4
                    )
                );
            }
        }
    };
};
// logout user
export const logout = () => {
    return function (dispatch) {
        dispatch({ type: LOGOUT });
        dispatch(setAlert('green', 'Logged out successfully', 3));
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
            // load the user profile if exists
            dispatch(getUserProfile(response.data.data._id));
        } catch (err) {
            console.log(err.response.status);
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
            console.log(response.data);
            if (history) history.push('/bootcampResults');
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
            console.log(err.response.status);
            dispatch({ type: GET_BOOTCAMPS_ERROR, payload: err.response });
            if (err.response.data !== undefined) {
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Something went wrong, please try again later',
                        4
                    )
                );
            }
        }
    };
};

// Async action to get bootcamps for map view
export const getMapBootcamps = (filter, state, zipcode, radialDistance) => {
    return async function (dispatch) {
        try {
            let response;
            if (filter === 'all') {
                response = await axios.get(
                    `${apiBaseURL}/bootcamps?populate=false&limit=all`
                );
            }
            if (filter === 'state') {
                response = await axios.get(
                    `${apiBaseURL}/bootcamps?populate=false&state=${state}&limit=all`
                );
            }
            if (filter === 'near') {
                response = await axios.get(
                    `${apiBaseURL}/bootcamps/radius/${zipcode}/${radialDistance}`
                );
            }
            const bootcamps = response.data.data;
            const bootcampsData = bootcamps.map((bootcamp, index) => {
                return {
                    id: bootcamp._id,
                    name: bootcamp.name,
                    longitude: bootcamp.location.coordinates[0],
                    latitude: bootcamp.location.coordinates[1],
                    address: bootcamp.address,
                    rating: bootcamp.averageRating,
                };
            });
            dispatch({ type: GET_MAP_BOOTCAMPS, payload: bootcampsData });
        } catch (err) {
            console.log(err.response.status);
            if (err.response.data !== undefined) {
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Something went wrong, please try again later',
                        4
                    )
                );
            }
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
            console.log(err.response.status);
            dispatch({ type: GET_COURSES_ERROR, payload: err.response });
            if (err.response.data !== undefined) {
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Something went wrong, please try again later',
                        4
                    )
                );
            }
        }
    };
};

export const getCoursesByBootcamp = (bootcampId) => {
    return async function (dispatch) {
        const getURL = `${apiBaseURL}/bootcamps/${bootcampId}/courses`;
        try {
            const response = await axios.get(getURL);
            dispatch({
                type: GET_COURSES_BY_BOOTCAMP,
                payload: response.data.data,
            });
        } catch (err) {
            console.log(err.response.status);
            dispatch({ type: GET_BOOTCAMP_ERROR, payload: err.response.data });
            if (err.response.data !== undefined) {
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Something went wrong, please try again later',
                        4
                    )
                );
            }
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
            console.log(err.response.status);
            dispatch({ type: GET_BOOTCAMP_ERROR, payload: err.response.data });
            if (err.response.data !== undefined) {
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Something went wrong, please try again later',
                        4
                    )
                );
            }
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
            console.log(err.response.status);
            dispatch({ type: GET_COURSE_ERROR, payload: err.response.data });
            if (err.response.data !== undefined) {
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Something went wrong, please try again later',
                        4
                    )
                );
            }
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
// Clear cart action (not async action as it is just payload sending and not API related)
export const clearCart = () => {
    return {
        type: CLEAR_CART,
        payload: [],
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

// Action for getting a user's profile detail
export const getUserProfile = (userId) => {
    return async function (dispatch) {
        let getURL = `${apiBaseURL}/profiles?user=${userId}`;
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
            const response = await axios.get(getURL, config);
            if (response.data.error) {
                dispatch({
                    type: PROFILE_ERROR,
                    payload: null,
                });
            } else {
                console.log(response.data.data[0]);
                dispatch({
                    type: GET_PROFILE,
                    payload: response.data.data[0],
                });
            }
        } catch (err) {
            console.log(err.response.status);
            if (err.response.data !== undefined) {
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Something went wrong, please try again later',
                        4
                    )
                );
            }
        }
    };
};
// Action for getting the unread notification count
export const getNotificationCount = (notificationCount) => {
    return {
        type: GET_NOTIFICATION_COUNT,
        payload: notificationCount,
    };
};
// Async action for resetting the unread notification count
export const resetNotificationCount = (id) => {
    return async function (dispatch) {
        let resetURL = `${apiBaseURL}/profiles/${id}`;
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
            const body = { unReadCount: 0 };
            const response = await axios.put(resetURL, body, config);
            console.log(response.data.data);
            dispatch({
                type: RESET_NOTIFICATION_COUNT,
                payload: response.data.data.unReadCount,
            });
        } catch (err) {
            console.log(err.response.status);
            if (err.response.data !== undefined) {
                dispatch(setAlert('red', err.response.data.data, 4));
            } else {
                dispatch(
                    setAlert(
                        'red',
                        'Something went wrong, please try again later',
                        4
                    )
                );
            }
        }
    };
};
