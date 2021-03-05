const db = require('./firebase');
const axios = require('axios').default;

const API_KEY = process.env.MOVIE_DB_API_KEY;
const api = {
    BASE_THUMBNAIL_URL: 'https://www.themoviedb.org/t/p/w220_and_h330_face',
    createError: (message, data) => {
        return {
            success: false,
            message,
            ...data
        };
    },
    createSuccess: (data) => {
        return {
            success: true,
            ...data
        };
    },
    getNextPostId: async () => {
        let ref = db.ref('global');
        let result = await ref.once('value');

        if (result.exists()) {
            let old = result.val()['post_id'];

            await ref.update({
                post_id: (old + 1)
            });

            return old;
        } else {
            await ref.set({
                post_id: 1,
                comment_id: 0
            });

            return 0;
        }
    },
    getNextCommentId: async() => {
        let ref = db.ref('global');
        let result = await ref.once('value');

        if (result.exists()) {
            let old = result.val()['comment_id'];

            await ref.update({
                comment_id: (old + 1)
            });

            return old;
        } else {
            await ref.set({
                post_id: 0,
                comment_id: 1
            });

            return 0;
        }
    },
    createUser: async (username, email, profilePicture=undefined) => {
        let result = await api.getUser(username);
        if (result.success)
            return api.createError(`User "${username}" already exists.`);
        
        if (profilePicture === undefined)
            profilePicture = `https://ui-avatars.com/api/?name=${username.substring(0, 1).toUpperCase()}&background=random`

        let ref = db.ref(`users/${username}`);
        try {
            await ref.set({
                username,
                email,
                profilePicture
            });

            return api.createSuccess();
        } catch (e) {
            return api.createError(`Error when creating a new user: ${e.message}`);
        }
    },
    deleteUser: async (username) => {
        let ref = db.ref(`users/${username}`);
        let result = await ref.once('value');
        if (result.exists()) {
            try {
                await ref.remove();
                return api.createSuccess();
            } catch (e) {
                return api.createError(`Error when deleting the user: ${e.message}`);
            }
        } else {
            return api.createError(`User "${username}" does not exist.`);
        }
    },
    getUser: async (username) => {
        let ref = db.ref(`users/${username}`);
        let result = await ref.once('value');
        if (result.exists()) {
            return api.createSuccess({
                user: result.val()
            });
        } else {
            return api.createError(`User "${username}" does not exist.`);
        }
    },
    getUsers: async () => {
        let ref = db.ref(`users`);
        let result = await ref.once('value');
        if (result.exists()) {
            let users = [];
            for (let [username, data] of Object.entries(result.val()))
                users.push(data);
            
            return api.createSuccess({
                users
            });
        } else {
            // no users
            return api.createSuccess({
                users: []
            });
        }
    },
    isEmailRegistered: async (email) => {
        let result = await api.getUsers();

        for (let i = 0; i < result.users.length; i++) {
            let u = result.users[i];

            if (u.email.toLowerCase() === email.toLowerCase()) return api.createSuccess();
        }

        return api.createError(`Email "${email}" is not registered.`);
    },
    isUsernameTaken: async (username) => {
        let result = await api.getUsers();

        for (let i = 0; i < result.users.length; i++) {
            let u = result.users[i];

            if (u.username.toLowerCase() === username.toLowerCase()) return api.createSuccess();
        }

        return api.createError(`Username "${username}" is not taken.`);
    },
    getDetails: async (id) => {
        // we don't know if this id is movie/tv so we'll try both :(
        const BASE_MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
        const BASE_TV_URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`;
        
        try {
            let res = await axios.get(BASE_MOVIE_URL);
            let data = res.data;

            return {
                id: data.id,
                voteAverage: data['vote_average'],
                poster: (data['poster_path'] === null) ? '' : api.BASE_THUMBNAIL_URL + data['poster_path'],
                description: data.overview,
                title: data.title,
                releaseDate: data['release_date']
            };
        } catch (e) {
            // now we try tv...
            try {
                let res = await axios.get(BASE_TV_URL);
                let data = res.data;
                
                return {
                    id: data.id,
                    voteAverage: data['vote_average'],
                    poster: (data['poster_path'] === null) ? '' : api.BASE_THUMBNAIL_URL + data['poster_path'],
                    description: data.overview,
                    title: data.name,
                    releaseDate: data['first_air_date']
                };
            } catch (e) {
                return null;
            }
        }
    },
    getPosts: async () => {
        let ref = db.ref('posts');
        let curr = await ref.once('value');

        let posts = [];
        if (curr.exists())
            posts = curr.val();
        
        // define the comments field, if not already
        // but also add the user info
        let new_edited = [];
        for (let i = 0; i < posts.length; i++) {
            let p = posts[i];
            if ((p !== null) && (p !== undefined)) {
                let userResult = await api.getUser(p.username);
                if (!userResult.success) continue; // if they don't exist anymore, then rip their post
                p['user_info'] = userResult.user;

                // add user info for each comment as well
                p.comments = (p.comments || []);
                for (let j = 0; j < p.comments.length; j++) {
                    let c = p.comments[j];
                    if ((c !== null) && (c !== undefined)) {
                        userResult = await api.getUser(c.username);
                        if (!userResult.success) continue; // if they don't exist anymore, then rip their comment
                        c['user_info'] = userResult.user;
                    }
                }
                
                new_edited.push(p);
            }
        }

        return api.createSuccess({
            posts: new_edited
        });
    },
    createPost: async (username, rating, id, content) => {
        let userResult = await api.getUser(username);
        if (!userResult.success)
            return api.createError(`User "${username}" does not exist.`);
        
        let details = await api.getDetails(id);
        if (details === null)
            return api.createError(`Invalid id.`);
        
        let newId = await api.getNextPostId(); // assign a post id to this new post
        let ref = db.ref(`posts/${newId}`);

        await ref.set({
            username,
            rating,
            id,
            post_id: newId,
            details,
            content
        });
        
        return api.createSuccess();
    },
    getPostsById: async (id) => {
        let result = await api.getPosts();
        let posts = result.posts;

        return api.createSuccess({
            posts: posts.filter(p => p.id == id)
        });
    },
    getPostsByPostId: async (id) => {
        let result = await api.getPosts();
        let posts = result.posts;
        let post = posts.find(p => p['post_id'] == id);

        if (post !== undefined)
            return api.createSuccess({
                post
            });
        else
            return api.createError(`Cannot find post of post id "${id}".`);
    },
    deletePost: async(id) => {
        let ref = db.ref(`posts/${id}`);
        let result = await ref.once('value');

        if (!result.exists())
            return api.createError(`Cannot find post of post id "${id}".`);
        
        await ref.remove();
        return api.createSuccess();
    },
    comment: async(id, username, content) => {
        let userResult = await api.getUser(username);
        if (!userResult.success)
            return api.createError(`User "${username}" does not exist.`);

        let ref = db.ref(`posts/${id}`);
        let result = await ref.once('value');

        if (!result.exists())
            return api.createError(`Cannot find post of post id "${id}".`);

        let post = result.val();
        post.comments = (post.comments || []); // in case it's not defined already

        post.comments.push({
            comment_id: await api.getNextCommentId(),
            username,
            content
        });

        await ref.update({
            comments: post.comments
        });

        return api.createSuccess();
    },
    deleteComment: async (id, comment_id) => {
        let ref = db.ref(`posts/${id}`);
        let result = await ref.once('value');

        if (!result.exists())
            return api.createError(`Cannot find post of post id "${id}".`);

        let post = result.val();
        post.comments = (post.comments || []); // in case it's not defined already

        await ref.update({
            comments: post.comments.filter(p => p['comment_id'] != comment_id)
        });

        return api.createSuccess();
    }
};

module.exports = api;