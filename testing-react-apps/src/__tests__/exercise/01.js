// simple test with ReactDOM
// http://localhost:3000/counter

import {context} from 'msw'
import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(<Counter />, div)
  const [decrementButton, incrementButton] = document.querySelectorAll('button')
  const messageDiv = div.firstChild.querySelector('div')

  expect(messageDiv.textContent).toBe('Current count: 0')
  incrementButton.click()
  expect(messageDiv.textContent).toBe('Current count: 1')
  decrementButton.click()
  expect(messageDiv.textContent).toBe('Current count: 0')
  div.remove()
})

/* eslint no-unused-vars:0 */
