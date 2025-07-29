import { Pencil, Trash2 } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AddButton from "../../components/AddButton";
import { useState } from "react";
import ProductModal from "./ProductModal";

const products = [
  {
    id: 1,
    name: "Oversized Cotton T-Shirt",
    price: 1299,
    available: true,
    stock: 50,
  },
  {
    id: 2,
    name: "Minimalist Tote Bag",
    price: 499,
    available: true,
    stock: 200,
  },
  {
    id: 3,
    name: "Linen Summer Shirt",
    price: 2499,
    available: false,
    stock: 0,
  },
  {
    id: 4,
    name: "Vintage Denim Jacket",
    price: 1899,
    available: true,
    stock: 35,
  },
];

export default function Products() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Products</h2>
            <AddButton label="Add Product" onClick={() => setOpen(true)} />
          </div>
          {open && <ProductModal open={open} onClose={() => setOpen(false)} />}

          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-purple-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Price (₹)</th>
                  <th className="px-6 py-4">Availability</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4">₹{product.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                          product.available
                            ? " text-green-700"
                            : " text-red-600"
                        }`}
                      >
                        {product.available ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4 flex justify-center gap-3">
                      <button className="p-2 rounded-full" title="Edit">
                        <Pencil size={16} className="text-green-600" />
                      </button>
                      <button className="p-2 rounded-full" title="Delete">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
