import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-32 text-center">
      <h2 className="text-4xl font-bold mb-6">
        Start using AI responsibly in healthcare
      </h2>

      <p className="text-gray-400 max-w-2xl mx-auto mb-10">
        Explore medical AI tools designed to support understanding, accuracy,
        and better decisions.
      </p>

      <Link
        to="/chat"
        className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
        style={{
          backgroundColor: "var(--color-secondary)",
          color: "var(--color-text-light)",
        }}
      >
        Try the AI Assistant
      </Link>
    </section>
  );
}
