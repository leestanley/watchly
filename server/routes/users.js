const express = require('express');
const router = express.Router();
const f = require('../system');

router.post('/createUser', async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    
    if (username && username.length > 0)
        if (email && email.length > 0)
            res.json(await f.createUser(username, email));
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

router.get('/', async (req, res) => res.json(await f.getUsers()));
module.exports = router;