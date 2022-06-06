const graphql = require('graphql');
const { GraphQLEnumType } = graphql;

const PopularityEnumType = new GraphQLEnumType({
  name: 'PopularityEnum',
  values: {
    LOW: { value: 'low' },
    MEDIUM: { value: 'medium' },
    HIGH: { value: 'high' },
  },
});

module.exports = PopularityEnumType;
