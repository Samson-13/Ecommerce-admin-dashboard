import { ShoppingCart, RotateCcw, Wallet, Ban, DollarSign } from "lucide-react";

export default function SummaryCards() {
  const cards = [
    {
      label: "Total Orders",
      value: "16,689",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      bg: "bg-gradient-to-br from-indigo-50 to-white",
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      label: "Return Item",
      value: "148",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      bg: "bg-gradient-to-br from-yellow-50 to-white",
      icon: <RotateCcw className="w-6 h-6" />,
    },
    {
      label: "Annual Budget",
      value: "$156K",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      bg: "bg-gradient-to-br from-teal-50 to-white",
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      label: "Cancel Orders",
      value: "64",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      bg: "bg-gradient-to-br from-pink-50 to-white",
      icon: <Ban className="w-6 h-6" />,
    },
    {
      label: "Total Income",
      value: "$36,715",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      bg: "bg-gradient-to-br from-green-50 to-white",
      icon: <DollarSign className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-2xl p-4 ${card.bg} shadow hover:shadow-md transition`}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className={`p-3 rounded-full ${card.iconBg}`}>
              <div className={`${card.iconColor}`}>{card.icon}</div>
            </div>
            <div className="text-xl font-semibold text-gray-800">
              {card.value}
            </div>
            <div className="text-sm text-gray-500">{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
