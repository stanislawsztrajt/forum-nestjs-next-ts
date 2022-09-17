import React from 'react';
import { render } from '@testing-library/react';
import SaveTopicButton from './save-topic-button';

test('should render SaveTopicButton', () => {
  const { getByText } = render(<SaveTopicButton />);

  expect(getByText('')).toBeInTheDocument();
});
