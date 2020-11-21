import axios from 'axios';
// custom import
import { apiBaseURL } from '../config/config';

// generalising token getter
const getLocalStorageToken = () => {
    let token = null;
    if (localStorage.token) {
        token = localStorage.getItem('token');
    }
    return token;
};
// generalising config getter
const getPostConfig = (contentType, withCreds, authNeeded) => {
    let postConfig;
    if (authNeeded) {
        postConfig = {
            headers: {
                'Content-Type': contentType,
                Authorization: `Bearer ${getLocalStorageToken()}`,
            },
            withCredentials: withCreds,
        };
    } else {
        postConfig = {
            headers: {
                'Content-Type': contentType,
            },
        };
    }
    return postConfig;
};

export const createEditBootcamp = async (
    formValues,
    createOrEdit,
    bootcampId
) => {
    let postURL = `${apiBaseURL}/bootcamps`;
    const config = getPostConfig('application/json', true, true);

    const { image, ...restData } = formValues;

    try {
        let bootcampResponse;
        let uploadResponse;

        switch (createOrEdit) {
            case 'create':
                bootcampResponse = await axios.post(
                    postURL,
                    { ...restData },
                    config
                );
                break;
            case 'edit':
                postURL += `/${bootcampId}`;
                bootcampResponse = await axios.put(
                    postURL,
                    { ...restData },
                    config
                );
        }

        if (image) {
            const imageUploadURL = `${apiBaseURL}/bootcamps/${bootcampResponse.data.data._id}/photo`;
            const imageConfig = getPostConfig(
                'multipart/form-data',
                true,
                true
            );
            const formData = new FormData();
            formData.append('file', image);
            try {
                uploadResponse = await axios.put(
                    imageUploadURL,
                    formData,
                    imageConfig
                );
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err.response.data);
        if (
            err.response.data.data ===
            "Cannot read property 'longitude' of undefined"
        ) {
            console.log('please endter a valid pincode / zipcode');
        }
    }
};

export const deleteBootcamp = async (bootcampId) => {
    const deleteURL = `${apiBaseURL}/bootcamps/${bootcampId}`;
    try {
        const response = axios.delete(
            deleteURL,
            getPostConfig('application/json', true, true)
        );
    } catch (err) {
        console.log(err.response);
    }
};

export const updateCourse = async (courseId, data) => {
    let postURL = `${apiBaseURL}/courses/${courseId}`;
    try {
        const response = await axios.put(
            postURL,
            data,
            getPostConfig('application/json', true, true)
        );
        console.log(response.data.data);
    } catch (err) {
        console.log(err.response);
    }
};

export const getReviews = async (courseId, pageNum, percents, query) => {
    let getURL = `${apiBaseURL}/courses/${courseId}/reviews?sort=-createdAt`;
    if (pageNum) {
        getURL = getURL + `&page=${pageNum}`;
    }
    if (percents) {
        getURL = getURL + `&percents=${percents}`;
    }
    if (query) {
        getURL = getURL + `&${query}`;
    }
    try {
        const response = await axios.get(getURL);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

// get profile along with notifications using UserId
export const getProfileDetails = async (userId) => {
    let getURL = `${apiBaseURL}/profiles?user=${userId}`;

    try {
        const response = await axios.get(
            getURL,
            getPostConfig('application/json', true, true)
        );
        if (response.data.error) {
            return null;
        } else {
            return response.data.data[0];
        }
    } catch (err) {
        console.log(err);
        // console.log('create a profile 1st');
    }
};

// Get profile notifications using profileId
export const getProfileNotifications = async (profileId) => {
    let getURL = `${apiBaseURL}/profiles/${profileId}`;

    try {
        const response = await axios.get(
            getURL,
            getPostConfig('application/json', true, true)
        );
        if (response.data.error) {
            return null;
        } else {
            return response.data.data.notifications;
        }
    } catch (err) {
        console.log(err);
        // console.log('create a profile 1st');
    }
};

// Delete a notifications using userId and notificationId
export const deleteNotification = async (userId, notificationId) => {
    let deleteURL = `${apiBaseURL}/profiles/notifications/${userId}/${notificationId}`;

    try {
        const response = await axios.delete(
            deleteURL,
            getPostConfig('application/json', true, true)
        );
        if (response.data.error) {
            return null;
        } else {
            return response.data.data.notifications;
        }
    } catch (err) {
        console.log(err);
        // console.log('create a profile 1st');
    }
};

// Create or update a profile
export const createOrEditProfileDetails = async (
    profileId,
    createOrEdit,
    body
) => {
    console.log('API called');
    let postURL = `${apiBaseURL}/profiles`;
    let profileResponse;
    let imageResponse;
    let fileResponse;

    const { picture, resume, ...rest } = body;
    try {
        if (createOrEdit === 'edit') {
            postURL = `${apiBaseURL}/profiles/${profileId}`;
            profileResponse = await axios.put(
                postURL,
                { ...rest },
                getPostConfig('application/json', true, true)
            );
        } else {
            profileResponse = await axios.post(
                postURL,
                { ...rest },
                getPostConfig('application/json', true, true)
            );
        }
        if (typeof picture !== 'string') {
            const imageUploadURL = `${apiBaseURL}/profiles/image/${profileResponse.data.data._id}`;
            const formData = new FormData();
            formData.append('file', picture);
            imageResponse = await axios.put(
                imageUploadURL,
                formData,
                getPostConfig('multipart/form-data', true, true)
            );
        }
        if (typeof resume !== 'string') {
            const fileUploadURL = `${apiBaseURL}/profiles/file/${profileResponse.data.data._id}`;
            const formData = new FormData();
            formData.append('file', resume);
            fileResponse = await axios.put(
                fileUploadURL,
                formData,
                getPostConfig('multipart/form-data', true, true)
            );
        }
    } catch (err) {
        console.log(err.response);
        // console.log('create a profile 1st');
    }
};
