import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: "⌂"
  },
  {
    name: "Users",
    path: "/users",
    icon: "♙"
  },
  {
    name: "Products",
    path: "/products",
    icon: "▣"
  },
  {
    name: "Orders",
    path: "/orders",
    icon: "▤"
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: "◈"
  },
  {
    name: "Settings",
    path: "/settings",
    icon: "⚙"
  }
];

export default function Sidebar({
  mobileOpen,
  closeMobile
}) {

  return (
    <>
      {mobileOpen && (
        <div
          className="overlay"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`sidebar ${
          mobileOpen ? "sidebar-open" : ""
        }`}
      >

        <div className="logo">

          <div className="logo-box">
            A
          </div>

          <div>
            <h2>AdminPro</h2>
            <span>Control Center</span>
          </div>

        </div>

        <p className="menu-title">
          MAIN MENU
        </p>

        <nav>

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={closeMobile}
              className={({ isActive }) =>
                `nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <span className="nav-icon">
                {item.icon}
              </span>

              {item.name}

            </NavLink>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="upgrade">

            <strong>Pro Workspace</strong>

            <p>
              Unlock advanced reports and
              team features.
            </p>

            <button>
              Upgrade
            </button>

          </div>

          <div className="profile">

            <div className="avatar">
              AM
            </div>

            <div>
              <strong>
                Admin User
              </strong>

              <span>
                Administrator
              </span>
            </div>

          </div>

        </div>

      </aside>
    </>
  );
}