import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Trash2 } from "lucide-react";

const reviews = [
  {
    id: 1,
    reviewer: "Amit Singh",
    email: "amit@example.com",
    product: "Vintage Denim Jacket",
    rating: 4,
    date: "2025-07-27",
  },
  {
    id: 2,
    reviewer: "Neha Jain",
    email: "neha@example.com",
    product: "Oversized Cotton T-Shirt",
    rating: 5,
    date: "2025-07-25",
  },
  {
    id: 3,
    reviewer: "Rahul Verma",
    email: "rahul@example.com",
    product: "Minimalist Tote Bag",
    rating: 3,
    date: "2025-07-20",
  },
];

export default function Reviews() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">
              Product Reviews
            </h2>
          </div>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-purple-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Reviewer</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Rating</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr
                    key={review.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">{review.reviewer}</td>
                    <td className="px-6 py-4">{review.email}</td>
                    <td className="px-6 py-4">{review.product}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {review.rating} ★
                      </span>
                    </td>

                    <td className="px-6 py-4">{review.date}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        title="Delete Review"
                        className="p-2 rounded-full hover:bg-red-100 transition"
                      >
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
