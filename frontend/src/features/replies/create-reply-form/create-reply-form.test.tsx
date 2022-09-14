import React from 'react';
import { render } from '@testing-library/react';
import CreateReplyForm from './create-reply-form';

test('should render CreateReplyForm', () => {
  const { getByText } = render(<CreateReplyForm />);

  expect(getByText('')).toBeInTheDocument();
});
