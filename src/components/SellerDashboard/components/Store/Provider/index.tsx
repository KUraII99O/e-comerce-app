import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Store, StoreService } from "../StoreService"; // Assuming you have Store and StoreService set up

export const ManageStoreContext = createContext<any>(null);

type ProviderProps = {
  children: ReactNode;
};

export const ManageStoreProvider: React.FC<ProviderProps> = ({ children }) => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await StoreService.fetchStores();
        console.log("Store data:", data); // Log store data
        setStores(data || []);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
  
    fetchStoreData();
  }, []);

  const addStore = async (newStore: Omit<Store, 'id'>) => {
    console.log("Adding store:", newStore);
    try {
      const data = await StoreService.addStore(newStore);
      console.log("Store added successfully:", data);
      setStores(prevStores => [...prevStores, data]);
      return null; // Return null if there's no error
    } catch (error) {
      console.error("Error adding store:", error);
      return error; // Return the error if there is one
    }
  };

 const editStore = async (id: string, updatedStore: Omit<Store, 'id'>) => {
  try {
    const data = await StoreService.editStore(id, updatedStore); // Ensure your service supports editing
    setStores(prevStores =>
      prevStores.map(store => (store.id === id ? { ...store, ...data } : store)) // Use data from response
    );
  } catch (error) {
    console.error("Error editing store:", error);
  }
};

  

  const deleteStore = async (id: string) => {
    try {
      await StoreService.deleteStore(id);
      setStores(prevStores => prevStores.filter(store => store.id !== id));
    } catch (error) {
      console.error("Error deleting store:", error);
    }
  };

  const value = {
    stores,
    addStore,
    editStore,
    deleteStore,
  };

  return (
    <ManageStoreContext.Provider value={value}>
      {children}
    </ManageStoreContext.Provider>
  );
};

export const useManageStore = () => {
  const context = useContext(ManageStoreContext);
  if (!context) {
    throw new Error("useManageStore must be used within a ManageStoreProvider");
  }
  return context;
};
