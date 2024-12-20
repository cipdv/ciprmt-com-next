"use client";
import React, { useState } from "react";
import {
  addAppointments,
  sendAppointmentReminders,
  populateAppointmentsForDateRange,
} from "@/app/_actions";

const TestPage = () => {
  const [results, setResults] = useState(null);

  const handleAddAppointments = async () => {
    const result = await addAppointments();
    setResults(result);
  };

  const handleSendAppointmentReminders = async () => {
    const result = await sendAppointmentReminders();
    setResults(result);
  };

  const handlepopulateAppointmentsForDateRange = async () => {
    const result = await populateAppointmentsForDateRange();
    setResults(result);
  };

  return (
    <div className="space-y-4 m-8">
      <h1>Test Page</h1>
      <button className="btn" onClick={handleAddAppointments}>
        Call: Add Appointments
      </button>

      <div>
        <button className="btn" onClick={handleSendAppointmentReminders}>
          Call: Send Appointment Reminders
        </button>
      </div>
      <div>
        <button
          className="btn"
          onClick={handlepopulateAppointmentsForDateRange}
        >
          Call populate appointments
        </button>
      </div>
    </div>
  );
};

export default TestPage;
