import React from 'react';
import { render } from '@testing-library/react';
import ReplyList from './reply-list';

test('should render ReplyList', () => {
  const { getByText } = render(<ReplyList />);

  expect(getByText('')).toBeInTheDocument();
});
