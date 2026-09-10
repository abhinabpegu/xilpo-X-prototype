import { Routes, Route } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Home from "./pages/Home";
import NewProduct from "./pages/NewProduct";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="new-product" element={<NewProduct />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
