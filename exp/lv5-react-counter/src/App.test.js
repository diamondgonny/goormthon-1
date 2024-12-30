import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('the counter starts at 0', () => {
  render(<App />);
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent(0);
});

test('the counter decreases by 1 when the - button is clicked', () => {
  render(<App />);
  const minusButton = screen.getByTestId('minus-button');
  fireEvent.click(minusButton);
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent(-1);
});

test('the counter increases by 1 when the + button is clicked', () => {
  render(<App />);
  const plusButton = screen.getByTestId('plus-button');
  fireEvent.click(plusButton);
  const counterElement = screen.getByTestId('counter');
  expect(counterElement).toHaveTextContent(1);
});

test('the on/off button has blue color', () => {
  render(<App />);
  const onOffButton = screen.getByTestId('on/off-button');
  expect(onOffButton).toHaveStyle({ backgroundColor: 'blue' });
});

test('prevent the -, + button from being clicked when the on/off button is clicked', () => {
  render(<App />);
  const onOffButton = screen.getByTestId('on/off-button');
  fireEvent.click(onOffButton);
  const minusButton = screen.getByTestId('minus-button');
  const plusButton = screen.getByTestId('plus-button');
  expect(minusButton).toBeDisabled();
  expect(plusButton).toBeDisabled();
});
