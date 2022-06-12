const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: '*',
  credentials: true,
};
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

app.use(cors(corsOptions));

apolloServer
  .start()
  .then(() => {
    apolloServer.applyMiddleware({ app, cors: corsOptions, path: '/graphql' });
  })
  .catch((err) => {
    console.error(err);
  });

mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error(err));

mongoose.connection.once('open', () => console.log('Connected to Mongo DB'));

app.listen(port, (err) => {
  if (err) console.log('There are some errors');
  console.log(`Listening on Port ${port}`);
});
