require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const SERVER_PORT = 4444;

app.use(express.json());
app.use(cors());

const channelRoute = require('./routes/channel');

app.use('/channel', channelRoute);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening at port ${SERVER_PORT}`)
})

