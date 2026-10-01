export default function StatCard({
  title,
  value,
  change,
  icon
}) {

  return (

    <div className="stat-card">

      <div className="stat-header">

        <div className="stat-icon">
          {icon}
        </div>

        <span className="positive">
          ↗ {change}
        </span>

      </div>

      <p>
        {title}
      </p>

      <h2>
        {value}
      </h2>

      <small>
        Compared with last month
      </small>

    </div>
  );
}