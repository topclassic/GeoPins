const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.OAUTH);

const verifyAuthToken = async idToken => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.OAUTH
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error verifying auth token", error);
  }
};

const ifUserExists = async email => await User.findOne({ email })
const createNewUser = async googleUser => {
  const { name, email, picture } = googleUser;
  const resp = await User.create({ name, email, picture })
  console.log('resp', resp)
  return resp
};
exports.findOrCreateUser = async token => {
  const googleUser = await verifyAuthToken(token);
  const user = await ifUserExists(googleUser.email);
  
  return user ? user : await createNewUser(googleUser);
};
