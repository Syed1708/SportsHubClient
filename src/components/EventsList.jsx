import React from "react";
import { Link } from "react-router";
const EventsList = ({ events, handleDelete }) => {
  return (
    <div className="overflow-x-auto">

          <table className="table w-full">
            <thead>
              <tr>
                <th>Event</th>
                <th>Date</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.eventName}</td>
                  <td>{event.eventDate}</td>
                  <td>{event.eventType}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/edit-event/${event._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

    </div>
  );
};

export default EventsList;
