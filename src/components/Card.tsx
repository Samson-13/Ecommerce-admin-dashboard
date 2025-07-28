export default function AnnualProfitChart() {
  const metrics = [
    {
      label: "Added to Cart",
      value: "$21,120.70",
      sub: "5 clicks",
      change: "+13.2%",
      color: "text-emerald-600",
    },
    {
      label: "Reached to Checkout",
      value: "$16,100.00",
      sub: "12 clicks",
      change: "-7.4%",
      color: "text-rose-500",
    },
    {
      label: "Added to Cart",
      value: "$6,400.50",
      sub: "24 views",
      change: "+9.3%",
      color: "text-green-500",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-gray-100 hover:shadow-md transition mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Annual Profit
      </h3>

      <div className="bg-indigo-50 p-4 rounded-lg mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-600">Conversion Rate</div>
          <div className="text-2xl font-semibold text-indigo-700">18.4%</div>
        </div>
        {/* Simple SVG wave-like chart */}
        <svg viewBox="0 0 100 40" className="w-full h-10 text-indigo-400">
          <path
            d="M0,30 C20,10 40,10 60,30 C80,50 100,10 120,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="space-y-3 text-sm">
        {metrics.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start">
            <div>
              <div className="text-gray-800 font-medium">{item.label}</div>
              <div className="text-gray-400 text-xs">{item.sub}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-gray-700">{item.value}</div>
              <div className={`text-xs ${item.color}`}>{item.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
