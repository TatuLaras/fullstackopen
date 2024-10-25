const mongoose = require('mongoose');

let add = false;

if (process.argv.length === 5) {
    add = true;
} else if (process.argv.length !== 3) {
    console.log(`usage: 
    1) node mongo.js <password>
    2) node mongo.js <password> <name> <number>
`);
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@fullstack.14zgb.mongodb.net/?retryWrites=true&w=majority&appName=fullstack`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Entry = mongoose.model('Entry', entrySchema);

if (add) {
    const name = process.argv[3];
    const number = process.argv[4];
    const entry = new Entry({
        name,
        number,
    });

    entry.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
    });
} else {
    Entry.find({}).then((result) => {
        result.forEach((entry) => {
            console.log(`${entry.name} ${entry.number}`);
        });
        mongoose.connection.close();
    });
}
