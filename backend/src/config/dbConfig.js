const mongoose = require('mongoose');

const dbConfig = "mongodb+srv://dbUser:dbUser@cluster0.0zepk.mongodb.net/annotations?retryWrites=true&w=majority"

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;








