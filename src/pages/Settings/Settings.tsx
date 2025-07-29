import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Pencil, Trash2 } from "lucide-react";
import AddButton from "../../components/AddButton";
import SettingsModal from "./SettingsModal";
import { useState } from "react";

const pages = [
  {
    id: 1,
    title: "Terms and Conditions",
    slug: "terms-and-conditions",
    updatedAt: "2025-07-25",
  },
  {
    id: 2,
    title: "Privacy Policy",
    slug: "privacy-policy",
    updatedAt: "2025-07-24",
  },
  {
    id: 3,
    title: "Return Policy",
    slug: "return-policy",
    updatedAt: "2025-07-23",
  },
];

export default function Settings() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">
              Settings Pages
            </h2>
            <AddButton label="Add Pages" onClick={() => setOpen(true)} />
          </div>
          {open && <SettingsModal open={open} onClose={() => setOpen(false)} />}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-purple-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr
                    key={page.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">{page.title}</td>
                    <td className="px-6 py-4 text-gray-500">{page.slug}</td>
                    <td className="px-6 py-4">{page.updatedAt}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          title="Edit"
                          className="p-2 rounded-full hover:bg-green-100 transition"
                        >
                          <Pencil size={16} className="text-green-600" />
                        </button>
                        <button
                          title="Delete"
                          className="p-2 rounded-full hover:bg-red-100 transition"
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                      </div>
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
