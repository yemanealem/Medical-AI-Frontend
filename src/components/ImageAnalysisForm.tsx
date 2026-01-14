import { useState } from "react";
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
  const [result, setResult] = useState<ImageAnalysisResponse | null>(null);

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
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/analyze-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing image:", error);
      alert("Failed to analyze image. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 p-4 rounded-lg border border-gray-700"
      >
        {/* File Input */}
        <label className="flex flex-col">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
        </label>

        {/* Extract Text Only */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={extractTextOnly}
            onChange={(e) => setExtractTextOnly(e.target.checked)}
            className="accent-purple-500"
          />
          Extract Text Only
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {/* Display Result */}
      {result && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-white mt-4">
          {result.extracted_text && (
            <>
              <h3 className="font-bold text-lg mb-2">Extracted Text</h3>
              <pre className="whitespace-pre-wrap text-sm mb-4">
                {result.extracted_text}
              </pre>
            </>
          )}

          {result.analysis && (
            <>
              <h3 className="font-bold text-lg mb-2">Summary</h3>
              <p className="mb-4">{result.analysis.summary}</p>

              <h3 className="font-bold text-lg mb-2">Key Findings</h3>
              <ul className="list-disc list-inside mb-4">
                {result.analysis.key_findings.map(
                  (item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  )
                )}
              </ul>

              <h3 className="font-bold text-lg mb-2">Recommendations</h3>
              <ul className="list-disc list-inside mb-4">
                {result.analysis.recommendations.map(
                  (item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  )
                )}
              </ul>

              <h3 className="font-bold text-lg mb-2">Next Steps</h3>
              <ul className="list-disc list-inside">
                {result.analysis.next_steps.map((item: string, idx: number) => (
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
