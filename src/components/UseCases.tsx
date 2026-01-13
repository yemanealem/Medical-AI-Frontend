export default function UseCases() {
  return (
    <section className="py-28 bg-white/5">
      <h2 className="text-3xl font-bold text-center mb-16">
        Designed for Real Healthcare Users
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Patients */}
        <div className="p-8 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-4">For Patients</h3>
          <ul className="space-y-3 text-gray-400">
            <li>• Understand medical reports in plain language</li>
            <li>• Ask health questions safely</li>
            <li>• Validate prescriptions before taking medication</li>
            <li>• Reduce anxiety with trusted explanations</li>
          </ul>
        </div>

        {/* Doctors */}
        <div className="p-8 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold mb-4">For Doctors</h3>
          <ul className="space-y-3 text-gray-400">
            <li>• Rapid medical text summarization</li>
            <li>• Image interpretation support</li>
            <li>• Prescription cross-checking</li>
            <li>• Decision support — not automation</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
