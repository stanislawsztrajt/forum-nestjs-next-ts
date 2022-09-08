import React from 'react';
import { render } from '@testing-library/react';
import ReplyItem from './reply-item';

test('should render ReplyItem', () => {
  const { getByText } = render(<ReplyItem />);

  expect(getByText('')).toBeInTheDocument();
});
