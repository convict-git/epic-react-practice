// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render} from '@testing-library/react'
import useCounter from '../../components/use-counter'
import {act} from 'react-dom/test-utils'

const testCustomHook = (hook, {...initialProps} = {}) => {
  const returnedValueFromHook = React.createRef(null)
  const TestComponent = () => {
    returnedValueFromHook.current = hook({...initialProps})
    return null
  }
  render(<TestComponent />)
  return returnedValueFromHook
}

test('exposes the count and increment/decrement functions', () => {
  const values = testCustomHook(useCounter)
  expect(values.current.count).toBe(0)
  act(() => {
    values.current.increment()
  })
  expect(values.current.count).toBe(1)
  act(() => {
    values.current.decrement()
  })
  expect(values.current.count).toBe(0)
})

test('allows customisation of the initial count', () => {
  const values = testCustomHook(useCounter, {initialCount: 5})
  expect(values.current.count).toBe(5)
  act(() => {
    values.current.increment()
  })
  expect(values.current.count).toBe(6)
  act(() => {
    values.current.decrement()
  })
  expect(values.current.count).toBe(5)
})

test('allows the customisation of the step', () => {
  const values = testCustomHook(useCounter, {initialCount: 5, step: 3})
  expect(values.current.count).toBe(5)
  act(() => {
    values.current.increment()
  })
  expect(values.current.count).toBe(8)
  act(() => {
    values.current.decrement()
  })
  expect(values.current.count).toBe(5)
})
/* eslint no-unused-vars:0 */
