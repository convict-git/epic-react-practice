// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render} from '@testing-library/react'
import useCounter from '../../components/use-counter'
import {act} from 'react-dom/test-utils'

test('exposes the count and increment/decrement functions', () => {
  let returnedValueFromHook
  const CounterExample = () => {
    returnedValueFromHook = useCounter()
    return null
  }
  render(<CounterExample />)

  expect(returnedValueFromHook.count).toBe(0)
  act(() => {
    returnedValueFromHook.increment()
  })
  expect(returnedValueFromHook.count).toBe(1)
  act(() => {
    returnedValueFromHook.decrement()
  })
  expect(returnedValueFromHook.count).toBe(0)
})

test('allows customisation of the initial count', () => {
  let returnedValueFromHook
  const CounterExample = () => {
    returnedValueFromHook = useCounter({initialCount: 5})
    return null
  }
  render(<CounterExample />)

  expect(returnedValueFromHook.count).toBe(5)
  act(() => {
    returnedValueFromHook.increment()
  })
  expect(returnedValueFromHook.count).toBe(6)
  act(() => {
    returnedValueFromHook.decrement()
  })
  expect(returnedValueFromHook.count).toBe(5)
})

test('allows the customisation of the step', () => {
  let returnedValueFromHook
  const CounterExample = () => {
    returnedValueFromHook = useCounter({step: 3})
    return null
  }
  render(<CounterExample />)

  expect(returnedValueFromHook.count).toBe(0)
  act(() => {
    returnedValueFromHook.increment()
  })
  expect(returnedValueFromHook.count).toBe(3)
  act(() => {
    returnedValueFromHook.decrement()
  })
  expect(returnedValueFromHook.count).toBe(0)
})
/* eslint no-unused-vars:0 */
