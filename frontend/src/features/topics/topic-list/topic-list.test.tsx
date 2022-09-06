import React from 'react';
import { render } from '@testing-library/react';
import TopicList from './topic-list';

test('should render TopicList', () => {
  const { getByText } = render(<TopicList />);

  expect(getByText('')).toBeInTheDocument();
});
  