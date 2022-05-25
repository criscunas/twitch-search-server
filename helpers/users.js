const axios = require('axios');

const headers = {
  "Authorization": "Bearer " + process.env.TOKEN,
  "Client-Id": process.env.CLIENT_ID,
}

const getFollowCount = (id) => {
 
  let followCount = axios
    .get(`https://api.twitch.tv/helix/users/follows?to_id=${id}`, {
      headers: headers
    })
    .then((res) => {
      return res.data.total
    }) 

  return followCount
}

const searchUser = (username) =>   
  axios
    .get(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: headers
    })
    .then(async (res) => {
      
      let followers = await getFollowCount(res.data.data[0].id)

      let user = {
        display_name:  res.data.data[0].display_name,
        followers: followers
      } 

      return user
    })
    .catch(err => {
      return err
    })


module.exports = {searchUser}


