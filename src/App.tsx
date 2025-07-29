import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Product";
import Categories from "./pages/Categories";
import Banners from "./pages/Banners";
import Orders from "./pages/Orders";
import Reviews from "./pages/Reviews";
import Users from "./pages/Users";
import Permissions from "./pages/Permissions";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Overview */}
        <Route path="/" element={<Dashboard />} />
        {/* Store */}
        <Route path="/banners" element={<Banners />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/reviews" element={<Reviews />} />
        {/* Users */}
        <Route path="/users" element={<Users />} />
        <Route path="/permissions" element={<Permissions />} />
        {/* System */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
