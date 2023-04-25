const line = require('@line/bot-sdk')
const express = require("express")
const axios = require('axios').default
const dotenv = require('dotenv')

const app = express()
const env = dotenv.config().parsed

const lineConfig = {
    channelAccessToken: env.ACCESS_TOKEN,
    channelSecret: env.SECRET_TOKEN
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

app.post('/webhook', line.middleware(lineConfig), async (req, res) => {
    try {
        const events = req.body.events
        console.log('event: ', events);
        return events.length > 0 ? await events.map((item) => handleEvent(item)) : res.status(200).send('OK')
    } catch (e) {
        res.status(500).end()
    }
})

const port = env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})