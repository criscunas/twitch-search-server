const User = require('../helpers/users');
const NodeCache = require('node-cache');
const myCache = new NodeCache({stdTTL: 300})


exports.getChannel = (req,res) => {

  const {channel} = req.params;

  if(myCache.has(channel)) {
    console.log('from cache')
    return res.json(myCache.get(channel))
  } 
  else {
    User
      .searchUser(channel)
      .then((user) => {    
        console.log('from api')
        myCache.set(channel, user)
          res.json({
            display_name: user.display_name,
            followers: user.followers
        })
      })
      .catch(err => {
        res.json({
          err: err
        })
      })
    }
}
