import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Browse from "../pages/Browse";
import SearchResults from "../pages/SearchResults";
import RecipePage from "../pages/RecipePage";
import Favorites from "../pages/Favorites";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default AppRoutes;
