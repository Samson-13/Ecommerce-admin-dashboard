export default function PerformancePanel() {
  const metrics = [
    {
      label: "On-time Delivery",
      value: "96%",
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Positive Feedback",
      value: "87%",
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Return Rate",
      value: "2.3%",
      color: "text-red-600 bg-red-100",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Performance</h3>

      <div className="space-y-3">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-sm"
          >
            <div className="text-gray-600">{item.label}</div>
            <div
              className={`text-sm font-bold px-2 py-1 rounded-md ${item.color}`}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
