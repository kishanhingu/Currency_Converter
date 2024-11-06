import axios from "axios";
// /latest/USD

const api = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_API_KEY}`,
});

// get method
export const currencyConverter = (fromCurrency, toCurrency, amount) => {
  return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
};
