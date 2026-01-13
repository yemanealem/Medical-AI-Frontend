export default function SecuritySection() {
  const points = [
    {
      title: "Data Privacy",
      desc: "All data is encrypted in transit and at rest. No data is sold or reused.",
    },
    {
      title: "Regulatory Awareness",
      desc: "Designed with GDPR and HIPAA principles in mind.",
    },
    {
      title: "Ethical AI",
      desc: "No autonomous diagnosis. No replacement of professionals.",
    },
    {
      title: "Auditability",
      desc: "AI outputs are traceable and reviewable.",
    },
  ];

  return (
    <section className="py-28 border-t border-white/10">
      <h2 className="text-3xl font-bold text-center mb-16">
        Security, Privacy & Ethics
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {points.map((p) => (
          <div
            key={p.title}
            className="p-6 bg-white/5 border border-white/10 rounded-xl"
          >
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-gray-400 text-sm mt-2">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
