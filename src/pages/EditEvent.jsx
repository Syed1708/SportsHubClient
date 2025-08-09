import { useEffect, useState, use } from "react";
import EventForm from "../components/EventForm";
import { useNavigate, useParams } from "react-router";
import Loading from "@/components/Loading";
import useEventsApi from "@/api/useEventsApi";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

const EditEvent = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);
  const { getEventById, updateEvent } = useEventsApi();
  const [loading, setLoading] = useState(true);


    useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);

        if (!data || data.isDeleted) {
          navigate("/error");
        } else {
          setEventData(data.data);
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
  

  const handleUpdate = (formData) => {
    updateEvent(id, formData)
      .then(() => {
        toast.success("Event updated successfully");
        navigate("/manageEvents");
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Edit Event</h2>
      <EventForm initialData={eventData} user={user} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditEvent;
