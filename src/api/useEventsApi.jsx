import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useEventsApi = () => {
  const axiosSecure = useAxiosSecure();

  const myEventsPromise = (email) => {
    return axiosSecure
      .get(`/manageEvents?email=${email}`)
      .then((res) => res.data);
  };
  const getEventById = (id) => {
    return axiosSecure.get(`/sportsEvents/${id}`).then((res) => res.data);
  };

  const updateEvent = (id, updatedData) => {
    return axiosSecure
      .put(`/sportsEvents/${id}`, updatedData)
      .then((res) => res.data);
  };
  const deleteEvent = (id) => {
    return axiosSecure.delete(`/sportsEvents/${id}`);
  };

  return {
    myEventsPromise,
    deleteEvent,
    getEventById,
    updateEvent,
  };
};

export default useEventsApi;
