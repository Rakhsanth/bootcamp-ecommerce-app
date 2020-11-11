// react related
import { combineReducers } from 'redux';
import { resetLoading } from '../actions';
// action types
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
    CLEAR_CART,
    CART_ERROR,
    GET_PUBLISHER_NOTIFICATION,
    ADD_PUBLISHER_NOTIFICATION,
    PUBLISHER_NOTIFICATION_ERROR,
    UPDATE_LOADED_COURSE,
    UPDATE_LOADED_CART_ITEM,
    GET_MAP_BOOTCAMPS,
    MAP_BOOTCAMPS_ERROR,
} from '../actions/actionTypes';

const initialLoginStatus = {
    loading: true,
    loggedIn: false,
    token: null,
    user: null,
    error: false,
};
// reducer to register a user
const userLoginRegisterReducer = (state = initialLoginStatus, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_USER:
        case LOGIN_USER:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                loading: false,
                loggedIn: true,
                token: payload.token,
            };
        case LOAD_USER:
            return {
                ...state,
                loading: false,
                loggedIn: true,
                user: payload,
            };
        case LOGIN_SIGNUP_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                loggedIn: false,
                token: null,
                user: null,
            };
        default:
            return state;
    }
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
        case RESET_LOADING:
            if (payload === 'taggedBootcamps') {
                return { ...state, loading: true };
            } else {
                return state;
            }
        case GET_TAG_FILTERED_BOOTCAMPS:
            return {
                ...state,
                loading: false,
                prevPage: payload.pagination.prev,
                nextPage: payload.pagination.next,
                bootcamps: payload.append
                    ? state.bootcamps.concat(payload.data)
                    : payload.data,
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

// reducer to get bootcamps for map view
const initialMapBootcampsState = {
    loading: true,
    bootcamps: [],
    error: false,
};
const mapBootcampsReducer = (state = initialMapBootcampsState, action) => {
    const { type, payload } = action;
    switch (type) {
        case RESET_LOADING:
            if (payload === 'mapBootcamps') {
                return { ...state, loading: true, bootcamps: [] };
            } else {
                return state;
            }
        case GET_MAP_BOOTCAMPS:
            return {
                loading: false,
                bootcamps: payload,
                error: false,
            };
        case MAP_BOOTCAMPS_ERROR:
            return {
                loading: false,
                bootcamps: [],
                error: true,
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
        case RESET_LOADING:
            if (payload === 'taggedCourses') {
                return { ...state, loading: true };
            } else if (payload === 'taggedCoursesClear') {
                return { ...state, loading: true, courses: [] };
            } else {
                return state;
            }
        case GET_TAG_FILTERED_COURSES:
            return {
                ...state,
                loading: false,
                prevPage: payload.pagination.prev,
                currentPage: payload.pagination.current,
                nextPage: payload.pagination.next,
                courses: payload.append
                    ? state.courses.concat(payload.data)
                    : payload.data,
                totalCount: payload.count,
            };
        case UPDATE_LOADED_COURSE:
            return {
                ...state,
                courses: state.courses.map((course) => {
                    if (course._id === payload._id) {
                        return payload;
                    } else {
                        return course;
                    }
                }),
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

// reducer to get a single bootcamp
const initialBootcampState = {
    loading: true,
    bootcamp: null,
    error: false,
};

const bootcampReducer = (state = initialBootcampState, action) => {
    const { type, payload } = action;
    switch (type) {
        case RESET_LOADING:
            if (payload === 'bootcamp') {
                return {
                    ...state,
                    loading: true,
                    bootcamp: null,
                    error: false,
                };
            } else {
                return state;
            }

        case GET_BOOTCAMP:
            return {
                ...state,
                loading: false,
                bootcamp: payload.bootcamp,
                error: false,
            };
        case GET_BOOTCAMP_ERROR:
            return {
                ...state,
                loading: false,
                bootcamp: null,
                error: true,
            };
        default:
            return state;
    }
};

// reducer to get a single course
const initialCourseState = {
    loading: true,
    course: null,
    error: false,
};

const courseReducer = (state = initialCourseState, action) => {
    const { type, payload } = action;
    switch (type) {
        case RESET_LOADING:
            if (payload === 'course') {
                return {
                    ...state,
                    loading: true,
                    course: null,
                    error: false,
                };
            } else {
                return { ...state };
            }

        case GET_COURSE:
            return {
                ...state,
                loading: false,
                course: payload.course,
                error: false,
            };
        case GET_COURSE_ERROR:
            return {
                ...state,
                loading: false,
                course: null,
                error: true,
            };
        default:
            return state;
    }
};

// cart related reducer
const initialCartState = {
    loading: true,
    cartItems: [],
    error: false,
};
const cartReducer = (state = initialCartState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_TO_CART:
            return {
                ...state,
                loading: false,
                cartItems: [payload, ...state.cartItems],
                error: false,
            };
        case UPDATE_LOADED_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.map((item) => {
                    if (item.id === payload.id) {
                        return payload;
                    } else {
                        return item;
                    }
                }),
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                loading: false,
                cartItems: state.cartItems.filter(
                    (cartItem) => cartItem.id !== payload
                ),
                error: false,
            };
        case CLEAR_CART:
            return {
                ...state,
                cartItems: payload,
            };
        case CART_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};

// Notification related reducer (publisher)
const initialPublisherNotification = {
    loading: true,
    notifications: [],
    error: false,
};
const publisherNotificationReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
    }
};

export default combineReducers({
    auth: userLoginRegisterReducer,
    taggedBootcamps: taggedBootcampsReducer,
    mapBootcamps: mapBootcampsReducer,
    taggedCourses: taggedCoursesReducer,
    bootcamp: bootcampReducer,
    course: courseReducer,
    cart: cartReducer,
});
