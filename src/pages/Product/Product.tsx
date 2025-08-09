import { Pencil, Trash2 } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AddButton from "../../components/AddButton";
import { useEffect, useState } from "react";
import ProductModal from "./ProductModal";
import EditProduct from "./EditProduct";
import ConfirmationBox from "../../components/ConfirmationBox";

type Product = {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  categoryId: string;
  inStock: boolean;
  tags: string[];
  stock: number;
};

export default function Products() {
  const [addOpen, setAddOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openEditModal = (product: Product) => {
    setProductToEdit(product);
    setEditOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setOpen(true);
  };

  const onDelete = async () => {
    if (!productToDelete) return;
    try {
      await fetch(`http://localhost:3000/api/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      fetchProducts();
      setOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Products</h2>
            <AddButton label="Add Product" onClick={() => setAddOpen(true)} />
          </div>

          {/* Add Product Modal */}
          {addOpen && (
            <ProductModal
              open={addOpen}
              onClose={() => setAddOpen(false)}
              onProductAdded={() => {
                fetchProducts();
                setAddOpen(false);
              }}
            />
          )}

          {/* Edit Product Modal */}
          {editOpen && productToEdit && (
            <EditProduct
              open={editOpen}
              onClose={() => setEditOpen(false)}
              productToEdit={productToEdit}
              onProductUpdated={() => {
                fetchProducts();
                setEditOpen(false);
              }}
            />
          )}

          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-10 text-center text-gray-500">Loading...</div>
            ) : products.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                No products found.
              </div>
            ) : (
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
                            product.inStock ? "text-green-700" : "text-red-600"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4 flex justify-center gap-3">
                        <button
                          className="p-2 rounded-full cursor-pointer"
                          title="Edit"
                          onClick={() => openEditModal(product)}
                        >
                          <Pencil size={16} className="text-green-600" />
                        </button>

                        <button
                          className="p-2 rounded-full cursor-pointer"
                          title="Delete"
                          onClick={() => openDeleteModal(product)}
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Delete Confirmation Modal */}
          <ConfirmationBox
            open={open}
            label={`Are you sure you want to Delete ${productToDelete?.name}?`}
            onCancel={() => {
              setOpen(false);
              setProductToDelete(null);
            }}
            onConfirm={onDelete}
          />
        </main>
      </div>
    </div>
  );
}
