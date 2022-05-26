const User = require('../helpers/channelHelper');
const NodeCache = require('node-cache');
const myCache = new NodeCache({stdTTL: 300})

exports.getChannel = (req,res) => {

  const {channel} = req.params;

  if(myCache.has(channel)) {
    return res.json(myCache.get(channel))
  }
  
  else {
    const handleRejected = () => {
      res.json({
        err: 'User not found'
      })
    }

    const handleResolved = (data) => {
      User
        .insertChannel(data)
        .then(() => {
          res.json(data)
        })
    }

    const myPromise = new Promise((resolve, reject) => {
      User
        .searchUser(channel)
        .then(data => {
          if(!data.display_name) {
            reject()
          }
          resolve(data)
        })
    });

    myPromise
      .then(value => handleResolved(value))
      .catch(() => handleRejected())
  }
}

exports.allChannels = (req,res) => {
  
  User
    .allChannels()
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
}
