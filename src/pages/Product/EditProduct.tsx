import { useRef, useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  discount?: number;
  inStock: boolean;
  stock?: number;
  categoryId: number | string;
  images: string[];
  tags: string[];
};

export default function EditProduct({
  open,
  onClose,
  onProductUpdated,
  productToEdit, // <-- new prop
}: {
  open: boolean;
  onClose: () => void;
  onProductUpdated: () => void;
  productToEdit: Product | null; // if null, means adding new
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [categories] = useState<{ id: number; name: string }[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);

  const [discount, setDiscount] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number | undefined>(undefined);
  const [categoryId, setCategoryId] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [inStock, setInStock] = useState("true");
  const [loading, setLoading] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (open && productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setDiscount(productToEdit.discount);
      setStock(productToEdit.stock);
      setCategoryId(String(productToEdit.categoryId));
      setImages(productToEdit.images);
      setTags(productToEdit.tags);
      setInStock(productToEdit.inStock ? "true" : "false");
    } else if (open && !productToEdit) {
      // Clear form for new product
      setName("");
      setDescription("");
      setPrice(undefined);
      setDiscount(undefined);
      setStock(undefined);
      setCategoryId("");
      setImages([]);
      setTags([]);
      setInStock("true");
    }
  }, [open, productToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productPayload = {
      name,
      description,
      price,
      discount: discount ? Number(discount) : undefined,
      inStock: inStock === "true",
      stock,
      categoryId,
      images,
      tags,
    };

    try {
      const url = productToEdit
        ? `http://localhost:3000/api/products/${productToEdit.id}` // update URL with product ID
        : "http://localhost:3000/api/products"; // create new product

      const method = productToEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload),
      });

      if (!res.ok) throw new Error("Failed to save product");

      onProductUpdated();
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
        className="bg-white p-8 rounded-xl w-full max-w-xl shadow-2xl border border-gray-200 overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Product
          </h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium  mb-1">
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
            <label className="block text-sm font-medium  mb-1">
              Description
            </label>
            <textarea
              value={description}
              placeholder="e.g. Product Description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium  mb-1">
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
              <label className="block text-sm font-medium  mb-1">
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium  mb-1">Stock</label>
              <input
                type="number"
                value={stock ?? ""}
                placeholder="e.g. 20"
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full border px-4 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium  mb-1">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => {
                  const id = e.target.value;
                  console.log("Selected categoryId:", id);
                  setCategoryId(id);
                }}
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

          <div>
            <label className="block text-sm font-medium  mb-1">
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

          <div>
            <label className="block text-sm font-medium  mb-1">
              Image URLs (comma separated)
            </label>
            <input
              type="text"
              onChange={(e) =>
                setImages(
                  e.target.value
                    .split(",")
                    .map((img) => img.trim())
                    .filter(Boolean)
                )
              }
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1">
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

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 bg-gray-100  rounded-lg hover:bg-gray-200 cursor-pointer"
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
