// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render} from '@testing-library/react'
import useCounter from '../../components/use-counter'
import {act} from 'react-dom/test-utils'

const testCustomHook = (hook, {...initialProps} = {}) => {
  let returnedValueFromHook
  const TestComponent = () => {
    returnedValueFromHook = hook({...initialProps})
    return null
  }
  render(<TestComponent />)
  return returnedValueFromHook
}

test('exposes the count and increment/decrement functions', () => {
  const values = testCustomHook(useCounter)
  expect(values.count).toBe(0)
  act(() => {
    values.increment()
  })
  expect(values.count).toBe(1)
  act(() => {
    values.decrement()
  })
  expect(values.count).toBe(0)
})

test('allows customisation of the initial count', () => {
  const values = testCustomHook(useCounter, {initialCount: 5})
  expect(values.count).toBe(5)
  act(() => {
    values.increment()
  })
  expect(values.count).toBe(6)
  act(() => {
    values.decrement()
  })
  expect(values.count).toBe(5)
})

test('allows the customisation of the step', () => {
  const values = testCustomHook(useCounter, {initialCount: 5, step: 3})
  expect(values.count).toBe(5)
  act(() => {
    values.increment()
  })
  expect(values.count).toBe(8)
  act(() => {
    values.decrement()
  })
  expect(values.count).toBe(5)
})
/* eslint no-unused-vars:0 */
