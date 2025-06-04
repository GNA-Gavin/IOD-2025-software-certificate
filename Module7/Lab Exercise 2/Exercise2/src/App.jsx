import { useState } from 'react'
import './App.css'
import BitcoinRates from './BitcoinRates'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BitcoinRates></BitcoinRates>
    </>
  )
}

export default App
