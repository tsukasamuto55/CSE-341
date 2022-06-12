const resolvers = require('./users');

module.exports = {
  Query: {
    ...resolvers.Query,
  },
  Mutation: {
    ...resolvers.Mutation,
  },
};
