const axios = require('axios');

const searchUser = (username) => 
  axios
    .get(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        "Authorization": "Bearer " + process.env.TOKEN,
        "Client-Id": process.env.CLIENT_ID,
      }
    })
    .then((res) => {
      return res.data
    })
    .catch(err => {
      return err
    })


module.exports = {searchUser}


