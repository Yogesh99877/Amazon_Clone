import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const monthlyData = [
  {
    month: "Jan",
    revenue: 18000,
    orders: 240,
    customers: 180,
  },
  {
    month: "Feb",
    revenue: 24000,
    orders: 310,
    customers: 220,
  },
  {
    month: "Mar",
    revenue: 21000,
    orders: 285,
    customers: 205,
  },
  {
    month: "Apr",
    revenue: 32000,
    orders: 410,
    customers: 290,
  },
  {
    month: "May",
    revenue: 28000,
    orders: 360,
    customers: 260,
  },
  {
    month: "Jun",
    revenue: 36000,
    orders: 480,
    customers: 340,
  },
  {
    month: "Jul",
    revenue: 42000,
    orders: 540,
    customers: 390,
  },
  {
    month: "Aug",
    revenue: 39000,
    orders: 510,
    customers: 370,
  },
  {
    month: "Sep",
    revenue: 48000,
    orders: 620,
    customers: 450,
  },
];

export default function Analytics() {
  return (
    <div className="page">
      <div className="analytics-cards">
        <div className="analytics-card">
          <span>Revenue Growth</span>
          <strong>24.8%</strong>
          <small>Compared with last year</small>
        </div>

        <div className="analytics-card">
          <span>Conversion Rate</span>
          <strong>4.82%</strong>
          <small>+0.64% this month</small>
        </div>

        <div className="analytics-card">
          <span>Customer Growth</span>
          <strong>18.6%</strong>
          <small>+4.2% this month</small>
        </div>

        <div className="analytics-card">
          <span>Average Order</span>
          <strong>$142</strong>
          <small>+$12 this month</small>
        </div>
      </div>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Revenue & Orders</h3>
            <p>
              Monthly performance analysis
            </p>
          </div>

          <select defaultValue="9">
            <option value="9">
              Last 9 months
            </option>
            <option value="12">
              Last 12 months
            </option>
          </select>
        </div>

        <div className="large-chart">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#4f46e5"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="95%"
                    stopColor="#4f46e5"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />

              <YAxis
                tickFormatter={(value) =>
                  `$${value / 1000}k`
                }
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                fill="url(#revenueGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h3>Customer Growth</h3>
            <p>
              New customers acquired each month
            </p>
          </div>
        </div>

        <div className="large-chart">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={monthlyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="customers"
                name="New Customers"
                stroke="#06b6d4"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#f59e0b"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}