import React from 'react';
import { render } from '@testing-library/react';
import CreateTopicForm from './create-topic-form';

test('should render CreateTopicForm', () => {
  const { getByText } = render(<CreateTopicForm />);

  expect(getByText('')).toBeInTheDocument();
});
