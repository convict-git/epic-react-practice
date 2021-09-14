// Avoid implementation details
// http://localhost:3000/counter

import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)

  const decrementButton = screen.getByRole('button', {name: /decrement/i})
  const incrementButton = screen.getByRole('button', {name: /increment/i})

  const messageDiv = screen.getByText(/current count/i)
  expect(messageDiv).toHaveTextContent('Current count: 0')

  fireEvent.click(incrementButton)
  expect(messageDiv).toHaveTextContent('Current count: 1')

  fireEvent.click(decrementButton)
  expect(messageDiv).toHaveTextContent('Current count: 0')
})
