import React from 'react';

const ConversionResult = ({ result, rate }) => (
  <div className="mt-4">
    <p className="font-bold">Converted Amount: {result}</p>
    <p className="text-gray-600">Exchange Rate: {rate}</p>
  </div>
);

export default ConversionResult;
