import React from 'react';
import { render } from '@testing-library/react';
import TopicItem from './topic-item';

test('should render TopicItem', () => {
  const { getByText } = render(<TopicItem />);

  expect(getByText('')).toBeInTheDocument();
});
  