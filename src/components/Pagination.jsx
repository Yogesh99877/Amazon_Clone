export default function Pagination({
  page,
  totalPages,
  onPageChange
}) {

  return (

    <div className="pagination">

      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
      >
        ← Previous
      </button>

      <div className="pages">

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((number) => (

          <button
            key={number}
            className={
              page === number
                ? "page-active"
                : ""
            }
            onClick={() =>
              onPageChange(number)
            }
          >
            {number}
          </button>

        ))}

      </div>

      <button
        disabled={page === totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
      >
        Next →
      </button>

    </div>
  );
}