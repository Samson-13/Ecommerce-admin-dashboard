import { useRef, useState, useEffect } from "react";

type Category = {
  id: number;
  name: string;
  status: boolean;
};

export default function EditCategory({
  open,
  onClose,
  onCategoryUpdated,
  categoryToEdit,
}: {
  open: boolean;
  onClose: () => void;
  onCategoryUpdated: () => void;
  categoryToEdit: Category | null;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (open && categoryToEdit) {
      setName(categoryToEdit.name);
      setStatus(categoryToEdit.status);
    } else if (open && !categoryToEdit) {
      // Clear form for new category
      setName("");
      setStatus(true);
    }
  }, [open, categoryToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const categoryPayload = {
      name,
      status,
    };

    try {
      const url = categoryToEdit
        ? `http://localhost:3000/api/categories/${categoryToEdit.id}`
        : "http://localhost:3000/api/categories";

      const method = categoryToEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryPayload),
      });

      if (!res.ok) throw new Error("Failed to save category");

      onCategoryUpdated();
      onClose();
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-xl w-full max-w-md shadow-2xl border border-gray-200"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {categoryToEdit ? "Edit Category" : "Add New Category"}
          </h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              placeholder="e.g. Electronics, Clothing"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={status ? "true" : "false"}
              onChange={(e) => setStatus(e.target.value === "true")}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : categoryToEdit
                ? "Update Category"
                : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
