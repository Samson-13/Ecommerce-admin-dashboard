import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Products from "./pages/Product/Product";
import Categories from "./pages/Categories/Categories";
import Orders from "./pages/Orders/Orders";
import Reviews from "./pages/Reviews/Reviews";
import Users from "./pages/Users/Users";
import Permissions from "./pages/Users/Permissions";
import Settings from "./pages/Settings/Settings";
import Banners from "./pages/Banners/Banners";
import EditProduct from "./pages/Product/EditProduct";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Overview */}
        <Route path="/" element={<Dashboard />} />
        {/* Store */}
        <Route path="/banners" element={<Banners />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:id"
          element={
            <EditProduct
              open={false}
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
              onProductUpdated={function (): void {
                throw new Error("Function not implemented.");
              }}
              productToEdit={null}
            />
          }
        />
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
