const express = require('express');
const router = express.Router();
const f = require('../system');

router.post('/createUser', async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let profilePic = req.body.profilePic || undefined;
    
    if (username && username.length > 0)
        if (email && email.length > 0)
            res.json(await f.createUser(username, email, profilePic));
        else
            res.json(`Please provide an email.`);
    else
        res.json(f.createError(`Please provide a username.`));
});

router.get('/u/:username', async (req, res) => {
    let username = req.params.username;

    if (username && username.length > 0)
        res.json(await f.getUser(username));
    else
        res.json(f.createError(`Please provide a username.`));
});

router.get('/emailRegistered', async (req, res) => {
    let email = req.query.email;

    if (email && email.length > 0)
        res.json(await f.isEmailRegistered(email));
    else
        res.json(f.createError(`Please provide an email.`));
});

router.get('/usernameTaken', async (req, res) => {
    let username = req.query.username;

    if (username && username.length > 0)
        res.json(await f.isUsernameTaken(username));
    else
        res.json(f.createError(`Please provide a username.`));
});

router.get('/getInfoFromEmail', async (req, res) => {
    let email = req.query.email;

    if (email && email.length > 0)
        res.json(await f.getInfoFromEmail(email));
    else
        res.json(f.createError(`Please provide an email.`));
});

router.get('/', async (req, res) => res.json(await f.getUsers()));
module.exports = router;