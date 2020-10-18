import axios from 'axios';
// custom import
import { apiBaseURL } from '../config/config';

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
