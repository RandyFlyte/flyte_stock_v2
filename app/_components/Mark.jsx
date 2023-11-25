const Mark = ({ symbolData, position }) => {
  return (
    <span>
      {symbolData[position.symbol] &&
      symbolData[position.symbol].bid &&
      symbolData[position.symbol].ask
        ? (
            (symbolData[position.symbol].bid +
              symbolData[position.symbol].ask) /
            2
          ).toFixed(2)
        : 'N/A'}
    </span>
  );
};

export default Mark;
