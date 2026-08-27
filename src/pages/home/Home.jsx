import React from "react";

import Catogories from "../../components/catogories/Catogories";
import GetProducts from "../../components/getProducts/getProducts";
import Hero from "../../components/hero_section/Hero";
import Features from "../../components/features/Features";

export default function Home() {
  return (
    <div className="min-h-screen space-y-8 bg-[#FFFFFF] transition-colors duration-300 dark:bg-zinc-950">
      <Hero />
      <Catogories />
      <Features />
      <GetProducts />
    </div>
  );
}