const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
const schema = require('./schema/schema');

const dotenv = require('dotenv');
dotenv.config();

mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error(err));

mongoose.connection.once('open', () => console.log('Connected to Mongo DB'));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, (err) => {
  if (err) console.log('There are some errors');
  console.log(`Listening on Port ${port}`);
});
