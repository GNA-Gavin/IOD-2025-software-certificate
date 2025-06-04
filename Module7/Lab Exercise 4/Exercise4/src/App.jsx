import { useState } from 'react'
import './App.css'
import { UserProvider } from './context/UserContext'
import MyThemeProvider from './context/MyThemeContext'
import AppRoutes from './AppRoutes'
import { MoodProvider } from './context/MoodContext'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <MyThemeProvider>
      <UserProvider>
        <MoodProvider>
        {/* <Home></Home>
        <LoginForm></LoginForm>
        <BitcoinRates></BitcoinRates> */}
        <NavBar></NavBar>
        <AppRoutes></AppRoutes>
        </MoodProvider>
      </UserProvider>
    </MyThemeProvider>
    </>
  )
}

export default App
