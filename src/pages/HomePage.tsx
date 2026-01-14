import { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import TrustSection from "../components/TrustSection";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import UseCases from "../components/UseCases";
import SecuritySection from "../components/SecuritySection";
import CTASection from "../components/CTASection";
import ChatWidget from "../components/ChatWidget";

// Import separate forms
import PrescriptionForm from "../components/PrescriptionForm";
import TextAnalysisForm from "../components/TextAnalysisForm";
import ImageAnalysisForm from "../components/ImageAnalysisForm";
import SearchForm from "../components/SearchForm";

export default function HomePage() {
  const [sidebar, setSidebar] = useState<
    "prescription" | "analyzeImage" | "analyzeText" | "search" | null
  >(null);

  // NEW: Language state
  const [language, setLanguage] = useState("en");

  return (
    <div
      className="bg-[#020617] text-white min-h-screen"
      style={{ background: "var(--gradient-auth)" }}
    >
      {/* Pass language and setter to Header */}
      <Header
        setSidebar={setSidebar}
        language={language}
        setLanguage={setLanguage}
      />

      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <HowItWorks />
      <UseCases />
      <SecuritySection />
      <CTASection />
      <ChatWidget language={language} />

      {/* Sidebar modal */}
      {sidebar && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebar(null)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-150 bg-gray-900 text-white shadow-lg z-50 transform transition-transform">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-lg font-bold capitalize">{sidebar}</h2>
              <button
                onClick={() => setSidebar(null)}
                className="text-white font-bold"
              >
                X
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-full">
              {sidebar === "prescription" && <PrescriptionForm />}
              {sidebar === "analyzeImage" && <ImageAnalysisForm />}
              {sidebar === "analyzeText" && <TextAnalysisForm />}
              {sidebar === "search" && <SearchForm />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
