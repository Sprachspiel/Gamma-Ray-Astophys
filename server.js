const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
const mongoose = require('mongoose');

const app = express();

mongoose.connect({connectionstring});
mongoose.connection.once('open', () => {
    console.log('connected to DB');
});

app.use('/graphql', expressGraphQL({
    schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Server is running on port 4000..');
});
