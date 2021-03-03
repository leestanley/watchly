const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// to avoid an CORS issue
app.use((req, res, next) => {
    // https://localhost:5000
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
    next();
});

// just some default page
app.get('/', (req, res) => res.send("Team Snu's server :)"));

// configure API routes
app.use('/api/users', require('./routes/users'));
app.use('/api/database', require('./routes/db'));
app.use('/api/posts', require('./routes/social'));

const port = (process.env.PORT || 5000);
app.listen(port, () => console.log(`Server started on port ${port}.`));