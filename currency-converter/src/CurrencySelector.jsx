import React from 'react';

const CurrencySelector = ({ currencies, selectedCurrency, onChange }) => (
  <select
    value={selectedCurrency}
    onChange={(e) => onChange(e.target.value)}
    className="p-2 border rounded"
  >
    {currencies.map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ))}
  </select>
);

export default CurrencySelector;
