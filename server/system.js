const db = require('./firebase');
const api = {
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
    createUser: async (username, email, name, profilePicture=undefined) => {
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

            if (u.email === email) return api.createSuccess();
        }

        return api.createError(`Email "${email}" is not registered.`);
    }
};

module.exports = api;