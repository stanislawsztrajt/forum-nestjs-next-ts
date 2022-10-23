import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './button'

test('should render button', () => {
  const { getByText } = render(<Button text='test' />);
  expect(getByText('test')).toBeTruthy();
});


test('should render button and have custom className, bg and action', () => {
  const fn = jest.fn()
  const { getByText } = render(<Button text='test' bg className='text-green-900' action={fn} />);

  const button = getByText('test')
  expect(button).toBeTruthy()
  expect(button.className.includes('text-green-900')).toBeTruthy()
  expect(button.className.includes('button-bg')).toBeTruthy()

  fireEvent.click(button)
  expect(fn.mock.calls.length).toBe(1);
});

test('should render button and have custom className, bg and href', async () => {
  const { getByText } = render(<Button text='test' href='auth/login' bg className='text-green-900' />);
  
  const button = getByText('test')
  expect(button).toBeTruthy()
  expect(button.className.includes('text-green-900')).toBeTruthy()
  expect(button.className.includes('button-bg')).toBeTruthy()

  fireEvent.submit(button)
});