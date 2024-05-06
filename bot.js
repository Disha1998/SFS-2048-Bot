const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;
const PORT = process.env.PORT || 3000;

// Set up the webhook
app.post('/webhook', async (req, res) => {
    const message = req.body.message;
    const chatId = message.chat.id;

    if (message.text.toLowerCase() === "/start") {
        await sendGame(chatId);
    }
    res.sendStatus(200);
});

async function sendGame(chatId) {
    const gameUrl = 'https://2048-disha1998s-projects.vercel.app/';
    const message = 'Click the link to play 2048!';
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: message,
        reply_markup: {
            inline_keyboard: [[{
                text: 'Play 2048!',
                url: gameUrl
            }]]
        }
    });
}

app.listen(PORT, () => {
    console.log(`Bot server running on port ${PORT}`);
});
