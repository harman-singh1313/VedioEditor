import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menu = [
    {
      name: "Overview",
      href: "/admin",
      icon: "▦",
    },
    {
      name: "Content Library",
      href: "/project",
      icon: "▣",
    },
    {
      name: "Leads",
      href: "/leads",
      icon: "✉",
      badge: 2,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: "⚙",
    },
  ];

  const isActive = (href) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }

    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#28213f] bg-[#0d091b] px-5 md:hidden">
        <div>
          <h1 className="font-serif text-xl font-semibold text-white">
            Marcus Velde
          </h1>

          <p className="text-[9px] uppercase tracking-[0.25em] text-purple-400">
            Admin
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[#342952] text-xl text-white"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-[250px] flex-col
          border-r border-[#28213f] bg-[#0d091b]
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex h-[68px] items-center border-b border-[#28213f] px-7">
          <div>
            <h1 className="font-serif text-[19px] font-semibold text-white">
              Marcus Velde
            </h1>

            <p className="mt-1 text-[8px] uppercase tracking-[0.3em] text-purple-400">
              Portfolio Studio
            </p>
          </div>
        </div>

        {/* Workspace */}
        <div className="px-7 pt-8">
          <p className="text-[9px] uppercase tracking-[0.25em] text-purple-500">
            Portfolio Studio
          </p>

          <p className="mt-2 text-sm text-purple-300">
            Admin workspace
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1 px-3">
          {menu.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex h-11 items-center gap-4 rounded-sm px-4
                  text-sm transition-all duration-200
                  ${active
                    ? "bg-[#a548ed] text-white"
                    : "text-purple-300 hover:bg-[#1b1430] hover:text-white"
                  }
                `}
              >
                <span className="w-4 text-center text-base">
                  {item.icon}
                </span>

                <span className="flex-1">
                  {item.name}
                </span>

                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center bg-[#30234f] px-1.5 text-[10px] text-purple-200">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>


        {/* Logout */}
        <div className="border-t border-[#28213f] p-5">
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem("adminToken");
              navigate("/admin/login");
            }}
            className="flex h-10 w-full items-center justify-between border border-red-500/30 px-4 text-[10px] uppercase tracking-[0.15em] text-red-400 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-300"
          >
            <span>Logout</span>
            <span>↪</span>
          </button>
        </div>

        {/* Bottom */}
        <div className="mt-auto">

          {/* Live Site */}
          <div className="border-t border-[#28213f] p-5">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex h-10 items-center justify-between border border-[#342952] px-4 text-[10px] uppercase tracking-[0.15em] text-purple-300 transition hover:border-purple-500 hover:text-white"
            >
              <span>View Live Site</span>
              <span>→</span>
            </Link>
          </div>

          {/* User */}
          <div className="flex items-center gap-3 border-t border-[#28213f] px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center bg-[#30234f] font-serif text-lg text-white">
              M
            </div>

            <div>
              <p className="text-sm text-white">
                Marcus Velde
              </p>

              <p className="text-[8px] uppercase tracking-[0.2em] text-purple-400">
                Administrator
              </p>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;