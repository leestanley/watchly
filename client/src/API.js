import axios from 'axios';
//import fbase from './firebase';

const baseURL = process.env.REACT_APP_API_URL;

export default {
    getPosts: function () {
        return axios.get(`${baseURL}/posts`);
    },
    createPost: function (user, content, id, rating) {
        const config = {
            method: 'post',
            url: `${baseURL}/posts`,
            data: {
                username: user,
                content: content,
                id: id,
                rating: rating
            }
        };
        return axios(config);
    }
};

export { baseURL };