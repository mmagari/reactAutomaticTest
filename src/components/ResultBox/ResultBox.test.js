import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    const fromCurrency = 'PLN';
    const toCurrency = 'USD';
    const amount = 100;

    render(<ResultBox from={fromCurrency} to={toCurrency} amount={amount} />);

    const resultBox = screen.getByTestId('result-box');

    expect(resultBox).toHaveTextContent('PLN 100.00 = $28.57');
  });

  const testPlnToUsd = [
    { amount: 100, expectedUsdAmount: '28.57' },
    { amount: 50, expectedUsdAmount: '14.29' },
    { amount: 200, expectedUsdAmount: '57.14' },
    { amount: 259, expectedUsdAmount: '74.00'},
  ];

  for (const zloty of testPlnToUsd) {
    it(`should render proper info about conversion when PLN -> USD for amount ${zloty.amount}`, () => {
      const fromCurrency = 'PLN';
      const toCurrency = 'USD';
      const amount = zloty.amount;

      render(<ResultBox from={fromCurrency} to={toCurrency} amount={amount} />);

      const resultBox = screen.getByTestId('result-box');

      const expectedText = `${fromCurrency} ${amount.toFixed(2)} = $${zloty.expectedUsdAmount}`;
      expect(resultBox).toHaveTextContent(expectedText);
    });
  }

  const testUSDtoPLN = [
    { amount: 100, expectedConvertedAmount: '350.00' },
    { amount: 50, expectedConvertedAmount: '175.00' },
    { amount: 200, expectedConvertedAmount: '700.00' },
  ];

  for (const dolar of testUSDtoPLN) {
    it(`should render proper info about conversion when USD -> PLN for amount ${dolar.amount}`, () => {
      const fromCurrency = 'USD';
      const toCurrency = 'PLN';
      const amount = dolar.amount;

      render(<ResultBox from={fromCurrency} to={toCurrency} amount={amount} />);

      const resultBox = screen.getByTestId('result-box');

      const expectedText = `$${amount.toFixed(2)} = ${toCurrency} ${dolar.expectedConvertedAmount}`;
      expect(resultBox).toHaveTextContent(expectedText);
    });
  }

  const testSameCurrency = [
    { fromCurrency: 'PLN', toCurrency: 'PLN', amount: 123.00 },
    { fromCurrency: 'USD', toCurrency: 'USD', amount: 456.78 },
  ];
  
  for (const same of testSameCurrency) {
    it(`should render same currency for ${same.fromCurrency} -> ${same.toCurrency} conversion with amount ${same.amount}`, () => {
      const fromCurrency = same.fromCurrency;
      const toCurrency = same.toCurrency;
      const amount = same.amount;

      render(<ResultBox from={fromCurrency} to={toCurrency} amount={amount} />);

      const resultBox = screen.getByTestId('result-box');

      let expectedText;
      if (fromCurrency === 'USD' && toCurrency === 'USD') {
        expectedText = `$${amount.toFixed(2)} = $${amount.toFixed(2)}`;
      } else {
        expectedText = `${fromCurrency} ${amount.toFixed(2)} = ${toCurrency} ${amount.toFixed(2)}`;
      }
      expect(resultBox).toHaveTextContent(expectedText);
    });
  }

  it('should render "Wrong value..." for negative amount', () => {
    const fromCurrency = 'PLN';
    const toCurrency = 'USD';
    const amount = -100;

    render(<ResultBox from={fromCurrency} to={toCurrency} amount={amount} />);

    const resultBox = screen.getByTestId('result-box');
    expect(resultBox).toHaveTextContent('Wrong value...');
  });
});
