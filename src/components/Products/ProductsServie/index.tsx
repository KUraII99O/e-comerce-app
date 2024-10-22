import { v4 as uuidv4 } from "uuid";

export type Product = {
  oldPrice?: string;
  id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl: string;
  userId?: string;
  storeId?: string;
  reviewsCount?: string;
  discountPrice?: string;
};

const ProductService = {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct,
};

// Fetch all products for the logged-in user
async function fetchProducts(): Promise<Product[]> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(
      "http://localhost:3000/api/products?userId=" + user.id
    );
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }
    const productData: Product[] = await response.json();
    return productData;
  } catch (error) {
    console.error("Error fetching product data:", (error as Error).message);
    return [];
  }
}

// Add a new product
async function addProduct(
  newProduct: Omit<Product, "id" | "userId">
): Promise<Product> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const productWithId: Product = {
      id: uuidv4(),
      userId: user.id,
      ...newProduct,
    };

    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productWithId),
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    return productWithId;
  } catch (error) {
    console.error("Error adding product:", (error as Error).message);
    throw error;
  }
}

// Edit an existing product
async function editProduct(
  id: string,
  updatedProduct: Omit<Product, "id" | "userId">
): Promise<Product> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedProduct, userId: user.id }),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    const updatedProductData: Product = await response.json();
    return updatedProductData;
  } catch (error) {
    console.error("Error updating product:", (error as Error).message);
    throw error;
  }
}

// Delete a product
async function deleteProduct(id: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  } catch (error) {
    console.error("Error deleting product:", (error as Error).message);
    throw error;
  }
}

export { ProductService };
