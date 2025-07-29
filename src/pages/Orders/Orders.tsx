import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { BadgeCheck, Clock, XCircle } from "lucide-react";

const orders = [
  {
    id: "ORD123456",
    user: "Ravi Kumar",
    amount: 2599,
    status: "Delivered",
    date: "2025-07-25",
  },
  {
    id: "ORD123457",
    user: "Anjali Mehra",
    amount: 1199,
    status: "Pending",
    date: "2025-07-26",
  },
  {
    id: "ORD123458",
    user: "Rahul Singh",
    amount: 1899,
    status: "Cancelled",
    date: "2025-07-27",
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Delivered":
      return "text-green-700 bg-green-100";
    case "Pending":
      return "text-yellow-700 bg-yellow-100";
    case "Cancelled":
      return "text-red-700 bg-red-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
      return <BadgeCheck className="w-4 h-4 mr-1" />;
    case "Pending":
      return <Clock className="w-4 h-4 mr-1" />;
    case "Cancelled":
      return <XCircle className="w-4 h-4 mr-1" />;
    default:
      return null;
  }
};

export default function Orders() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Orders</h2>
          </div>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Amount (₹)</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">{order.user}</td>
                    <td className="px-6 py-4">₹{order.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyles(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{order.date}</td>
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
