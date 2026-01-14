export default function TextAnalysisForm() {
  return (
    <form className="flex flex-col gap-4">
      <label className="flex flex-col">
        Text Input
        <textarea
          placeholder="Enter text to analyze"
          rows={5}
          className="mt-1 px-2 py-1 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </label>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-medium transition"
      >
        Analyze
      </button>
    </form>
  );
}
