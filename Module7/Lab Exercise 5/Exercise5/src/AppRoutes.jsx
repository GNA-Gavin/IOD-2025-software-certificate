import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BitcoinRates from "./pages/BitcoinRates";
import PageNotFound from "./pages/PageNotFound";
import LoginForm from "./pages/LoginForm";

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="BitcoinRates" element={<BitcoinRates />} />
      <Route path="Login" element={<LoginForm />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;