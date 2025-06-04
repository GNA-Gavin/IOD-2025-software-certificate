import { useState } from 'react'
import './App.css'
import BitcoinRates from './BitcoinRates'
import Emoji from './Emoji'
import { MoodProvider } from './MoodContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MoodProvider>
    <Emoji></Emoji>
      <BitcoinRates></BitcoinRates>
      </MoodProvider>
    </>
  )
}

export default App
