import { useEffect, useMemo, useState } from "react";

import { getUsers } from "../services/api";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);

  const perPage = 5;

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);

        const data = await getUsers();

        const formatted = data.map(
          (user, index) => ({
            ...user,
            role:
              index % 3 === 0
                ? "Admin"
                : index % 3 === 1
                ? "Editor"
                : "Customer",

            status:
              index % 4 === 0
                ? "Inactive"
                : "Active",
          })
        );

        setUsers(formatted);
      } catch (err) {
        setError(
          "Unable to load users. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let result = [...users];

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(value) ||
          user.email
            .toLowerCase()
            .includes(value) ||
          user.username
            .toLowerCase()
            .includes(value)
      );
    }

    if (role !== "All") {
      result = result.filter(
        (user) => user.role === role
      );
    }

    result.sort((a, b) =>
      a[sortBy]
        .toString()
        .localeCompare(
          b[sortBy].toString()
        )
    );

    return result;
  }, [users, search, role, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUsers.length / perPage
    )
  );

  const currentUsers = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    setPage(1);
  }, [search, role, sortBy]);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>Something went wrong</h3>
        <p>{error}</p>

        <button
          className="primary-btn"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-toolbar">
        <div>
          <h2>Users</h2>
          <p>
            {filteredUsers.length} users found
          </p>
        </div>

        <button className="primary-btn">
          + Add User
        </button>
      </div>

      <section className="panel">
        <div className="filters">
          <div className="filter-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Customer">
              Customer
            </option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="name">
              Sort by Name
            </option>
            <option value="email">
              Sort by Email
            </option>
            <option value="username">
              Sort by Username
            </option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Website</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="user-cell">
                      <div className="table-avatar">
                        {user.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <strong>
                        {user.name}
                      </strong>
                    </div>
                  </td>

                  <td>{user.username}</td>

                  <td>{user.email}</td>

                  <td>
                    <span className="role">
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <StatusBadge
                      status={user.status}
                    />
                  </td>

                  <td>{user.website}</td>
                </tr>
              ))}

              {currentUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="empty"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </section>
    </div>
  );
}