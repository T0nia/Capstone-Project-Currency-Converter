import React from 'react';

const AmountInput = ({ amount, onChange }) => (
  <input
    type="number"
    value={amount}
    onChange={(e) => onChange(e.target.value)}
    className="p-2 border rounded"
    placeholder="Enter amount"
  />
);

export default AmountInput;
