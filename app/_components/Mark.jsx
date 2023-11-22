import React from 'react';

const Mark = ({ symbolData, position }) => {
  return (
    <span>
      Mark:
      {symbolData[position.symbol] &&
      symbolData[position.symbol].bid &&
      symbolData[position.symbol].ask
        ? (symbolData[position.symbol].bid + symbolData[position.symbol].ask) /
          2
        : 'N/A'}
    </span>
  );
};

export default Mark;
