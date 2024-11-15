// components/rmt/TreatmentDetails.jsx
"use client";

import { useState } from "react";

const TreatmentDetails = ({ treatment, onSelectTreatment }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(treatment));
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    onSelectTreatment(treatment);
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-6 cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onTouchStart={handleTouchStart}
    >
      <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span> {treatment.firstName}{" "}
          {treatment.lastName}
        </p>
        <p>
          <span className="font-semibold">Location:</span> {treatment.location}
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {new Date(treatment.appointmentDate).toLocaleDateString()}
        </p>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Tap or drag this card to add treatment notes
      </p>
    </div>
  );
};

export default TreatmentDetails;