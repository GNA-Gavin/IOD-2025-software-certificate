import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Greeting from './Greeting'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Default greeting */}
      <Greeting />
      
      {/* Greeting with name prop */}
      <Greeting name="John" />
      
      {/* Greeting with name and children */}
      <Greeting name="Katie">
        <p>Welcome to our React application!</p>
      </Greeting>
      
      {/* Greeting with just children */}
      <Greeting>
        <p>Have a wonderful day!</p>
      </Greeting>
    </>
  )
}

export default App
