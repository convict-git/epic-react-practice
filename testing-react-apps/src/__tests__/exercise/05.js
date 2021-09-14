// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from '../../components/login-submission'
import {handlers} from 'test/server-handlers'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const testErrorMsgs = {
  UNKNOWN_SERVER: 'something is wrong',
}

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  screen.debug()

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  screen.debug()

  expect(screen.getByText(username)).toBeInTheDocument()
})

test(`omitting the passsword results in an error`, async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  screen.debug()

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  screen.debug()

  // expect(screen.getByRole('alert')).toHaveTextContent(/password required/i)
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})

test(`unknown server error displays the error message`, async () => {
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            message: testErrorMsgs.UNKNOWN_SERVER,
          }),
        )
      },
    ),
  )

  render(<Login />)

  userEvent.click(screen.getByRole('button'), {name: /submit/i})

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert')).toHaveTextContent(
    testErrorMsgs.UNKNOWN_SERVER,
  )
})
