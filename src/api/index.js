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
