import axios from 'axios';
// custom import
import { apiBaseURL } from '../config/config';

export const getReviews = async (courseId, pageNum) => {
    let getURL = `${apiBaseURL}/courses/${courseId}/reviews?`;
    if (pageNum) {
        getURL = getURL + `page=${pageNum}`;
    }
    try {
        const response = await axios.get(getURL);
        return response.data;
    } catch (err) {
        console.log(err);
    }
};
