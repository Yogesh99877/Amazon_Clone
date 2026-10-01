import { useEffect, useMemo, useState } from "react";

import { getProducts } from "../services/api";
import Pagination from "../components/Pagination";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const perPage = 6;

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError(
          "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(
      products.map((product) => product.category)
    ),
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    if (sort === "low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) =>
          b.rating.rate - a.rating.rate
      );
    }

    return result;
  }, [products, search, category, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / perPage
    )
  );

  const currentProducts =
    filteredProducts.slice(
      (page - 1) * perPage,
      page * perPage
    );

  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h3>{error}</h3>
        <button
          className="primary-btn"
          onClick={() =>
            window.location.reload()
          }
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
          <h2>Products</h2>
          <p>
            Manage your product inventory
          </p>
        </div>

        <button className="primary-btn">
          + Add Product
        </button>
      </div>

      <section className="panel">
        <div className="filters">
          <div className="filter-search">
            <span>⌕</span>

            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="default">
              Sort Products
            </option>
            <option value="low">
              Price: Low to High
            </option>
            <option value="high">
              Price: High to Low
            </option>
            <option value="rating">
              Highest Rating
            </option>
          </select>
        </div>

        <div className="products-grid">
          {currentProducts.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >
              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.title}
                />
              </div>

              <div className="product-info">
                <span className="category">
                  {product.category}
                </span>

                <h3>{product.title}</h3>

                <div className="rating">
                  ★ {product.rating.rate}
                  <span>
                    ({product.rating.count})
                  </span>
                </div>

                <div className="product-footer">
                  <strong>
                    ${product.price.toFixed(2)}
                  </strong>

                  <button className="small-btn">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
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