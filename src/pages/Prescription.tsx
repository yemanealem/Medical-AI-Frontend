import React, { useState } from "react";

export default function Prescription() {
  const [form, setForm] = useState({
    patientName: "",
    medication: "",
    dosage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // call your API
    alert(`Prescription submitted: ${JSON.stringify(form)}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Submit Prescription
      </h2>
      <input
        type="text"
        name="patientName"
        placeholder="Patient Name"
        value={form.patientName}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-white"
      />
      <input
        type="text"
        name="medication"
        placeholder="Medication"
        value={form.medication}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-white"
      />
      <input
        type="text"
        name="dosage"
        placeholder="Dosage"
        value={form.dosage}
        onChange={handleChange}
        className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-white"
      />
      <button
        className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-text-light"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
