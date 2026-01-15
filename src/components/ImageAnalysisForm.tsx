import { useState, useRef, useCallback } from "react";
import axios from "axios";

interface ImageAnalysis {
  summary: string;
  key_findings: string[];
  recommendations: string[];
  next_steps: string[];
  disclaimer: string;
  language: string;
  timestamp: string;
}

interface ImageAnalysisResponse {
  extracted_text?: string;
  analysis?: ImageAnalysis;
}

export default function ImageAnalysisForm() {
  const [file, setFile] = useState<File | null>(null);
  const [language] = useState("en");
  const [extractTextOnly, setExtractTextOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ImageAnalysisResponse | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle drag & drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image to analyze.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);
    formData.append("extract_text_only", extractTextOnly.toString());

    setLoading(true);
    setProgress(0);
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/analyze-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
            );
            setProgress(percent);
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Failed to analyze image. Check console for details.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg"
      >
        {/* Drag & Drop Area */}
        <div
          className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-purple-500 rounded-xl bg-gray-800 text-gray-400 cursor-pointer hover:bg-gray-700 transition"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current?.click()}
        >
          {file ? (
            <p className="text-white font-medium">{file.name}</p>
          ) : (
            <p>Drag & Drop an image here, or click to select</p>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Extract Text Only */}
        <label className="flex items-center gap-2 text-gray-300">
          <input
            type="checkbox"
            checked={extractTextOnly}
            onChange={(e) => setExtractTextOnly(e.target.checked)}
            className="accent-purple-500"
          />
          Extract Text Only
        </label>

        {/* Upload Progress Bar */}
        {loading && (
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow flex items-center justify-center transition"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
      </form>

      {/* Display Result */}
      {result && (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-white shadow-lg">
          {result.extracted_text && (
            <>
              <h3 className="font-bold text-xl mb-3">Extracted Text</h3>
              <pre className="whitespace-pre-wrap text-sm mb-5">
                {result.extracted_text}
              </pre>
            </>
          )}

          {result.analysis && (
            <>
              <h3 className="font-bold text-xl mb-3">Summary</h3>
              <p className="mb-4">{result.analysis.summary}</p>

              <h3 className="font-bold text-xl mb-3">Key Findings</h3>
              <ul className="list-disc list-inside mb-4">
                {result.analysis.key_findings.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="font-bold text-xl mb-3">Recommendations</h3>
              <ul className="list-disc list-inside mb-4">
                {result.analysis.recommendations.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <h3 className="font-bold text-xl mb-3">Next Steps</h3>
              <ul className="list-disc list-inside">
                {result.analysis.next_steps.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
