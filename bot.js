import axios from "axios";
// Load the Telegram API library
import TelegramBot from "node-telegram-bot-api";
import 'dotenv/config'

const LIMIT_NUMBER_OF_COIN = 1;
const API_CMC = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${LIMIT_NUMBER_OF_COIN}&sort=date_added&sort_dir=desc`;
const API_KEY = process.env.YOUR_API_KEY;
// Define our PRIVATE token!
const BOT_TOKEN = process.env.YOUR_BOT_TOKEN;
// Initialize and connect the bot
const bot = new TelegramBot(BOT_TOKEN, {
  polling: true,
});
let response = null;

new Promise(async (resolve, reject) => {
  try {
    response = await axios.get(API_CMC, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
    });
  } catch (ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const jsons = response.data.data;
    const data = {
      Name: jsons[0].name,
      Symbol: jsons[0].symbol,
      Max_supply: jsons[0].max_supply,
      Total_supply: jsons[0].total_supply,
      Platform: jsons[0].platform.name,
      Token_address: jsons[0].platform.token_address,
    };
    resolve(jsons);

    // Create an /newCoin command in telegram
    bot.onText(/\/command1/, function (msg) {
      console.log("Received an request");
      const message = JSON.stringify(data,null,'\t')
      bot.sendMessage(msg.chat.id, message);
      console.log("Sent the request successfully");
    });
  }
});
