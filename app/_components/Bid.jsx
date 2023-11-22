import React from 'react';

const Bid = ({ symbolData, position }) => {
  return (
    <span>
      Bid:{' '}
      {symbolData[position.symbol] && symbolData[position.symbol].bid
        ? symbolData[position.symbol].bid
        : 'N/A'}{' '}
    </span>
  );
};

export default Bid;
