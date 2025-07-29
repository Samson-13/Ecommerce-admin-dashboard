import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Pencil } from "lucide-react";
import AddButton from "../../components/AddButton";
import PermissionsModal from "./PermissionsModal";
import { useState } from "react";

const roles = [
  {
    id: 1,
    role: "Super Admin",
    canEdit: true,
    canDelete: true,
    canViewReports: true,
  },
  {
    id: 2,
    role: "Editor",
    canEdit: true,
    canDelete: false,
    canViewReports: true,
  },
];

export default function Permissions() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">
              Permissions
            </h2>
            <AddButton label="Add Permissions" onClick={() => setOpen(true)} />
          </div>
          {open && (
            <PermissionsModal open={open} onClose={() => setOpen(false)} />
          )}

          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-purple-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Can Edit</th>
                  <th className="px-6 py-4">Can Delete</th>
                  <th className="px-6 py-4">Can View Reports</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r, index) => (
                  <tr
                    key={r.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{r.role}</td>
                    <td className="px-6 py-4">{r.canEdit ? "✅" : "❌"}</td>
                    <td className="px-6 py-4">{r.canDelete ? "✅" : "❌"}</td>
                    <td className="px-6 py-4">
                      {r.canViewReports ? "✅" : "❌"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <button className="p-2 rounded-full" title="Edit">
                          <Pencil size={16} className="text-green-600" />
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
