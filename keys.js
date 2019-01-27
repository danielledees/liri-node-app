console.log('this is loaded');
require("dotenv").config();
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// Client ID: 854b035079f24af5b991b2fcde5d04f6
// Client Secret: c3ea868800cb40b1aa32ffdbb8f319b0