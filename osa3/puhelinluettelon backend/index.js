require('dotenv').config();
const express = require('express');
var morgan = require('morgan');
const app = express();
const port = 3000;
const apiRouter = require('./apiRouter');
const Entry = require('./models/entry');

app.use(express.json());

app.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'),
            '-',
            tokens['response-time'](req, res),
            'ms',
            JSON.stringify(req.body),
        ].join(' ');
    }),
);

app.use(express.static('front/dist'));

const errorHandler = (err, _req, res) => {
    console.error(err.message);
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    return res.status(500).send();
};

apiRouter.use(errorHandler);
app.use('/api', apiRouter);

app.get('/info', (_req, res, next) => {
    Entry.countDocuments({})
        .then((count) => {
            res.send(
                `<p>Phonebook has info for ${count} people</p>
         <p>${new Date().toString()}</p>`,
            );
        })

        .catch((err) => next(err));
});

app.use(errorHandler);

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
});
