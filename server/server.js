
const {ApolloServer , gql} = require('apollo-server-express')
const fs = require('fs')
const express = require('express');
const loginRoute = require('./routes/loginRoute')

const app = express();

  //plugin express to apollo server
(async function startApolloServer(typeDefs , resolvers) {
 typeDefs = gql(fs.readFileSync('./schema.graphql' , {encoding:'utf8'}))
 resolvers = require('./resolvers')
const apolloServer = new ApolloServer({typeDefs , resolvers});
//console.log(apolloServer.graphqlPath)
// without this, apollo will throw an error.
await apolloServer.start();
apolloServer.applyMiddleware({ app });
const port = 9000;
//app.listen(port, () => console.info(`Server started on port ${port}`));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}${apolloServer.graphqlPath}`))
})();

app.use(loginRoute)










