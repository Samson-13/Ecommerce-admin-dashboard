export default function SettlementsCard() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-1">
        Settlement Overview
      </h3>
      <div className="text-3xl font-bold text-purple-700 mb-1">$12,300</div>
      <div className="text-sm text-gray-500">Pending Payouts</div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <span className="text-green-600 font-semibold">+ $3,100</span>
        <span className="text-gray-400">since last cycle</span>
      </div>
    </div>
  );
}
