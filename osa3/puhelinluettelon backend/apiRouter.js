const express = require('express');
const Entry = require('./models/entry');

const apiRouter = express.Router();

apiRouter.get('/persons', (_req, res, next) => {
    Entry.find({})
        .then((entries) => res.json(entries))
        .catch((err) => next(err));
});

apiRouter.get('/persons/:id', (req, res, next) => {
    const id = req.params.id;

    Entry.findById(id)
        .then((entry) => {
            if (entry) res.json(entry);
            else res.status(404).send();
        })
        .catch((err) => next(err));
});

apiRouter.delete('/persons/:id', (req, res, next) => {
    const id = req.params.id;

    Entry.findByIdAndDelete(id)
        .then((deleted) => {
            if (deleted) res.status(200).json(deleted);
            else res.status(204).send();
        })
        .catch((err) => next(err));
});

apiRouter.put('/persons/:id', (req, res, next) => {
    const { name, number } = req.body;
    const id = req.params.id;

    Entry.findByIdAndUpdate(
        id,
        { name, number },
        { new: true, runValidators: true, context: 'query' },
    )
        .then((updated) => {
            if (updated) res.json(updated);
            else res.status(404).send();
        })
        .catch((err) => next(err));
});

apiRouter.post('/persons', (req, res, next) => {
    const { name, number } = req.body;

    const entry = new Entry({ name, number });

    entry
        .save()
        .then((added) => {
            res.status(201).json(added);
        })
        .catch((err) => next(err));
});

module.exports = apiRouter;
