const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
const mongoose = require('mongoose');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

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

const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/login', (req, res) => res.oidc.login({ returnTo: '/graphql' }));
