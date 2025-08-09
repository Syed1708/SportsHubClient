import React from "react";
import notFound from "../assets/404.json";
import { NavLink } from "react-router";
import Lottie from "lottie-react";
export default function PageNotFound() {
  return (
    <>
    
      <div className="p-10 mx-auto w-10/12 text-center flex flex-col items-center justify-center min-h-screen">
        <Lottie animationData={notFound} loop={true} />
        <NavLink to="/">
          <button className="btn btn-primary">Go Back Home</button>
        </NavLink>
      </div>
    </>
  );
}
