const express = require('express');
const parser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const sendPushNotification = require("./utils/pushNotifications");
const { Expo } = require("expo-server-sdk");

const app = express();

app.use(helmet())
app.use(compression())
app.use(parser.urlencoded({
  extended: false
}))
app.use(parser.json())

app.get('/', (req, res) => {
    res.send('Hello');
})

app.post('/api/token', async (req, res) => {
    const result = await sendPushNotification(req.body.token, req.body.message);

    res.status(200).send('Result ', result);
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Listening to port ' + port + ' successfully'));
