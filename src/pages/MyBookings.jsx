import useBookingApi from "@/api/useBookingApi";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import noData from "../assets/Nodata3.json";
import Lottie from "lottie-react";
import Loading2 from "@/components/Loading2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const { myBookingPromise, deleteBooking } = useBookingApi();

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventFilter, setEventFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch bookings
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await myBookingPromise(user.email);
        setBookings(data || []);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchEvents();
    }
  }, [user.email, myBookingPromise]);

  // Apply filter and search
  useEffect(() => {
    filterBookings(bookings);
    setCurrentPage(1);
  }, [eventFilter, searchText, bookings]);

  const filterBookings = (data) => {
    let filtered = [...data];
    if (eventFilter !== "All" && searchText.trim() !== "") {
      filtered = filtered.filter((book) => {
        if (eventFilter === "EventName") {
          return book.eventName?.toLowerCase().includes(searchText.toLowerCase());
        }
        if (eventFilter === "Location") {
          return book.location?.toLowerCase().includes(searchText.toLowerCase());
        }
        return true;
      });
    }
    setFilteredEvents(filtered);
  };

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Cancel booking
  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBooking(id);
        const updatedBookings = bookings.filter((booking) => booking._id !== id);
        setBookings(updatedBookings);
        filterBookings(updatedBookings);

        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      } catch (error) {
        console.error("Cancel Error:", error);
        Swal.fire("Error", "Failed to cancel booking.", "error");
      }
    }
  };

  if (loading) return <Loading2 />;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>
          {/* Filter + Search */}
          <div className="flex flex-wrap gap-4 items-center mb-4">
            <div>
              <label htmlFor="filter" className="mr-2 font-semibold">
                Filter by:
              </label>
              <select
                id="filter"
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
                className="select select-bordered select-sm w-40"
              >
                <option value="All">All</option>
                <option value="EventName">Event Name</option>
                <option value="Location">Location</option>
              </select>
            </div>

            <input
              type="text"
              placeholder={`Search by ${eventFilter === "All" ? "..." : eventFilter}`}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="input input-bordered input-sm w-64"
              disabled={eventFilter === "All"}
            />
          </div>
      {currentEvents.length > 0 ? (
        <>


          {/* Booking Table */}
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEvents.map((booking) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.isDeleted ? "Deleted Event" : booking.eventName}</td>
                    <td>{booking.isDeleted ? "N/A" : booking.eventDate}</td>
                    <td>{booking.isDeleted ? "N/A" : booking.eventType}</td>
                    <td>{booking.isDeleted ? "N/A" : booking.location}</td>
                    <td>
                      <button
                        disabled={booking.isDeleted}
                        onClick={() => handleCancel(booking.bookingId)}
                        className="btn btn-sm btn-error disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-72 h-72">
            <Lottie animationData={noData} loop={true} />
          </div>
          <p className="text-red-500 text-lg mt-4">
            Opps!! No Bookings found.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
