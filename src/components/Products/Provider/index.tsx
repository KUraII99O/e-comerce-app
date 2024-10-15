import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Product, ProductService } from "../ProductsServie";

export const ManageProductContext = createContext<any>(null);

type ProviderProps = {
  children: ReactNode;
};

export const ManageProductProvider: React.FC<ProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          throw new Error("User not logged in or user data not found");
        }
        const user = JSON.parse(loggedInUser);
        console.log("User ID:", user.id); // Log user ID
  
        const data = await ProductService.fetchProducts();
        console.log("Product data:", data); // Log product data
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProductData();
  }, []);

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    console.log("Adding product:", newProduct);
    try {
      const data = await ProductService.addProduct(newProduct);
      console.log("Product added successfully:", data);
      setProducts(prevProducts => [...prevProducts, data]);
      return null; // Return null if there's no error
    } catch (error) {
      console.error("Error adding product:", error);
      return error; // Return the error if there is one
    }
  };

  const editProduct = async (id: string, updatedProduct: Omit<Product, 'id'>) => {
    try {
      const data = await ProductService.editProduct(id, updatedProduct); // Ensure your service supports editing
      setProducts(prevProducts =>
        prevProducts.map(product => (product.id === id ? { ...product, ...data } : product)) // Use data from response
      );
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await ProductService.deleteProduct(id);
      setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const value = {
    products,
    addProduct,
    editProduct,
    deleteProduct,
  };

  return (
    <ManageProductContext.Provider value={value}>
      {children}
    </ManageProductContext.Provider>
  );
};

export const useManageProduct = () => {
  const context = useContext(ManageProductContext);
  if (!context) {
    throw new Error("useManageProduct must be used within a ManageProductProvider");
  }
  return context;
};
