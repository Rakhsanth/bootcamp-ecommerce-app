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

        if (typeof image !== 'string' && image !== undefined) {
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
                if (err.response !== undefined) {
                    console.log(err.response.status);
                    return {
                        success: err.response.data.success,
                        message: err.response.data.data,
                    };
                } else {
                    return {
                        success: false,
                        message: 'Something went wrong, please try again later',
                    };
                }
            }
        }
        return { success: true, message: 'Updated successfully' };
    } catch (err) {
        if (err.response !== undefined) {
            console.log(err.response.status);
            if (
                err.response.data.data ===
                "Cannot read property 'longitude' of undefined"
            ) {
                console.log('please endter a valid pincode / zipcode');
                return {
                    success: false,
                    message: 'please endter a valid pincode / zipcode',
                };
            }
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
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
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
        }
    }
};

export const createEditCourse = async (
    formValues,
    createOrEdit,
    courseId,
    bootcampId
) => {
    let postURL = `${apiBaseURL}/courses`;
    let postCreateUrl = `${apiBaseURL}/bootcamps/${bootcampId}/courses`;
    const config = getPostConfig('application/json', true, true);

    const { image, video, ...restData } = formValues;

    try {
        let courseResponse;
        let uploadResponse;

        switch (createOrEdit) {
            case 'create':
                postURL = postCreateUrl;
                courseResponse = await axios.post(
                    postURL,
                    { ...restData },
                    config
                );
                break;
            case 'edit':
                postURL += `/${courseId}`;
                courseResponse = await axios.put(
                    postURL,
                    { ...restData },
                    config
                );
        }

        if (typeof image !== 'string' && image !== undefined) {
            const imageUploadURL = `${apiBaseURL}/courses/${courseResponse.data.data._id}/photo`;
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
                if (err.response !== undefined) {
                    console.log(err.response.status);
                    return {
                        success: err.response.data.success,
                        message: err.response.data.data,
                    };
                } else {
                    return {
                        success: false,
                        message: 'Something went wrong, please try again later',
                    };
                }
            }
        }
        if (typeof video !== 'string' && video !== undefined) {
            const videoUploadURL = `${apiBaseURL}/courses/${courseResponse.data.data._id}/video`;
            const videoConfig = getPostConfig(
                'multipart/form-data',
                true,
                true
            );
            const formData = new FormData();
            formData.append('file', video);
            try {
                uploadResponse = await axios.put(
                    videoUploadURL,
                    formData,
                    videoConfig
                );
            } catch (err) {
                if (err.response !== undefined) {
                    console.log(err.response.status);
                    return {
                        success: err.response.data.success,
                        message: err.response.data.data,
                    };
                } else {
                    return {
                        success: false,
                        message: 'Something went wrong, please try again later',
                    };
                }
            }
        }
        return { success: true, message: 'Updated successfully' };
    } catch (err) {
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
        }
    }
};

export const deleteCourse = async (courseId) => {
    const deleteURL = `${apiBaseURL}/courses/${courseId}`;
    try {
        const response = axios.delete(
            deleteURL,
            getPostConfig('application/json', true, true)
        );
    } catch (err) {
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
        }
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
        return { success: response.data.success };
    } catch (err) {
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
        }
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
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
        }
    }
};

export const getBootcampReviews = async (
    bootcampId,
    pageNum,
    percents,
    query
) => {
    let getURL = `${apiBaseURL}/bootcamps/${bootcampId}/reviews?sort=-createdAt`;
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
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
        }
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
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
        }
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
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
        }
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
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
        }
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
        if (typeof picture !== 'string' && picture !== undefined) {
            const imageUploadURL = `${apiBaseURL}/profiles/image/${profileResponse.data.data._id}`;
            const formData = new FormData();
            formData.append('file', picture);
            imageResponse = await axios.put(
                imageUploadURL,
                formData,
                getPostConfig('multipart/form-data', true, true)
            );
        }
        if (typeof resume !== 'string' && resume !== undefined) {
            const fileUploadURL = `${apiBaseURL}/profiles/file/${profileResponse.data.data._id}`;
            const formData = new FormData();
            formData.append('file', resume);
            fileResponse = await axios.put(
                fileUploadURL,
                formData,
                getPostConfig('multipart/form-data', true, true)
            );
        }
        return { success: true, message: 'Updated successfully' };
    } catch (err) {
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Something went wrong, please try again later',
            };
        }
    }
};

// to call forgot password;
export const forgotPassword = async (value) => {
    const postURL = `${apiBaseURL}/auth/forgotPassword`;
    try {
        const response = await axios.post(
            postURL,
            value,
            getPostConfig('application/json')
        );
        return {
            success: response.data.success,
            message: response.data.message,
        };
    } catch (err) {
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Server is down, please try again later',
            };
        }
    }
};

// to reset forgot password using reset token;
export const resetForgotPassword = async (values) => {
    const { resetToken, password } = values;
    const putURL = `${apiBaseURL}/auth/resetPassword/${resetToken}`;

    console.log(password);

    try {
        const response = await axios.put(
            putURL,
            { password },
            getPostConfig('application/json')
        );
        return {
            success: response.data.success,
            message: 'Password reset successfully',
        };
    } catch (err) {
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Server is down, please try again later',
            };
        }
    }
};

// create or edit review
export const createOrEditReview = async (
    createOrEdit,
    courseOrBootcamp,
    courseOrBootcampId,
    reviewId,
    values
) => {
    let postURL;
    if (courseOrBootcamp === 'course') {
        postURL = `${apiBaseURL}/courses/${courseOrBootcampId}/reviews`;
    } else {
        postURL = `${apiBaseURL}/bootcamps/${courseOrBootcampId}/reviews`;
    }

    const putURL = `${apiBaseURL}/reviews/${reviewId}`;

    try {
        let response;
        if (createOrEdit === 'create') {
            response = await axios.post(
                postURL,
                values,
                getPostConfig('application/json', true, true)
            );
        } else {
            response = await axios.put(
                putURL,
                values,
                getPostConfig('application/json', true, true)
            );
        }
        return {
            success: response.data.success,
            message: 'Updated successfully',
        };
    } catch (err) {
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Server down, please try again later',
            };
        }
    }
};

// delete a review:
export const deleteReview = async (reviewId) => {
    const deleteURL = `${apiBaseURL}/reviews/${reviewId}`;

    try {
        const response = await axios.delete(
            deleteURL,
            getPostConfig('application/json', true, true)
        );
        return {
            success: response.data.success,
            message: 'Updated successfully',
        };
    } catch (err) {
        if (err.response !== undefined) {
            console.log(err.response.status);
            return {
                success: err.response.data.success,
                message: err.response.data.data,
            };
        } else {
            return {
                success: false,
                message: 'Server down, please try again later',
            };
        }
    }
};
