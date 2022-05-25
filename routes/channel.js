const router = require('express').Router();
const Channel = require('../controller/channelController')

router
  .route('/:channel')
  .get(Channel.getChannel);

module.exports = router;