import { useEffect, useState } from "react";

const EventForm = ({ user, onSubmit, initialData = null }) => {
   const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    eventDate: "",
    location: "",
    description: "",
    picture: "",
    creatorName: user?.displayName || "",
    creatorEmail: user?.email || "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="eventName"
        placeholder="Event Name"
        value={formData.eventName}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <select
        name="eventType"
        value={formData.eventType}
        onChange={handleChange}
        required
        className="select select-bordered w-full"
      >
        <option value="" disabled>Select Event Type</option>
        <option value="Swimming">Swimming</option>
        <option value="Sprinting">Sprinting</option>
        <option value="Long Jump">Long Jump</option>
        <option value="High Jump">High Jump</option>
        <option value="Hurdle Race">Hurdle Race</option>
      </select>
      <input
        type="date"
        name="eventDate"
        value={formData.eventDate}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="textarea textarea-bordered w-full"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
            <input
        type="text"
        name="picture"
        placeholder="Image URL"
        value={formData.picture}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary">
        {initialData ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
};

export default EventForm;
