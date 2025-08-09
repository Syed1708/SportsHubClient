// components/FeaturedEvents.jsx
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router";
import Loading from "./Loading";
import noData from "../assets/Nodata3.json";
import Lottie from "lottie-react";

export default function FeaturedEvents() {
  const [events, setEvents] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/sportsEvents")
      .then((res) => {
        setEvents(res.data.data.slice(0, 6));
      })
      .catch((error) => {
        console.error("Error fetching sports events:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) return <Loading />;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Events</h2>
      {events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <img src={event.picture} alt={event.eventName} />
                <h3 className="text-xl font-semibold mb-2">
                  {event.eventName}
                </h3>
                <p className="text-gray-600 mb-1">📅 {event.eventDate}</p>
                <p className="text-gray-600 mb-4">📍 {event.location}</p>
                <a
                  href={`/events/${event._id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/events"
              className="inline-block bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-900 transition"
            >
              See All Events
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-100 h-100">
            <Lottie animationData={noData} loop={true} />
          </div>
          <p className="text-red-500 text-lg mt-4">
            Opps!! No Featured Events found.
          </p>
        </div>
      )}
    </section>
  );
}
