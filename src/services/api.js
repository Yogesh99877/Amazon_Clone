const USERS_API =
  "https://jsonplaceholder.typicode.com/users";

const PRODUCTS_API =
  "https://fakestoreapi.com/products";

export async function getUsers() {

  const response =
    await fetch(USERS_API);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch users"
    );
  }

  return response.json();
}

export async function getProducts() {

  const response =
    await fetch(PRODUCTS_API);

  if (!response.ok) {
    throw new Error(
      "Failed to fetch products"
    );
  }

  return response.json();
}