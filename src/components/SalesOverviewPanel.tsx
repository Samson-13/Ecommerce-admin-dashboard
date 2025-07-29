export default function SalesOverviewPanel() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Sales Overview
      </h3>
      <div>
        <div className="text-3xl font-bold text-green-700 mb-1">$79K</div>
        <div className="text-sm text-gray-500">This Quarter</div>
      </div>

      <ul className="mt-4 text-sm text-gray-600 space-y-1">
        <li className="flex items-start gap-1">
          <span className="text-lg leading-5">•</span>
          <span>
            Best Month: <span className="text-black font-semibold">March</span>
          </span>
        </li>
        <li className="flex items-start gap-1">
          <span className="text-lg leading-5">•</span>
          <span>
            YoY Growth:{" "}
            <span className="text-green-600 font-semibold">+6.2%</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
