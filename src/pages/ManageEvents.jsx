import EventsList from "@/components/EventsList";
import { AuthContext } from "@/contexts/AuthContext";
import { Suspense, use, useEffect, useState } from "react";
import useEventsApi from "../api/useEventsApi";
import Swal from "sweetalert2";
import noData from "../assets/Nodata.json";
import Lottie from "lottie-react";
import Loading2 from "@/components/Loading2";

const ManageEvents = () => {
  const { user } = use(AuthContext);
  const { myEventsPromise, deleteEvent } = useEventsApi();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    myEventsPromise(user.email)
      .then((data) => {
        setEvents(data.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.email, myEventsPromise]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this Event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });
    if (result.isConfirmed) {
      try {
        await deleteEvent(id);
        setEvents((prev) => prev.filter((booking) => booking._id !== id));

        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      } catch (error) {
        console.error("Cancel Error:", error);
        Swal.fire("Error", "Failed to cancel booking.", "error");
      }
    }
  };


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
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage My Events</h2>
      {currentEvents.length > 0 ? (
        <>
          <Suspense>
            <EventsList
              currentEvents={currentEvents}
              handleDelete={handleDelete}
            ></EventsList>
          </Suspense>

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
        </>
      ) : (
        <div>
          <Lottie animationData={noData} loop={true} />
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
