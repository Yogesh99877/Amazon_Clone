import { useMemo, useState } from "react";

import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";

const initialOrders = [
  {
    id: "ORD-1001",
    customer: "John Smith",
    product: "Wireless Headphones",
    date: "Sep 28, 2026",
    amount: 129,
    status: "Delivered",
  },
  {
    id: "ORD-1002",
    customer: "Sarah Wilson",
    product: "Smart Watch",
    date: "Sep 27, 2026",
    amount: 249,
    status: "Processing",
  },
  {
    id: "ORD-1003",
    customer: "Michael Brown",
    product: "Gaming Keyboard",
    date: "Sep 26, 2026",
    amount: 89,
    status: "Shipped",
  },
  {
    id: "ORD-1004",
    customer: "Emily Davis",
    product: "Laptop Stand",
    date: "Sep 25, 2026",
    amount: 59,
    status: "Delivered",
  },
  {
    id: "ORD-1005",
    customer: "Robert Taylor",
    product: "USB-C Hub",
    date: "Sep 24, 2026",
    amount: 45,
    status: "Cancelled",
  },
  {
    id: "ORD-1006",
    customer: "Jessica Moore",
    product: "Mechanical Mouse",
    date: "Sep 23, 2026",
    amount: 75,
    status: "Processing",
  },
  {
    id: "ORD-1007",
    customer: "Daniel Anderson",
    product: "Monitor",
    date: "Sep 22, 2026",
    amount: 349,
    status: "Shipped",
  },
  {
    id: "ORD-1008",
    customer: "Olivia Martin",
    product: "Webcam",
    date: "Sep 21, 2026",
    amount: 99,
    status: "Delivered",
  },
];

export default function Orders() {
  const [orders] = useState(initialOrders);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const perPage = 5;

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.product
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        order.status === status;

      return (
        matchesSearch && matchesStatus
      );
    });
  }, [orders, search, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredOrders.length / perPage
    )
  );

  const currentOrders = filteredOrders.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatus = (value) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className="page">
      <div className="page-toolbar">
        <div>
          <h2>Orders</h2>
          <p>
            Manage and track customer orders
          </p>
        </div>

        <button className="primary-btn">
          Export Orders
        </button>
      </div>

      <section className="panel">
        <div className="filters">
          <div className="filter-search">
            <span>⌕</span>

            <input
              placeholder="Search orders..."
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
            />
          </div>

          <select
            value={status}
            onChange={(e) =>
              handleStatus(e.target.value)
            }
          >
            <option value="All">
              All Status
            </option>
            <option value="Delivered">
              Delivered
            </option>
            <option value="Processing">
              Processing
            </option>
            <option value="Shipped">
              Shipped
            </option>
            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                  </td>

                  <td>{order.customer}</td>

                  <td>{order.product}</td>

                  <td>{order.date}</td>

                  <td>
                    ${order.amount.toFixed(2)}
                  </td>

                  <td>
                    <StatusBadge
                      status={order.status}
                    />
                  </td>

                  <td>
                    <button className="table-action">
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {currentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="empty"
                  >
                    No orders found.
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