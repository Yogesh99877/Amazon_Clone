import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

const revenueData = [

  {
    month: "Jan",
    revenue: 32000
  },

  {
    month: "Feb",
    revenue: 41000
  },

  {
    month: "Mar",
    revenue: 38000
  },

  {
    month: "Apr",
    revenue: 52000
  },

  {
    month: "May",
    revenue: 61000
  },

  {
    month: "Jun",
    revenue: 58000
  },

  {
    month: "Jul",
    revenue: 72000
  },

  {
    month: "Aug",
    revenue: 81000
  },

  {
    month: "Sep",
    revenue: 76000
  },

  {
    month: "Oct",
    revenue: 88000
  },

  {
    month: "Nov",
    revenue: 94000
  },

  {
    month: "Dec",
    revenue: 108000
  }

];

const orderData = [

  { day: "Mon", orders: 120 },
  { day: "Tue", orders: 180 },
  { day: "Wed", orders: 150 },
  { day: "Thu", orders: 230 },
  { day: "Fri", orders: 280 },
  { day: "Sat", orders: 240 },
  { day: "Sun", orders: 190 }

];

const statusData = [

  {
    name: "Delivered",
    value: 62
  },

  {
    name: "Processing",
    value: 20
  },

  {
    name: "Shipped",
    value: 12
  },

  {
    name: "Cancelled",
    value: 6
  }

];

const orders = [

  {
    id: "#ORD-1048",
    customer: "Olivia Martin",
    product: "Wireless Headphones",
    amount: "$129.00",
    status: "Delivered"
  },

  {
    id: "#ORD-1047",
    customer: "Liam Wilson",
    product: "Smart Watch",
    amount: "$249.00",
    status: "Processing"
  },

  {
    id: "#ORD-1046",
    customer: "Emma Davis",
    product: "Laptop Stand",
    amount: "$79.00",
    status: "Shipped"
  },

  {
    id: "#ORD-1045",
    customer: "Noah Brown",
    product: "Mechanical Keyboard",
    amount: "$159.00",
    status: "Delivered"
  }

];

export default function Dashboard() {

  return (

    <div>

      <div className="welcome">

        <div>

          <h2>
            Good morning, Admin 👋
          </h2>

          <p>
            Here's what's happening
            with your business today.
          </p>

        </div>

        <button className="primary-btn">
          + Create Report
        </button>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Revenue"
          value="$284,521"
          change="12.8%"
          icon="$"
        />

        <StatCard
          title="Total Users"
          value="12,450"
          change="8.4%"
          icon="♙"
        />

        <StatCard
          title="Total Orders"
          value="8,420"
          change="16.2%"
          icon="▤"
        />

        <StatCard
          title="Total Products"
          value="1,250"
          change="4.6%"
          icon="▣"
        />

      </div>

      <div className="dashboard-grid">

        {/* Revenue */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h3>
                Revenue Overview
              </h3>

              <p>
                Monthly revenue
                performance
              </p>
            </div>

            <select>
              <option>2026</option>
              <option>2025</option>
            </select>

          </div>

          <div className="chart">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart
                data={revenueData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={false}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Pie Chart */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h3>
                Order Status
              </h3>

              <p>
                Current distribution
              </p>
            </div>

          </div>

          <div className="pie-chart">

            <ResponsiveContainer
              width="100%"
              height={250}
            >

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  innerRadius={65}
                  outerRadius={90}
                >

                  {statusData.map(
                    (_, index) => (

                      <Cell
                        key={index}
                        fill={[
                          "#635bff",
                          "#f59e0b",
                          "#2697ff",
                          "#ef5350"
                        ][index]}
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bar Chart */}

        <div className="panel">

          <div className="panel-header">

            <div>
              <h3>
                Weekly Orders
              </h3>

              <p>
                Orders by day
              </p>
            </div>

          </div>

          <div className="chart">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={orderData}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border)"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="orders"
                  fill="var(--primary)"
                  radius={[5, 5, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Recent Orders */}

        <div className="panel recent-orders">

          <div className="panel-header">

            <div>
              <h3>
                Recent Orders
              </h3>

              <p>
                Latest transactions
              </p>
            </div>

          </div>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr key={order.id}>

                    <td>
                      <strong>
                        {order.id}
                      </strong>
                    </td>

                    <td>
                      {order.customer}
                    </td>

                    <td>
                      {order.product}
                    </td>

                    <td>
                      {order.amount}
                    </td>

                    <td>
                      <StatusBadge
                        status={order.status}
                      />
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}