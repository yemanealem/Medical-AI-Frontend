export default function TrustSection() {
  return (
    <section className="py-20 border-t border-white/10">
      <div className="grid grid-cols-3 max-w-6xl mx-auto text-center gap-10">
        <div>
          <h3 className="font-semibold">Privacy-first AI</h3>
          <p className="text-gray-400 mt-2">
            Your medical data stays private and protected.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Clinically aligned</h3>
          <p className="text-gray-400 mt-2">
            Designed with medical reasoning principles.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">Human oversight</h3>
          <p className="text-gray-400 mt-2">
            AI supports-not replaces - professionals.
          </p>
        </div>
      </div>
    </section>
  );
}
