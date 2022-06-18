const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const Router = require('./routes');

const dotenv = require('dotenv');
dotenv.config();

const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

const app = express();
const port = process.env.PORT || 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(auth(config));
app.use('/', Router);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  context: ({ req }) => ({ req }),
});

apolloServer
  .start()
  .then(() => {
    apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' });
  })
  .catch((err) => {
    console.error(err);
  });

app.use('/graphql', Router, requiresAuth());

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
