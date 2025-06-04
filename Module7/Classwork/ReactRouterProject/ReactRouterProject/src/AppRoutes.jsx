import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import DashboardPage from "./components/DashboardPage";
import { DashboardMessages } from "./components/DashboardMessages";
import { DashboardTasks } from "./components/DashboardTasks";
import PageNotFound from "./components/PageNotFound";

function AppRoutes(props){
    return(
        <>
            <Routes>
                <Route index element={<Home></Home>}></Route>
                <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
                <Route path="About" element={<About></About>}></Route>
                <Route path="Contact" element={<Contact></Contact>}></Route>
                <Route path="dash" element={<DashboardPage></DashboardPage>}>
                <Route path="messages" element={<DashboardMessages></DashboardMessages>}></Route>
                <Route path="tasks" element={<DashboardTasks></DashboardTasks>}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default AppRoutes;