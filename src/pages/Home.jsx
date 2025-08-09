import FeaturedEvents from "@/components/FeaturedEvents ";
import PopularSports from "@/components/PopularSports";
import Testimonials from "@/components/Testimonials";
import React from "react";

export default function Home() {
  return (
    <>
       <FeaturedEvents/>
       <PopularSports/>
       <Testimonials/>
    </>
  );
}
