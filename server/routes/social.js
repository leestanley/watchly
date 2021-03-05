const express = require('express');
const router = express.Router();
const f = require('../system');

router.get('/', async (req, res) => res.json(f.createSuccess(await f.getPosts())));
router.post('/', async (req, res) => {
    let user = req.body.username;
    let content = req.body.content;
    let id = req.body.id;
    let rating = req.body.rating;

    if (user && user.length > 0) {
        if (content && content.length > 0) {
            if (id && id.length > 0) {
                if (!isNaN(id)) {
                    id = parseInt(id);
                    if (rating && rating.length > 0) {
                        // check if number
                        if (!isNaN(rating)) {
                            let ratingParsed = parseInt(rating);

                            if ((ratingParsed >= 0) && (ratingParsed <= 10)) {
                                // pad it if it's not a float
                                /* if (rating.indexOf('.') === -1)
                                    rating = rating + '.0'; */
                            
                                res.json(await f.createPost(user, rating, id, content));
                            } else {
                                res.json(f.createError('Please provide a valid rating for the movie, from [0.0 to 10.0].'))
                            }
                        } else {
                            res.json(f.createError(`Please provide a valid rating for the movie, from [0.0 to 10.0].`));
                        }
                    } else {
                        res.json(f.createError(`Please provide a valid rating for the movie, from [0.0 to 10.0].`));
                    }
                } else {
                    res.json(f.createError(`Please provide a valid id.`));
                }
            } else {
                res.json(f.createError(`Please provide a valid id.`));
            }
        } else {
            res.json(f.createError(`Please provide content for the post.`));
        }
    } else {
        res.json(f.createError(`Please provide a username.`));
    }
});

router.get('/get_posts_with_id', async (req, res) => {
    let id = req.query.id;

    if (id && id.length > 0)
        res.json(await f.getPostsById(id));
    else
        res.json(f.createError(`Please provide a valid id.`));
});

router.get('/p/:id', async (req, res) => {
    let id = req.params.id;

    if (id && id.length > 0)
        res.json(await f.getPostsByPostId(id));
    else
        res.json(f.createError(`Please provide a valid id.`));
});

router.delete('/p/:id', async (req, res) => {
    let id = req.params.id;

    if (id && id.length > 0)
        res.json(await f.deletePost(id));
    else
        res.json(f.createError(`Please provide a valid id.`));
});

router.post('/p/:id/comment', async (req, res) => {
    let id = req.params.id;
    let user = req.body.username;
    let content = req.body.content;

    if (id && id.length > 0)
        if (user && user.length > 0)
            if (content && content.length > 0)
                res.json(await f.comment(id, user, content));
            else
                res.json(f.createError(`Please provide content for the comment.`));
        else
            res.json(f.createError(`Please provide a username.`));
    else
        res.json(f.createError(`Please provide a valid id.`));
});

router.delete('/p/:id/comment/:comment_id', async (req, res) => {
    let id = req.params.id;
    let comment_id = req.params.comment_id;

    if (id && id.length > 0)
        if (comment_id && comment_id.length > 0)
            res.json(await f.deleteComment(id, comment_id));
        else
            res.json(f.createError(`Please provide a valid comment id.`));
    else
        res.json(f.createError(`Please provide a valid id.`));
});

module.exports = router;