const functions = require('firebase-functions');

exports.helloUser = functions.https.onRequest((req, res) => {
  res.send("Hello, User");
});