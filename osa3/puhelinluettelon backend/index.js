const express = require('express');
var morgan = require('morgan');
const app = express();
const port = 3001;

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

const apiRouter = express.Router();

let persons = [
    {
        id: 1,
        number: '+3581234567',
        name: 'Arto Hellas',
    },
    {
        id: 2,
        number: '+3581234567',
        name: 'Ada Lovelace',
    },
    {
        id: 3,
        number: '+3581234567',
        name: 'Abra Abramov',
    },
    {
        id: 4,
        number: '+3581234567',
        name: 'Mary Poppendieck',
    },
];

apiRouter.get('/persons', (req, res) => {
    res.json(persons);
});

apiRouter.get('/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        res.status(400);
        res.send("Parameter 'id' missing or not an integer");
        return;
    }

    const matches = persons.filter((item) => item.id === id);
    if (matches.length === 0) {
        res.status(404);
        res.send('Not found');
        return;
    }

    res.json(matches[0]);
});

apiRouter.delete('/persons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        res.status(400);
        res.send("Parameter 'id' missing or not an integer");
        return;
    }

    let deleted = null;

    persons = persons.filter((item) => {
        if (item.id === id) {
            deleted = item;
            return false;
        }
        return true;
    });

    if (!deleted) res.status(404).send();
    else res.json(deleted);
});

apiRouter.put('/persons/:id', (req, res) => {
    const postedData = req.body;
    if (
        !postedData.name ||
        postedData.name.length === 0 ||
        !postedData.number ||
        postedData.number.length === 0
    ) {
        res.status(400).json({
            error: "Fields 'name' and 'number' are required.",
        });
        return;
    }

    const id = parseInt(req.params.id);
    if (!id) {
        res.status(400);
        res.send("Parameter 'id' missing or not an integer");
        return;
    }

    let updated = null;

    for (let i = 0; i < persons.length; i++) {
        if (persons[i].id === id) {
            persons[i].name = postedData.name;
            persons[i].number = postedData.number;
            updated = persons[i];
            break;
        }
    }

    if (!updated) res.status(404).send();
    else res.json(updated);
});

apiRouter.post('/persons', (req, res) => {
    const postedData = req.body;

    if (
        !postedData.name ||
        postedData.name.length === 0 ||
        !postedData.number ||
        postedData.number.length === 0
    ) {
        res.status(400).json({
            error: "Fields 'name' and 'number' are required.",
        });
        return;
    }

    for (let person of persons) {
        if (person.name === postedData.name) {
            res.status(409).json({
                error: "Field 'name' must be unique; a record already exists by that name.",
            });
            return;
        }
    }
    const newPerson = {
        id: Math.floor(Math.random() * 1000000000),
        name: postedData.name,
        number: postedData.number,
    };
    persons.push(newPerson);
    res.status(201).json(newPerson);
});

app.use('/api', apiRouter);

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
         <p>${new Date().toString()}</p>`,
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
