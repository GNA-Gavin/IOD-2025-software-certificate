import { useState } from "react";
import { useDataReducer } from "../hooks/useDataReducer";

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

  // Use the custom hook to fetch bitcoin rate data
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency.toLowerCase()}`;
const { data, loading, error } = useDataReducer(url);

  // Extract the rate from the response data
  const rate = data?.bitcoin?.[currency.toLowerCase()];

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
