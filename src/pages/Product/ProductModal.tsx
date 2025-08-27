import { useRef, useState, useEffect } from "react";

export default function ProductModal({
  open,
  onClose,
  onProductAdded,
}: {
  open: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [discount, setDiscount] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<string>("");

  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inStock, setInStock] = useState("true");

  const [, setSizes] = useState<(string | number)[]>([]);
  const [material, setMaterial] = useState<string | null>(null);
  const [careGuide, setCareGuide] = useState<string | null>(null);
  const [isNewArrival, setIsNewArrival] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    if (open) fetchCategories();
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", String(price));
      if (discount) formData.append("discount", String(discount));
      formData.append("inStock", inStock === "true" ? "true" : "false");
      formData.append("stock", String(stock));
      formData.append("categoryId", categoryId);
      tags.forEach((tag) => formData.append("tags", tag));

      // append files
      const fileInputs =
        document.querySelector<HTMLInputElement>('input[type="file"]');
      if (fileInputs?.files) {
        Array.from(fileInputs.files).forEach((file) => {
          formData.append("images", file);
        });
      }

      const res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create product");

      onProductAdded();
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
        className="bg-white p-8 rounded-xl w-full max-w-xl shadow-2xl border border-gray-200 overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Product
          </h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name + Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              placeholder="e.g. Product Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              placeholder="e.g. Product Description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Price + Discount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                value={price ?? ""}
                placeholder="e.g. 1000"
                onChange={(e) =>
                  setPrice(e.target.value ? Number(e.target.value) : undefined)
                }
                required
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                value={discount ?? ""}
                placeholder="e.g. 10"
                onChange={(e) =>
                  setDiscount(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* Stock + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                value={stock ?? ""}
                placeholder="e.g. 20"
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full border px-4 py-2 pr-10 rounded-lg appearance-none"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Availability
            </label>
            <select
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              className="w-full border px-4 py-2 pr-10 rounded-lg appearance-none"
            >
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium  mb-1">
              Images (max 8)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length > 8) {
                  alert("You can only upload up to 8 images");
                  return;
                }
                setImages(files.map((file) => URL.createObjectURL(file)));
              }}
              className="w-full border px-4 py-2 rounded-lg"
            />
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`preview-${idx}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              onChange={(e) =>
                setTags(
                  e.target.value
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                )
              }
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sizes (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. S,M,L or 38,40,42"
              onChange={(e) =>
                setSizes(
                  e.target.value
                    .split(",")
                    .map((size) => size.trim())
                    .filter(Boolean)
                )
              }
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-medium mb-1">Material</label>
            <input
              type="text"
              placeholder="e.g. Cotton, Polyester"
              value={material ?? ""}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Care Guide */}
          <div>
            <label className="block text-sm font-medium mb-1">Care Guide</label>
            <textarea
              placeholder="e.g. Hand wash cold, Do not bleach"
              value={careGuide ?? ""}
              onChange={(e) => setCareGuide(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* New Arrival */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isNewArrival}
              onChange={(e) => setIsNewArrival(e.target.checked)}
            />
            <label className="text-sm font-medium">Mark as New Arrival</label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer"
            >
              {loading ? "Saving..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
