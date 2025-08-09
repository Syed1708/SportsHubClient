import { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useLocation, useNavigation } from "react-router";

import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import SlickSlider from "./components/SlickSlider";
import Loading1 from "./components/Loading1";
import Loading2 from "./components/Loading2";

function App() {
  const { state } = useNavigation();

  const DynamicTitle = () => {
    const location = useLocation();

    useEffect(() => {
      const path = location.pathname;

      const getTitle = () => {
        switch (path) {
          case "/":
            return "Home | 🏃 SportsHub";
          case "/login":
            return "Login | 🏃 SportsHub";
          case "/register":
            return "Register | 🏃 SportsHub";
          case "/events":
            return "Events | 🏃 SportsHub";
          case "/myBookings":
            return "My Booking | 🏃 SportsHub";
          case "/manageEvents":
            return "Manage Events | 🏃 SportsHub";
          case "/create-event":
            return "Create Event | 🏃 SportsHub";
          case "/edit-event":
            return "Edit Event | 🏃 SportsHub";
          default:
            return "🏃 SportsHub";
        }
      };

      document.title = getTitle();
    }, [location]);

    return null;
  };
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading1 />
      </div>
    );
  }

  return (
    <div className=" w-11/12 mx-auto">
      <ToastContainer />
      <Navbar />
      <Hero />
      <DynamicTitle />
      {state == "loading" ? <Loading2></Loading2> : <Outlet />}
      <SlickSlider />

      <Footer></Footer>
    </div>
  );
}

export default App;
