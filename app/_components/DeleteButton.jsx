import { deletePosition } from '../_utils/apiServices';

const DeleteButton = ({ symbol, setPositions }) => {
  const handleDeletePosition = async () => {
    try {
      const isSuccess = await deletePosition(symbol);
      if (isSuccess) {
        setPositions((currentPositions) =>
          currentPositions.filter((position) => position.symbol !== symbol)
        );
      }
    } catch (error) {
      console.error('Error deleting position:', error);
    }
  };

  return (
    <button className='ml-4' onClick={handleDeletePosition}>
      X
    </button>
  );
};

export default DeleteButton;
