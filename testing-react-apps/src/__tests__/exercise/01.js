// simple test with ReactDOM
// http://localhost:3000/counter

import {click} from '@testing-library/user-event/dist/click'
import {context} from 'msw'
import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

beforeEach(() => {
  // accepts a callback to be run before each test
  document.body.innerHTML = '' // initialised with empty string (so stupid, unmount?)
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)
  ReactDOM.render(<Counter />, div)
  const [decrementButton, incrementButton] = document.querySelectorAll('button')
  const messageDiv = div.firstChild.querySelector('div')

  expect(messageDiv.textContent).toBe('Current count: 0')

  const clickEvent = new MouseEvent('click', {
    bubbles: true, // allowing event delegation
    cancelable: true,
    button: 0, // primary click (generally, left click)
  })

  incrementButton.dispatchEvent(clickEvent)

  expect(messageDiv.textContent).toBe('Current count: 1')

  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true, // allowing event delegation
    cancelable: true,
    button: 0, // primary click (generally, left click)
  })

  decrementButton.dispatchEvent(clickEvent)

  expect(messageDiv.textContent).toBe('Current count: 0')

  div.remove()
})

/* eslint no-unused-vars:0 */
