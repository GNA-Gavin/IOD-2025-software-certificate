import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BitcoinRates from "./pages/BitcoinRates";
import PageNotFound from "./pages/PageNotFound";
import LoginForm from "./pages/LoginForm";

function AppRoutes(props){
    return(
        <>
            <Routes>
                <Route index element={<Home></Home>}></Route>
                <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
                <Route path="BitcoinRates" element={<BitcoinRates></BitcoinRates>}></Route>
                <Route path="Login" element={<LoginForm></LoginForm>}></Route>
            </Routes>
        </>
    )
}

export default AppRoutes;