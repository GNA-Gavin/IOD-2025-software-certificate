import { useState, useEffect } from "react";

const currencies = ["USD", "AUD", "NZD", "GBP", "EUR", "SGD"];
const currencySymbols = {
  USD: "$",
  AUD: "A$",
  NZD: "NZ$",
  GBP: "£",
  EUR: "€",
  SGD: "S$",
};

function BitcoinRates() {
  const [currency, setCurrency] = useState(currencies[0]);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);

    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency.toLowerCase()}`
    )
      .then((response) => {
        if (!response.ok) throw new Error(response.message);
        return response.json();
      })
      .then((json) => {
        if (!ignore) {
          setRate(json.bitcoin[currency.toLowerCase()]);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(`Error: ${err.message}`);
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [currency]);

  const options = currencies.map((curr) => (
    <option value={curr} key={curr}>
      {curr}
    </option>
  ));

  return (
    <div className="BitcoinRates componentBox">
      <h3>Bitcoin Exchange Rate</h3>
      <label>
        Choose currency:
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {options}
        </select>
      </label>
      <br />
      <br />

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && rate && (
        <div>
          1 Bitcoin = {currencySymbols[currency]}
          {rate}
        </div>
      )}
    </div>
  );
}

export default BitcoinRates;
