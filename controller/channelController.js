const User = require('../helpers/users');

exports.getChannel = (req,res) => {
  const {channel} = req.params;

  if(!channel) {
    res.json({
      error: 'Missing channel name.'
    })
  }

  User
    .searchUser(channel)
    .then((user) => {
      res.json({
        channel: user.data
      })
    })
    .catch(err => {
      res.json({
        err: err
      })
    })

  
}
