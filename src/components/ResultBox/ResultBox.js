import PropTypes from 'prop-types';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';

import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {
  // Handle negative values and return early with "Wrong value..."
  if (amount < 0) {
    return <div className={styles.result} data-testid="result-box">Wrong value...</div>;
  }

  let formattedAmount;
  let convertedAmount;

  // Calculate formattedAmount based on from currency
  formattedAmount = formatAmountInCurrency(amount, from);

  // Calculate convertedAmount based on from and to currencies
  if (from === 'USD' && to === 'PLN') {
    convertedAmount = convertUSDToPLN(amount);
  } else if (from === 'PLN' && to === 'USD') {
    convertedAmount = convertPLNToUSD(amount);
  } else {
    convertedAmount = formatAmountInCurrency(amount, from);
  }

  return (
    <div data-testid="result-box" className={styles.result}>
      {formattedAmount} = {convertedAmount}
    </div>
  );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
}

export default ResultBox;