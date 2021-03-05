const axios = require('axios').default;
const express = require('express');
const router = express.Router();
const f = require('../system');

const API_KEY = process.env.MOVIE_DB_API_KEY;
router.get('/trending', async (req, res) => {
    let type = req.query.type;

    if ((type === "movie") || (type === "tv")) {
        const url = `https://api.themoviedb.org/3/trending/${type.toLowerCase()}/week?api_key=${API_KEY}`;
        try {
            let response = await axios.get(url);
            let data = response.data;
            let list = [];

            data.results.forEach(d => {
                let entry = {
                    id: d.id,
                    voteAverage: d['vote_average'],
                    poster: (d['poster_path'] === null) ? '' : f.BASE_THUMBNAIL_URL + d['poster_path'],
                    description: d.overview
                };
                
                if (d['media_type'] === 'movie') {
                    entry.title = d.title;
                    entry.releaseDate = d['release_date'];
                } else {
                    // assume it's a tv show
                    entry.title = d.name;
                    entry.releaseDate = d['first_air_date'];
                }

                list.push(entry);
            });

            res.json(f.createSuccess({
                type: type.toLowerCase(),
                list
            }));
        } catch (e) {
            if (e.response)
                res.json(f.createError(e.response.data.errors[0]));
            else
                res.json(f.createError(e.message));
        }
    } else {
        res.json(f.createError(`Please provide the correct type of media: "movie" or "tv".`));
    }
});

router.get('/search', async (req, res) => {
    let page = (req.query.page || '1');
    let query = req.query.query;

    if (page && page.length > 0) {
        if (!isNaN(page)) {
            page = parseInt(page);

            if (page > 0) {
                if (query && query.length > 0) {
                    const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${query}`;
                    try {
                        let response = await axios.get(url);
                        let data = response.data;
                        let list = [];

                        // ignore anything that is not a movie or tv show
                        let relevant = data.results.filter(d => d['media_type'] !== 'people');
                        relevant.forEach(d => {
                            let entry = {
                                id: d.id,
                                voteAverage: d['vote_average'],
                                poster: (d['poster_path'] === null) ? '' : f.BASE_THUMBNAIL_URL + d['poster_path'],
                                description: d.overview
                            };
                            
                            if (d['media_type'] === 'movie') {
                                entry.title = d.title;
                                entry.releaseDate = d['release_date'];
                            } else {
                                // assume it's a tv show
                                entry.title = d.name;
                                entry.releaseDate = d['first_air_date'];
                            }

                            list.push(entry);
                        });

                        res.json(f.createSuccess({
                            page,
                            total_pages: data['total_pages'],
                            list
                        }));
                    } catch (e) {
                        if (e.response)
                            res.json(f.createError(e.response.data.errors[0]));
                        else
                            res.json(f.createError(e.message));
                    }
                } else {
                    res.json(f.createError(`Please provide a search query.`));
                }
            } else {
                res.json(f.createError(`Page must be greater than 0.`));
            }
        } else {
            // not a number
            res.json(f.createError(`Please provide a valid page number.`));
        }
    } else {
        res.json(f.createError(`Please provide a valid page number.`));
    }
});

router.get('/getMedia', async (req, res) => {
    let id = req.query.id;

    if (id && id.length > 0) {
        let details = await f.getDetails(id);

        if (details === null)
            res.json(f.createError(`Please provide a valid id.`));
        else
            res.json(f.createSuccess({
                details
            }));
    } else {
        res.json(f.createError(`Please provide a valid id.`));
    }
});

module.exports = router;