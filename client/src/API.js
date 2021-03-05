import axios from 'axios';
//import fbase from './firebase';

const baseURL = process.env.REACT_APP_API_URL;

export default {
    search: function (query, page = 1) {
        return axios.get(`${baseURL}/database/search?query=${query}&page=${page}`);
    },
    getTrendingMedia: function (type = 'movie') {
        return axios.get(`${baseURL}/database/trending?type=${type}`);
    },
    getPosts: function () {
        return axios.get(`${baseURL}/posts`);
    },
    getMedia: function (id) {
        return axios.get(`${baseURL}/database/getMedia?id=${id}`);
    },
    getPostsWithMedia: function (id) {
        return axios.get(`${baseURL}/posts/get_posts_with_id?id=${id}`);
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
    },
    deletePost: function (postID) {
        return axios.delete(`${baseURL}/posts/p/${postID}`);
    },
    deleteComment: function (postID, commentID) {
        return axios.delete(`${baseURL}/posts/p/${postID}/comment/${commentID}`);
    },
    deleteReply: function (postID, commentID, replyID) {
        return axios.delete(`${baseURL}/posts/p/${postID}/comment/${commentID}/reply/${replyID}`);
    }
};

export { baseURL };