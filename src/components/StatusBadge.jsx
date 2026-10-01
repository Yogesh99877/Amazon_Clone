export default function StatusBadge({
  status
}) {

  const className =
    status
      .toLowerCase()
      .replace(" ", "-");

  return (

    <span
      className={`status ${className}`}
    >
      {status}
    </span>

  );
}