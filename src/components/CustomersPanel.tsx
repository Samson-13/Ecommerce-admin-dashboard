import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", current: 900, last: 500 },
  { name: "Tue", current: 1100, last: 750 },
  { name: "Wed", current: 950, last: 800 },
  { name: "Thu", current: 1050, last: 950 },
  { name: "Fri", current: 1150, last: 900 },
  { name: "Sat", current: 1200, last: 700 },
  { name: "Sun", current: 1230, last: 600 },
];

export default function CustomersPanel() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Customers</h3>
          <p className="text-xs text-gray-400">Last 7 days</p>
        </div>
        <div className="text-sm font-semibold text-green-500">+26.5%</div>
      </div>

      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="current"
              stroke="#6D28D9"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="last"
              stroke="#C4B5FD"
              strokeWidth={2}
              dot={false}
            />
            <XAxis dataKey="name" hide />
            <Tooltip
              contentStyle={{ fontSize: "12px", borderRadius: "6px" }}
              labelStyle={{ display: "none" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 space-y-1 text-sm">
        <div className="flex justify-between items-center text-gray-700">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            April 07 - April 14
          </div>
          <span className="font-semibold">6,580</span>
        </div>
        <div className="flex justify-between items-center text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-300"></span>
            Last Week
          </div>
          <span className="font-medium">4,298</span>
        </div>
      </div>
    </div>
  );
}
