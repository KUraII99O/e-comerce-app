import React from "react";
import ProductCard from "../../../components/ProductCard";
import FeatureCards from "../../../components/FeatureCards";
import ProductAd from "../../../components/ProductAd";
import CategoryList from "../../../components/CategoryList";
import DealsOfTheDay from "../../../components/DealsOfTheDay";

const HomePage = () => {
  return (
    <div>
      <CategoryList />
      <FeatureCards />
      <ProductCard />
      <ProductAd />
      <DealsOfTheDay />

      
    </div>
  );
};

export default HomePage;
