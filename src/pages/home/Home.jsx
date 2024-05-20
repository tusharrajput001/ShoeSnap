import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import ProductCard from "../../components/productCard/ProductCard";
import { Link } from "react-router-dom";
import HomeSearch from "../../components/filter/HomeSearch";
import Partners from "../../components/Partners/partners";
import ClientReviews from "../../components/ClientReviews/ClientReviews";

function Home() {
  return (
    <Layout>
      <HeroSection />
      <HomeSearch />
      <ProductCard />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={"/allproducts"}>
          <button className=" bg-gray-300 px-5 py-2 rounded-xl">
            See more
          </button>
        </Link>
      </div>
      <Partners />
      <ClientReviews />
    </Layout>
  );
}

export default Home;
