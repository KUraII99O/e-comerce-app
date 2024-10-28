import { useEffect, useState } from "react";
import TableThree from "../../Tables/TableThree";
import { useManageStore } from "../Provider";
import { toast } from "react-toastify";
import { Store } from "../StoreService";

const StoreList = () => {
    const [packageData, setPackageData] = useState<Store[]>([]);
    const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage errors
  const { deleteStore } = useManageStore();

  // Function to fetch stores
  const fetchStores = async () => {
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
        `http://localhost:3000/api/stores?userId=${user.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch store data");
      }
      const storeData = await response.json();
      setPackageData(storeData); // Set the fetched data in state
    } catch (error) {
      console.error("Error fetching store data:", (error as Error).message); // Type assertion here
      setError((error as Error).message); // Type assertion here
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  const handleDeleteConfirmation = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this store member?")) {
      await handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStore(id);
      toast.success("Store deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting the store.");
    }
  };

  useEffect(() => {
    fetchStores(); // Call the fetch function on component mount
  }, []);

  const handleReload = () => {
    console.log("Reload clicked");
    fetchStores(); // Call fetchStores to reload data
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  // Create edit links mapping
  const editLinks = packageData.reduce((acc, store) => {
    acc[store.id] = `/admin/ecommerce/stores/edit-store/${String(store.id)}`;
    return acc;
  }, {} as { [key: string]: string });

  return (
    <div>
      <TableThree
        data={packageData} // Pass the fetched data
        headers={[
          "ID",
          "Logo",
          "Name",
          "Earnings",
          "Products Count",
          "Vendor",
          "Created At",
        ]} // Custom headers
        createLink="/admin/ecommerce/stores/create"
        onReload={handleReload}
        editLinks={editLinks} // Pass the edit links object
      />
    </div>
  );
};

export default StoreList;
