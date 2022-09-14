import React from 'react';
import { render } from '@testing-library/react';
import ConfirmationModal from './confirmation-modal';

test('should render ConfirmationModal', () => {
  const { getByText } = render(<ConfirmationModal />);

  expect(getByText('')).toBeInTheDocument();
});
