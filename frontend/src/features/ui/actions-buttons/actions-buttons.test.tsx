import React from 'react';
import { render } from '@testing-library/react';
import ActionsButtons from './actions-buttons';

test('should render ActionsButtons', () => {
  const { getByText } = render(<ActionsButtons />);

  expect(getByText('')).toBeInTheDocument();
});
