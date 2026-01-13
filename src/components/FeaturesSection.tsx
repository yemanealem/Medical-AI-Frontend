export default function FeaturesSection() {
  const items = [
    "Medical AI Chat",
    "Clinical Text Analysis",
    "Medical Image Interpretation",
    "Prescription Validation",
  ];

  return (
    <section className="py-24">
      <h2 className="text-3xl font-bold text-center mb-12">
        Core AI Capabilities
      </h2>

      <div className="grid grid-cols-2 max-w-4xl mx-auto gap-8">
        {items.map((i) => (
          <div
            key={i}
            className="border border-white/10 p-6 rounded-xl bg-white/5"
          >
            {i}
          </div>
        ))}
      </div>
    </section>
  );
}
