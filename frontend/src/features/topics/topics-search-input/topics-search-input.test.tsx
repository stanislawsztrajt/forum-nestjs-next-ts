import React from 'react';
import { render } from '@testing-library/react';
import TopicsSearchInput from './topics-search-input';

test('should render TopicsSearchInput', () => {
  const { getByText } = render(<TopicsSearchInput />);

  expect(getByText('')).toBe('');
});
  