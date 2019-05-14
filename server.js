const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const { findOrCreateUser } = require("./controllers/userController");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connect"))
  .catch(error => console.log("Error: ", error));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = findOrCreateUser(authToken);
      }
    } catch (err) {
      console.error(
        `Unable to authenticate user with token ${authToken}, error: ${error}`
      );
    }
    return { currentUser };
  }
});

server.listen().then(({ url }) => console.log(`server listening on ${url}`));
