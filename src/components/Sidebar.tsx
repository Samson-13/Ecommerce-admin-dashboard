import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Tags,
  Star,
  Image,
  ShieldCheck,
  Settings,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const navSections = [
  {
    title: "Overview",
    links: [
      {
        to: "/",
        label: "Dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "Store",
    links: [
      { to: "/banners", label: "Banners", icon: <Image className="w-5 h-5" /> },

      {
        to: "/products",
        label: "Products",
        icon: <Package className="w-5 h-5" />,
      },
      {
        to: "/categories",
        label: "Categories",
        icon: <Tags className="w-5 h-5" />,
      },
      {
        to: "/orders",
        label: "Orders",
        icon: <ShoppingCart className="w-5 h-5" />,
      },

      { to: "/reviews", label: "Reviews", icon: <Star className="w-5 h-5" /> },
    ],
  },
  {
    title: "Users",
    links: [
      { to: "/users", label: "Users", icon: <Users className="w-5 h-5" /> },

      {
        to: "/permissions",
        label: "Permissions",
        icon: <ShieldCheck className="w-5 h-5" />,
      },
    ],
  },
  {
    title: "System",
    links: [
      {
        to: "/settings",
        label: "Settings",
        icon: <Settings className="w-5 h-5" />,
      },
    ],
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-60 min-h-screen bg-white shadow-sm">
      <div className="text-xl font-bold text-blue-700 px-6 py-5 text-center">
        Admin
      </div>

      <nav className="flex flex-col px-4 py-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="text-xs text-gray-400 font-medium mb-2 uppercase tracking-wide px-2">
              {section.title}
            </p>
            <div className="flex flex-col gap-1">
              {section.links.map((link) => {
                const isActive = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all
                      ${
                        isActive
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    <div
                      className={`p-1.5 rounded-md 
                        ${
                          isActive
                            ? "bg-blue-200 text-blue-700"
                            : "bg-gray-100 text-gray-500"
                        }
                      `}
                    >
                      {link.icon}
                    </div>
                    <span className="text-sm">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
