import ReactMarkdown from "react-markdown";

interface Props {
  result: string;
  onClear: () => void;
}
const getRiskLevel = (text: string) => {
  if (/critical|severe|danger|life-threatening/i.test(text)) return "critical";
  if (/risk|warning|caution|maximum/i.test(text)) return "warning";
  return "safe";
};

const riskStyles: Record<string, string> = {
  safe: "bg-green-600/20 text-green-400",
  warning: "bg-yellow-600/20 text-yellow-400",
  critical: "bg-red-600/20 text-red-400",
};

const riskIcons: Record<string, string> = {
  safe: "✅",
  warning: "⚠️",
  critical: "🚨",
};

export default function PrescriptionResult({ result, onClear }: Props) {
  const riskLevel = getRiskLevel(result);

  return (
    <div className="mt-8 p-6 rounded-xl border border-gray-700 bg-gray-900 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          🩺 Prescription Validation Result
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${riskStyles[riskLevel]}`}
        >
          {riskIcons[riskLevel]} {riskLevel.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h2: ({ ...props }) => (
              <h2 className="text-lg text-blue-400 mt-6" {...props} />
            ),
            strong: ({ ...props }) => (
              <strong className="text-white" {...props} />
            ),
            li: ({ ...props }) => (
              <li className="marker:text-purple-400" {...props} />
            ),
          }}
        >
          {result}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClear}
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
        >
          Clear Result
        </button>
      </div>
    </div>
  );
}
