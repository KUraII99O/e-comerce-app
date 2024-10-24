import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Store } from "../SellerDashboard/components/Store/StoreService";

const AboutTheStore = () => {
  const { storeId } = useParams(); // Use useParams to get the id from the URL
  const [storeData, setStoreData] = useState<Store>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/stores/${storeId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setStoreData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchStoreData();
  }, [storeId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-5">{error}</div>;
  if (!storeData) return null; // or handle the case when storeData is null

  return (
    <div className="container mx-auto p-5">
      
      <div className=" p-4 rounded-lg ">
        <h2 className="text-2xl font-semibold mb-2">About the Store</h2>
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: storeData.content || '' }} // Fallback to an empty string
        />
      </div>
    </div>
  );
};

export default AboutTheStore;
