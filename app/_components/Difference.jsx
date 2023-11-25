const Difference = ({ symbolData, position }) => {
  const calculateDifference = () => {
    if (
      symbolData[position.symbol] &&
      symbolData[position.symbol].bid &&
      symbolData[position.symbol].ask
    ) {
      return (
        (((symbolData[position.symbol].bid + symbolData[position.symbol].ask) /
          2) *
          position.quantity -
          position.price) *
        100
      ).toFixed(2);
    } else {
      return 'N/A';
    }
  };

  return <span>$ {calculateDifference()}</span>;
};

export default Difference;
