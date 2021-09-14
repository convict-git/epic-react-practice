// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const {container} = render(<Counter />)

  const [decrementButton, incrementButton] =
    container.querySelectorAll('button')
  const messageDiv = container.firstChild.querySelector('div')

  expect(messageDiv.textContent).toBe('Current count: 0')

  fireEvent.click(incrementButton)
  expect(messageDiv.textContent).toBe('Current count: 1')

  fireEvent.click(decrementButton)
  expect(messageDiv.textContent).toBe('Current count: 0')

  // will unmount everything at the end
})
