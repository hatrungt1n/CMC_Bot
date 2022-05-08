const axios = require("axios");

const LIMIT_NUMBER_OF_COIN = 1;
const API_CMC = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${LIMIT_NUMBER_OF_COIN}&sort=date_added&sort_dir=desc`;
const YOUR_API_KEY = "b29999f8-0e9d-4181-817f-0101e1577a56";

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get(API_CMC, {
      headers: {
        "X-CMC_PRO_API_KEY": YOUR_API_KEY,
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
        "Name": jsons[0].name,
        "Symbol": jsons[0].symbol,
        "Max_supply": jsons[0].max_supply,
        "Total_supply": jsons[0].total_supply,
        "Platform": jsons[0].platform.name,
        "Token_address": jsons[0].platform.token_address
    }
    console.log(data);
    resolve(jsons);
  }
});
