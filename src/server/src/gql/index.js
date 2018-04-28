import graphqlHTTP from "express-graphql";
import schema from './schema';
import root from './root';

export default graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
});
