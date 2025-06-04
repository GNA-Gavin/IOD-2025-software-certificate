import './App.css'
import Home from './components/Home'
import AppRoutes from './AppRoutes'
import MyThemeProvider from './context/MyThemeContext'
import NavBar from './components/NavBar'

function App() {

  return (
    <>
      {/* <Home></Home> */}
      <MyThemeProvider>
        <NavBar></NavBar>
      <AppRoutes></AppRoutes>
      </MyThemeProvider>
    </>
  )
}

export default App
