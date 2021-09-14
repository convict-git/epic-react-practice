// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import faker from 'faker'
import Login from '../../components/login'
import {build} from '@jackfranklin/test-data-bot'

const buildLoginForm = overrideFormData => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
  ...overrideFormData,
})

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)
  // screen.debug()
  const userNameTextBox = screen.getByLabelText(/username/i)
  const passwordTextBox = screen.getByLabelText(/password/i)

  const data = buildLoginForm()

  userEvent.type(userNameTextBox, data.username)
  userEvent.type(passwordTextBox, data.password)

  console.log(data)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  expect(handleSubmit).toHaveBeenCalledWith(data)
  expect(handleSubmit).toHaveBeenCalledTimes(1) // called only once
})

/*
eslint
  no-unused-vars: "off",
*/
