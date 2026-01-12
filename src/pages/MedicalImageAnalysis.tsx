import React, { useState } from "react";

export default function MedicalImageAnalysis() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState("");

  const handleUpload = () => {
    if (!image) return;
    setResult(`Uploaded image: ${image.name}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Analyze Medical Image
      </h2>
      <input
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />
      <button
        className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-text-light"
        onClick={handleUpload}
      >
        Upload & Analyze
      </button>
      {result && (
        <div className="mt-4 p-4 rounded-xl bg-gray-700 text-white">
          {result}
        </div>
      )}
    </div>
  );
}
