// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import {computeHeadingLevel} from '@testing-library/dom'
import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child => {
    const newChild = React.cloneElement(child, {on, toggle})
    // console.log(typeof newChild.type)
    // return typeof newChild.type === 'function' ? newChild : child
    return allowedTypes.includes(child.type) ? newChild : child
  })
}

// Accepts `on` and `children` props and returns `children` if `on` is true
const ToggleOn = ({on, children}) => (on ? children : null)

// Accepts `on` and `children` props and returns `children` if `on` is false
const ToggleOff = ({on, children}) => (!on ? children : null)

// Accepts `on` and `toggle` props and returns the <Switch /> with those props.
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />

const MyFakeToggler = ({on, toggle}) => (on ? 'hey there' : 'can you see me?')

const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
        <MyFakeToggler />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
