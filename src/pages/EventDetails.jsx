import useEventsApi from "@/api/useEventsApi";
import Loading from "@/components/Loading";
import { AuthContext } from "@/contexts/AuthContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { getEventById } = useEventsApi();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);

        if (!data || data.isDeleted) {
          navigate("/error");
        } else {
          setEvent(data.data);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        navigate("/error");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  useEffect(() => {
    const checkIfBooked = async () => {
      try {
        const res = await axiosSecure.get(
          `/bookings/check?userEmail=${user.email}&eventId=${id}`
        );
        if (res.data?.isBooked) {
          setIsBooked(true);
        }
      } catch (err) {
        console.error("Error checking booking:", err);
      }
    };

    if (user?.email && id) {
      checkIfBooked();
    }
  }, [user, id, axiosSecure]);

  const handleBooking = async () => {
    const bookingPayload = {
      eventId: event._id,
      userEmail: user.email,
      isBooked: true,
      bookingTime: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingPayload);
      if (res.status === 200 || res.status === 201) {
        toast.success("Booked successfully!");
        navigate("/myBookings");
      }
    } catch (error) {
      toast.error("Booking failed.");
      console.error(error);
    }
  };

   if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <img
        src={event.picture}
        alt={event.name}
        className="w-full rounded-xl mb-6"
      />
      <h2 className="text-3xl font-bold">{event.eventName}</h2>
      <p className="text-gray-500">
        📅 {event.eventDate} | 🏷 {event.eventType}
      </p>
      <p className="mt-4">{event.description}</p>
      <div className="mt-6">
        <button
          onClick={handleBooking}
          disabled={isBooked}
          className="btn btn-success"
        >
          {isBooked ? "Already Booked" : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
