const User = require('../helpers/channelHelper');
const NodeCache = require('node-cache');
const myCache = new NodeCache({stdTTL: 300})

exports.getChannel = (req,res) => {

  const {channel} = req.params;

  if(myCache.has(channel)) {
    console.log('from cache')
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
          console.log('from api')
          res.json(data)
        })
    }

    const myPromise = new Promise((resolve, reject) => {
      User
        .searchUser(channel)
        .then(data => {
          myCache.set(channel, data)

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
