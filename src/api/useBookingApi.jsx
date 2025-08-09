import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useBookingApi = () => {
  const axiosSecure = useAxiosSecure();

  const myBookingPromise = async (userEmail) => {
    try {
      const response = await axiosSecure.get(`/myBookings?email=${userEmail}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user bookings:", error);
      return [];
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      const response = await axiosSecure.delete(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to delete booking:", error);
      throw error;
    }
  };
  return {
    myBookingPromise,
    deleteBooking,
  };
};

export default useBookingApi;
