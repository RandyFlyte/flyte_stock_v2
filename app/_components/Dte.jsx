import { calculateExpDate } from '../_utils/dateUtils';

const Dte = ({ date }) => {
  const daysUntilExpiration = calculateExpDate(date);

  return <div>{daysUntilExpiration}d</div>;
};

export default Dte;
