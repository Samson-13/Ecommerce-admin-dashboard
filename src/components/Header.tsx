import { Bell, MessageSquare, ChevronDown, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-100">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-md bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
        <Search size={18} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent focus:outline-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5 ml-6">
        <button className="text-gray-500 hover:text-gray-700 transition">
          <Bell size={20} />
        </button>
        <button className="text-gray-500 hover:text-gray-700 transition">
          <MessageSquare size={20} />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 ml-4">
          <img
            src="https://i.pravatar.cc/300?img=5"
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-sm text-gray-700">
            <div className="font-medium">Priscilla Lily</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
          <ChevronDown size={18} className="text-gray-500" />
        </div>
      </div>
    </header>
  );
}
