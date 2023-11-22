const Ask = ({ symbolData, position }) => {
  return (
    <span>
      {' '}
      Ask:{' '}
      {symbolData[position.symbol] && symbolData[position.symbol].ask
        ? symbolData[position.symbol].ask
        : 'N/A'}{' '}
    </span>
  );
};

export default Ask;
