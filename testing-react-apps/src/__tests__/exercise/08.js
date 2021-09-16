// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

const CounterExample = () => {
  const {count, increment, decrement} = useCounter(0)
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<CounterExample />)

  const countMessageDisplay = screen.getByText(/current count/i)
  const incrementButton = screen.getByRole('button', {name: 'increment'})
  const decrementButton = screen.getByRole('button', {name: 'decrement'})

  expect(countMessageDisplay).toHaveTextContent('Current count: 0')
  userEvent.click(incrementButton)
  expect(countMessageDisplay).toHaveTextContent('Current count: 1')
  userEvent.click(decrementButton)
  expect(countMessageDisplay).toHaveTextContent('Current count: 0')
})

/* eslint no-unused-vars:0 */
