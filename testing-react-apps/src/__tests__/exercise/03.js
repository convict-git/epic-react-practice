// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)

  const decrementButton = screen.getByRole('button', {name: /decrement/i})
  const incrementButton = screen.getByRole('button', {name: /increment/i})

  const messageDiv = screen.getByText(/current count/i)
  expect(messageDiv).toHaveTextContent('Current count: 0')

  userEvent.click(incrementButton)
  expect(messageDiv).toHaveTextContent('Current count: 1')

  userEvent.click(decrementButton)
  expect(messageDiv).toHaveTextContent('Current count: 0')
})
