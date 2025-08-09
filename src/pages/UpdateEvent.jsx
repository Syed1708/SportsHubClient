import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get(`/sportsEvents/${id}`).then((res) => {
      setEvent(res.data);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedEvent = {
      name: form.name.value,
      type: form.type.value,
      date: form.date.value,
      description: form.description.value,
      image: form.image.value,
    };

    await axiosSecure.put(`/sportsEvents/${id}`, updatedEvent);

    navigate("/manageEvents");
  };

  if (!event) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          defaultValue={event.name}
          className="input input-bordered w-full"
          required
        />
        <select
          name="type"
          defaultValue={event.type}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Event Type</option>
          <option value="Swimming">Swimming</option>
          <option value="Sprinting">Sprinting</option>
          <option value="Long Jump">Long Jump</option>
          <option value="High Jump">High Jump</option>
          <option value="Hurdle Race">Hurdle Race</option>
        </select>
        <input
          name="date"
          type="date"
          defaultValue={event.date}
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          defaultValue={event.description}
          className="textarea textarea-bordered w-full"
        />
        <input
          name="image"
          defaultValue={event.image}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
