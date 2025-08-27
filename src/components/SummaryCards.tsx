/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type JSX } from "react";
import { ShoppingCart, RotateCcw, Wallet, Ban, DollarSign } from "lucide-react";

const iconMap: Record<string, JSX.Element> = {
  "Total Orders": <ShoppingCart className="w-6 h-6" />,
  "Return Item": <RotateCcw className="w-6 h-6" />,
  "Annual Budget": <Wallet className="w-6 h-6" />,
  "Cancel Orders": <Ban className="w-6 h-6" />,
  "Total Income": <DollarSign className="w-6 h-6" />,
};

export default function SummaryCards() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/dashboard")
      .then((res) => res.json())
      .then((result) => {
        setCards(result.data.summaryCards); // <-- pick from summaryCards
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-2xl p-4 ${card.bg} shadow hover:shadow-md transition`}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className={`p-3 rounded-full ${card.iconBg}`}>
              <div className={`${card.iconColor}`}>
                {iconMap[card.label] ?? null}
              </div>
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
