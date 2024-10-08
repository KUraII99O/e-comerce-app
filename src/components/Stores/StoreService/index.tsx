import { v4 as uuidv4 } from "uuid";

export type Store = {
  id: string;
  storeName: string;
  location: string;
  ownerName: string;
  contactEmail: string;
  contactNumber: string;
  registrationDate: string;
  status: boolean;
  userId: string;
  image: string;
};

const StoreService = {
  fetchStores,
  addStore,
  editStore,
  toggleStoreStatus,
  deleteStore,
};

// Fetch all stores for the logged-in user
async function fetchStores(): Promise<Store[]> {
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
    const storeData: Store[] = await response.json();
    return storeData;
  } catch (error) {
    console.error("Error fetching store data:", (error as Error).message);
    return [];
  }
}

// Add a new store
async function addStore(
  newStore: Omit<Store, "id" | "userId">
): Promise<Store> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const storeWithId: Store = { id: uuidv4(), userId: user.id, ...newStore };

    const response = await fetch("http://localhost:3000/api/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeWithId),
    });

    if (response.status === 403) {
      throw new Error("Limit has been reached");
    } else if (!response.ok) {
      throw new Error("Failed to add store");
    }

    return storeWithId;
  } catch (error) {
    console.error("Error adding store:", (error as Error).message);
    throw error;
  }
}

// Edit an existing store
async function editStore(
  id: string,
  updatedStore: Omit<Store, "id" | "userId">
): Promise<void> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/api/stores/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedStore, userId: user.id }),
    });
    if (!response.ok) {
      throw new Error("Failed to update store");
    }
  } catch (error) {
    console.error("Error updating store:", (error as Error).message);
    throw error;
  }
}

// Toggle store status (e.g., active/inactive)
async function toggleStoreStatus(id: string): Promise<Store> {
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
      `http://localhost:3000/api/stores/${id}/toggle-status`,
      {
        method: "PUT",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to toggle store status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error toggling store status:", (error as Error).message);
    throw error;
  }
}

// Delete a store
async function deleteStore(id: string): Promise<void> {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    throw new Error("User not logged in");
  }

  const user = JSON.parse(loggedInUser);
  if (!user || !user.id) {
    throw new Error("User ID not found");
  }

  try {
    const response = await fetch(`http://localhost:3000/api/stores/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete store");
    }
  } catch (error) {
    console.error("Error deleting store:", (error as Error).message);
    throw error;
  }
}

export { StoreService };
