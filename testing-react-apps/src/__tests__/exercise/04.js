// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  screen.debug()
  const userNameTextBox = screen.getByLabelText(/username/i)
  const passwordTextBox = screen.getByLabelText(/password/i)

  const data = {
    username: 'chucknorris',
    password: 'i need no password',
  }

  userEvent.type(userNameTextBox, data.username)
  userEvent.type(passwordTextBox, data.password)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith(data)
})

/*
eslint
  no-unused-vars: "off",
*/
