import React, { useState, useEffect } from 'react';
import CurrencySelector from './CurrencySelector';
import AmountInput from './AmountInput';
import ConversionResult from './ConversionResult';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch('https://api.frankfurter.app/currencies');
        const data = await response.json();
        setCurrencies(Object.keys(data));
      } catch (error) {
        setError('Failed to fetch currencies');
      }
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (fromCurrency && toCurrency) {
        try {
          const response = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`);
          const data = await response.json();
          const rate = data.rates[toCurrency];
          setResult((amount * rate).toFixed(2));
          setRate(rate);
        } catch (error) {
          setError('Failed to fetch exchange rate');
        }
      }
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <CurrencySelector currencies={currencies} selectedCurrency={fromCurrency} onChange={setFromCurrency} />
        <CurrencySelector currencies={currencies} selectedCurrency={toCurrency} onChange={setToCurrency} />
      </div>
      <AmountInput amount={amount} onChange={setAmount} />
      {result && <ConversionResult result={`${result} ${toCurrency}`} rate={rate} />}
    </div>
  );
};

export default App;
