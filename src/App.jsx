import { useState } from "react";
import { currencyConverter } from "./API/api";

const App = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handleConvertCurrency
  const handleConvertCurrency = async () => {
    setLoading(true);
    try {
      const res = await currencyConverter(fromCurrency, toCurrency, amount);
      setLoading(false);
      setConvertedAmount(res.data.conversion_result);
    } catch (error) {
      setError("Error fetching conversion rate");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="loader-section">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <hr />

        <div>
          <label htmlFor="currency_amount">
            Amount:
            <input
              type="number"
              id="currency_amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>

        <div className="currency-selector">
          <div>
            <label htmlFor="">
              From:
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
              </select>
            </label>
          </div>

          <div>
            <label htmlFor="">
              To:
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
              </select>
            </label>
          </div>
        </div>

        <button
          disabled={loading || amount <= 0}
          onClick={handleConvertCurrency}
        >
          {loading ? "Converting.." : "Convert"}
        </button>

        <hr />
        {convertedAmount && (
          <div>
            <h2>
              {amount} {fromCurrency} = {convertedAmount.toFixed(2)}
              {` ${toCurrency}`}
            </h2>
          </div>
        )}

        {error && <p>{error}</p>}
      </div>
    </section>
  );
};
export default App;
