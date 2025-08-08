import React, { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  stock: number;
};

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  onProductAdded: () => void;
  product: Product | null;
};

export default function ProductModal({
  open,
  onClose,
  onProductAdded,
  product,
}: ProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [inStock, setInStock] = useState(false);
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setInStock(product.inStock);
      setStock(product.stock);
    } else {
      // Clear form when adding new product
      setName("");
      setPrice(0);
      setInStock(false);
      setStock(0);
    }
  }, [product]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const productData = { name, price, inStock, stock };

    try {
      if (product) {
        await fetch(`http://localhost:3000/api/products/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      } else {
        // Add mode: send POST request to create new product
        await fetch("http://localhost:3000/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      }
      onProductAdded();
    } catch (error) {
      console.error("Failed to save product", error);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="w-full border px-3 py-2 rounded"
              min={0}
              step={0.01}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              id="inStock"
            />
            <label htmlFor="inStock" className="font-medium">
              In Stock
            </label>
          </div>

          <div>
            <label className="block mb-1 font-medium">Stock Quantity</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
              className="w-full border px-3 py-2 rounded"
              min={0}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
