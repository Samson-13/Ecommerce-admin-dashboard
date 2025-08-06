import { Pencil, Trash2 } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AddButton from "../../components/AddButton";
import CategoriesModal from "./CategoriesModal";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  productCount: number;
  status: boolean;
};

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Categories</h2>
            <AddButton label="Add Categories" onClick={() => setOpen(true)} />
          </div>

          {open && (
            <CategoriesModal
              open={open}
              onClose={() => {
                setOpen(false);
                fetchCategories();
              }}
            />
          )}

          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            {loading ? (
              <div className="p-10 text-center text-gray-500">Loading...</div>
            ) : categories.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                No categories found.
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-purple-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Category Name</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, index) => (
                    <tr
                      key={cat.id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-medium">{cat.name}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                            cat.status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {cat.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button
                            className="p-2 rounded-full cursor-pointer"
                            title="Edit"
                          >
                            <Pencil size={16} className="text-green-600" />
                          </button>
                          <button
                            className="p-2 rounded-full cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
