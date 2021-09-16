// testing custom hooks
// http://localhost:3000/counter-hook

import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  const {result: values} = renderHook(useCounter)
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
  const {result: values} = renderHook(useCounter, {
    initialProps: {initialCount: 5},
  })
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
  const {result: values} = renderHook(useCounter, {
    initialProps: {initialCount: 5, step: 3},
  })
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
