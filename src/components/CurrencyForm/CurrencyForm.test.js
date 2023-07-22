import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  it('should run action callback with proper data on form submit', () => {
    const action = jest.fn();

    // render component
    render(<CurrencyForm action={action} />);

    // find field elems
    const amountField = screen.getByTestId('amount');
    const fromField = screen.getByTestId('from-select');
    const toField = screen.getByTestId('to-select');

    // set test values to fields
    userEvent.type(amountField, '100');
    userEvent.selectOptions(fromField, 'PLN');
    userEvent.selectOptions(toField, 'USD');

    // find “convert” button
    const submitButton = screen.getByText('Convert');

    // simulate user click on "convert" button
    userEvent.click(submitButton);

    // check if action callback was called once
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith({ amount: 100, from: 'PLN', to: 'USD' });

    cleanup();
  });

  const testCases = [
    { amount: 20, from: 'USD', to: 'PLN' },
    { amount: 200, from: 'PLN', to: 'USD' },
    { amount: 345, from: 'USD', to: 'PLN' },
  ];

  for (let i = 0; i < testCases.length; i++) {
    it(`should run action callback with proper data for test case ${i + 1}`, () => {
      const action = jest.fn();

      // re-render component with a clean state for each test case
      render(<CurrencyForm action={action} />);

      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');

      userEvent.clear(amountField);
      userEvent.type(amountField, testCases[i].amount.toString());
      userEvent.selectOptions(fromField, testCases[i].from);
      userEvent.selectOptions(toField, testCases[i].to);

      const submitButton = screen.getByText('Convert');
      userEvent.click(submitButton);

      expect(action).toHaveBeenCalledWith({
        amount: testCases[i].amount,
        from: testCases[i].from,
        to: testCases[i].to,
      });

      cleanup();
    });
  }
});
