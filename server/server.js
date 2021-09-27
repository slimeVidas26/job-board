
const {ApolloServer , gql} = require('apollo-server-express')
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const fs = require('fs')
const loginRoute = require('./routes/LoginRoute')

const app = express();
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');
app.use(cors(), express.json(), expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));


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



app.use( loginRoute)








