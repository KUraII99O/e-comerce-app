import { useEffect, useState } from "react";
import TableThree from "../../components/Tables/TableThree";
import { Store, StoreService } from "../../components/Store/StoreService";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { Product } from "../../../Products/ProductsServie";

const ProductsListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize navigation

  // Fetch stores for the user on mount
  useEffect(() => {
    const fetchStoresForUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const stores = await StoreService.fetchStores();
        setStores(stores);

        if (stores.length > 0) {
          setStoreId(stores[0].id); // Set to the first store for the logged-in user
        } else {
          setError("No stores found for this user.");
        }
      } catch (error) {
        setError("Failed to fetch stores for the current user.");
      } finally {
        setLoading(false);
      }
    };

    fetchStoresForUser();
  }, []);

  // Fetch products based on selected storeId
  useEffect(() => {
    const fetchProducts = async () => {
      if (!storeId) return;

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/products?storeId=${storeId}`
        );
        if (!response.ok) throw new Error("Error fetching products");
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [storeId]);

  const handleReload = () => {
    console.log("Reload clicked");
    // Implement reload logic if needed
  };

  const handleImport = () => {
    console.log("Import clicked");
    // Implement import logic if needed
  };

  const handleExport = () => {
    console.log("Export clicked");
    // Implement export logic if needed
  };

  const handleCreateStore = () => {
    navigate("/admin/ecommerce/stores/create"); // Navigate to store creation page
  };

  const tableData = products.map((product) => ({
    id: product.id || "N/A",
    imageUrl: product.imageUrl,
    name: product.name,
    price: `$${product.price.toFixed(2)}`,
    stock: product.stock,
    category: product.category,
    discountPrice: product.discountPrice ? `$${product.discountPrice}` : "N/A",
  }));

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {loading ? (
        <p style={{ fontSize: "16px", color: "#555" }}>Loading...</p>
      ) : error && stores.length === 0 ? (
        <div style={{ marginTop: "20px" }}>
          <p style={{ color: "#cc0000", fontSize: "18px", marginBottom: "20px" }}>
            {error}
          </p>
          <button
            onClick={handleCreateStore}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            Create Store
          </button>
        </div>
      ) : (
        <TableThree
          data={tableData}
          headers={[
            "ID",
            "Image",
            "Name",
            "Price",
            "Stock",
            "Category",
            "Discount Price",
          ]}
          createLink="/admin/ecommerce/products/create"
          onReload={handleReload}
          onImport={handleImport}
          onExport={handleExport}
          editLinks={{}} // Optional: Add edit links if necessary
        />
      )}
    </div>
  );
};

export default ProductsListPage;
