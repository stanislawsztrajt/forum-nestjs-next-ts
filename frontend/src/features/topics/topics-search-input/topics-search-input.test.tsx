import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TopicsSearchInput from './topics-search-input';

const inputValue = 'Test search value'

test('should render TopicsSearchInput and write some data and try to search them', () => {
  const { getByPlaceholderText } = render(<TopicsSearchInput />);

  const input = getByPlaceholderText('Search') as HTMLInputElement
  fireEvent.change(input, { target: { value: inputValue } })
  fireEvent.keyUp(input, { code: 'Enter' })

  expect(input.value).toBe(inputValue)
});

test('should render TopicsSearchInput and write some data and search them using header', () => {
  const { getByPlaceholderText, getByTestId } = render(
      <TopicsSearchInput isHeader />
  );

  const input = getByPlaceholderText('Search') as HTMLInputElement
  const searchButton = getByTestId('search-button') as HTMLButtonElement
  fireEvent.change(input, { target: { value: inputValue } })
  expect(input.value).toBe(inputValue)
});
