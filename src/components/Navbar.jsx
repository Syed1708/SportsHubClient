import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.jpg";
import useAxiosSecure from "@/hooks/useAxiosSecure";

export default function Navbar() {
  const { user, signOutUser } = use(AuthContext);

  const axiosSecure = useAxiosSecure();

  const handleSignOut = async () => {
    try {
      await axiosSecure.post("/logout");
      await signOutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-7 w-52 p-4 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/events">Events</NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink to="/create-event">Create Event</NavLink>
                </li>
                <li>
                  <NavLink to="/myBookings">My Bookings</NavLink>
                </li>
                <li>
                  <NavLink to="/manageEvents">Manage Events</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className=" cursor-pointer text-xl">
          {" "}
          <img src={logo} alt="SportsHub" className="  h-20" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>

          {user && (
            <>
              <li>
                <NavLink to="/create-event">Create Event</NavLink>
              </li>
              <li>
                <NavLink to="/myBookings">My Bookings</NavLink>
              </li>
              <li>
                <NavLink to="/manageEvents">Manage Events</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        <ThemeToggle />

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt={user.displayName} src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-4 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>

              <li>
                <Link onClick={handleSignOut}>Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
