const router = require('express').Router();
const Channel = require('../controller/channelController')

router
  .route('/:channel')
  .get(Channel.getChannel);

router
  .route('/')
  .get(Channel.allChannels)

module.exports = router;