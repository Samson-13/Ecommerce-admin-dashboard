export default function RevenueByProductTable() {
  const data = [
    {
      product: "Shoes",
      progress: "73.2%",
      priority: "Low",
      priorityColor: "bg-green-100 text-green-700",
      budget: "$3.5k",
    },
    {
      product: "T-shirts",
      progress: "73.2%",
      priority: "Medium",
      priorityColor: "bg-yellow-100 text-yellow-700",
      budget: "$3.5k",
    },
    {
      product: "Jackets",
      progress: "73.2%",
      priority: "Very High",
      priorityColor: "bg-cyan-100 text-cyan-700",
      budget: "$3.5k",
    },
    {
      product: "Jeans",
      progress: "73.2%",
      priority: "High",
      priorityColor: "bg-rose-100 text-rose-700",
      budget: "$3.5k",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Revenue by Product
        </h3>
        <button className="px-3 py-1 text-sm text-gray-500 border border-gray-200 rounded-md hover:bg-gray-100">
          Sep 2024
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 border-b text-xs uppercase">
              <th className="py-2">Assigned</th>
              <th className="py-2">Progress</th>
              <th className="py-2">Priority</th>
              <th className="py-2 text-right">Budget</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={row.product}
                className={`hover:bg-gray-50 transition-colors ${
                  idx !== data.length - 1 ? "border-b" : ""
                }`}
              >
                <td className="py-3 flex items-center gap-3">
                  <div>
                    <div className="text-gray-800 font-medium">
                      {row.product}
                    </div>
                  </div>
                </td>
                <td className="py-3">{row.progress}</td>
                <td className="py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${row.priorityColor}`}
                  >
                    {row.priority}
                  </span>
                </td>
                <td className="py-3 text-right font-semibold text-gray-700">
                  {row.budget}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
