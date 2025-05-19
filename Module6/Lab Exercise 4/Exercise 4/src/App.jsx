import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BigCats from './BigCats'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BigCats></BigCats>
    </>
  )
}

export default App
