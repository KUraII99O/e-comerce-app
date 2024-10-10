import ProductCard from "../../components/ProductCard";
import ProductAd from "../../components/ProductAd";
import DealsOfTheDay from "../../components/DealsOfTheDay";
import OurStores from "../../components/OurStores";

const HomePage = () => {
  return (
    <div>
      <OurStores />
      <ProductCard />
      <ProductAd />
      <DealsOfTheDay />
      

      
    </div>
  );
};

export default HomePage;
