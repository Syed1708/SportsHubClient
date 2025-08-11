import Loading from "@/components/Loading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Lottie from "lottie-react";
import noData from "../assets/Nodata.json";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading2 from "@/components/Loading2";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
    const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

const axiosSecure = useAxiosSecure();

  useEffect(() => {

    axiosSecure.get('/sportsEvents')
    .then((data) => {
      setEvents(data.data.data || []);
    })
    .catch((err) => {
      console.error("Failed to fetch events:", err);
    })
    .finally(() => {
      setLoading(false); 
    });
}, [axiosSecure]);

      // Pagination
  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE); 
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEvents = events.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  if (loading) return <Loading2 />;


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>

            {currentEvents.length > 0 ? (
        <>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentEvents.map((event) => (
          <>
          <div
            key={event._id}
            className="card shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={event.picture}
              alt={event.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
              <p className="mt-2">{event.description.slice(0, 80)}...</p>
              <Link
                to={`/events/${event._id}`}
                className="btn btn-primary mt-4 w-full"
              >
                View Details
              </Link>
            </div>
          </div>

          </>
        ))}
      </div>

             </>
      ) : (
        <div>
          <Lottie animationData={noData} loop={true} />
        </div>
      )}

               {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={goPrev}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={goNext}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline"
            >
              Next
            </button>
          </div>

    </div>
  );
};

export default Events;
