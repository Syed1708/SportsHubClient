// pages/CreateEvent.jsx
import { use } from "react";
import EventForm from "../components/EventForm";
import { useNavigate } from "react-router";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const handleCreate = async (payload) => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/sportsEvents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      toast.success("Event created!");
      navigate("/events");
    } else {
      toast.error("Failed to create event.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Create Event</h2>
      <EventForm user={user} onSubmit={handleCreate} />
    </div>
  );
};

export default CreateEvent;
