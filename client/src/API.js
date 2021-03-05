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
    },
    createComment: function (user, content, postID) {
        const config = {
            method: 'post',
            url: `${baseURL}/posts/p/${postID}/comment`,
            data: {
                username: user,
                content: content
            }
        };
        return axios(config);
    },
    createReply: function (user, content, postID, commentID) {
        const config = {
            method: 'post',
            url: `${baseURL}/posts/p/${postID}/comment/${commentID}/reply`,
            data: {
                username: user,
                content: content
            }
        };
        return axios(config);
    }
};

export { baseURL };