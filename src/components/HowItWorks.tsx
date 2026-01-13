export default function HowItWorks() {
  const steps = [
    {
      title: "Input Medical Data",
      desc: "You provide symptoms, reports, images, or prescriptions through a secure interface.",
    },
    {
      title: "AI Clinical Reasoning",
      desc: "Our AI analyzes inputs using medically-aligned reasoning models and validated sources.",
    },
    {
      title: "Safety & Confidence Layer",
      desc: "Responses are filtered, cross-checked, and constrained to clinical-safe outputs.",
    },
    {
      title: "Human Decision Support",
      desc: "AI assists understanding — final decisions always remain with humans.",
    },
  ];

  return (
    <section className="py-28 border-t border-white/10">
      <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white/5 border border-white/10"
          >
            <span className="text-blue-500 font-semibold">Step {i + 1}</span>
            <h3 className="mt-3 font-semibold">{s.title}</h3>
            <p className="text-gray-400 mt-2 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
