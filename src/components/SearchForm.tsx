import { useState } from "react";
import axios from "axios";

interface ResearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

interface SearchResponse {
  query: string;
  results: ResearchResult[];
  summary: string;
  timestamp: string;
}

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<SearchResponse>(
        "http://127.0.0.1:8000/api/research",
        {
          query,
          max_results: 5,
          language: "en",
        }
      );

      setResults(response.data.results);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSearch} className="flex flex-col gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter research topic"
          className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded text-white font-medium transition"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col gap-4 mt-4 max-h-[60vh] overflow-y-auto">
        {results.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-gray-700 rounded hover:bg-gray-800 transition"
          >
            <h3 className="text-lg font-semibold text-blue-400 hover:underline">
              {item.title}
            </h3>
            <p className="text-gray-300 mt-1 text-sm line-clamp-4">
              {item.content}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Score: {item.score.toFixed(2)}
            </p>
          </a>
        ))}
        {results.length === 0 && !loading && (
          <p className="text-gray-400 text-sm">No results found.</p>
        )}
      </div>
    </div>
  );
}
