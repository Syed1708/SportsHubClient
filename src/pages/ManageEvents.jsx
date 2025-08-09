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

  if (loading) return <Loading2 />;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage My Events</h2>
      {events.length > 0 ? (
        <>
          <Suspense>
            <EventsList
              events={events}
              handleDelete={handleDelete}
            ></EventsList>
          </Suspense>
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
