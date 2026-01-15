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
    setResults([]);

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
    <div className="flex flex-col gap-6">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter research topic..."
          className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow transition"
          disabled={loading}
        >
          {loading ? (
            <>
              {/* CSS Spinner */}
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
              Searching...
            </>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Results */}
      <div className="flex flex-col gap-4 mt-4 max-h-[60vh] overflow-y-auto pr-2">
        {results.length === 0 && !loading && (
          <p className="text-gray-400 text-sm">No results found.</p>
        )}

        {results.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 border border-gray-700 rounded-xl bg-gray-800 hover:bg-gray-700 transition shadow hover:shadow-lg"
          >
            <h3 className="text-lg font-bold text-purple-400 hover:underline mb-2">
              {item.title}
            </h3>
            <p className="text-gray-300 text-sm mb-2 line-clamp-4">
              {item.content}
            </p>
            <p className="text-gray-500 text-xs">
              Score: {item.score.toFixed(2)}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
