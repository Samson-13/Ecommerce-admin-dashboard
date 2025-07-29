import { Pencil, Trash2 } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AddButton from "../../components/AddButton";
import BannersModal from "./BannersModal";
import { useState } from "react";

const banners = [
  {
    id: 1,
    imageUrl:
      "https://i.pinimg.com/736x/49/a1/8d/49a18d32cc0ad100990ce8efe9689ffa.jpg",
    location: "Homepage",
    active: true,
  },
  {
    id: 2,
    imageUrl:
      "https://i.pinimg.com/1200x/44/8e/7a/448e7ad06d1606eaaa875613c72419ac.jpg",
    location: "Offers",
    active: false,
  },
];

export default function Banners() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Banners</h2>
            <AddButton label="Add Categories" onClick={() => setOpen(true)} />
          </div>
          {open && <BannersModal open={open} onClose={() => setOpen(false)} />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                <img
                  src={banner.imageUrl}
                  alt="Banner"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Location:{" "}
                      <span className="text-gray-900">{banner.location}</span>
                    </p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block ${
                        banner.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {banner.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button title="Edit" className="p-2 rounded-full">
                      <Pencil size={16} className="text-green-600" />
                    </button>
                    <button title="Delete" className="p-2 rounded-full">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
