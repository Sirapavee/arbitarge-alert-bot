const line = require('@line/bot-sdk')
const express = require("express")
const serverless = require("serverless-http")

const app = express()

// Create a router to handle routes
const router = express.Router();

const lineConfig = {
    channelAccessToken: process.env.ACCESS_TOKEN,
    channelSecret: process.env.SECRET_TOKEN
}

const client = new line.Client(lineConfig)

const handleEvent = async (e) => {
    console.log(e);
    if (e.type !== 'message' || e.message.type !== text) {
        return null
    }
    else if (e.type === 'message') {
        return client.replyMessage(e.replyToken, { type: 'text', text: 'test' })
    }
}

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/index`, router);

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
    try {
        const events = req.body.events
        console.log('event: ', events);
        return events.length > 0 ? await events.map((item) => handleEvent(item)) : res.status(200).send('OK')
    } catch (e) {
        res.status(500).end()
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

module.export = app;
module.exports.handler = serverless(app);