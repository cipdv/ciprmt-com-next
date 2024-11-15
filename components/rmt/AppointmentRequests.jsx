"use client";

import React from "react";
import { updateAppointmentStatus } from "@/app/_actions";
import { useFormStatus } from "react-dom";

function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full px-3 py-1.5 rounded text-sm font-medium text-white transition-colors duration-200 ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : children === "Accept"
          ? "bg-green-500 hover:bg-green-600"
          : "bg-red-500 hover:bg-red-600"
      }`}
    >
      {pending ? "Processing..." : children}
    </button>
  );
}

const AppointmentRequests = ({ appointments }) => {
  const appointmentRequests = appointments.filter(
    (appointment) => appointment.status === "requested"
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Appointment Requests
      </h2>
      {appointmentRequests.length === 0 ? (
        <div className="p-8 bg-white rounded-md shadow-sm">
          <p className="text-gray-600 text-center text-lg">
            There are currently no appointment requests.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointmentRequests.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {appointment.firstName} {appointment.lastName}
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    {appointment.appointmentDate} at{" "}
                    {appointment.appointmentBeginsAt}
                  </p>
                  <p>for {appointment.duration} minutes</p>
                  <p>
                    <span className="font-medium">Reason:</span>{" "}
                    {appointment?.consentForm?.reasonForMassage || "Unknown"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-4 space-x-2">
                <form action={updateAppointmentStatus} className="flex-1">
                  <input
                    type="hidden"
                    name="appointmentId"
                    value={appointment._id}
                  />
                  <input type="hidden" name="status" value="booked" />
                  <SubmitButton>Accept</SubmitButton>
                </form>
                <form action={updateAppointmentStatus} className="flex-1">
                  <input
                    type="hidden"
                    name="appointmentId"
                    value={appointment._id}
                  />
                  <input type="hidden" name="status" value="available" />
                  <SubmitButton>Deny</SubmitButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentRequests;