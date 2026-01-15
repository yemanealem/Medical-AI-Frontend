import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import axios from "axios";
import PrescriptionResult from "./PrescriptionResult";

interface PrescriptionItem {
  drug_name: string;
  dosage?: number;
  dosage_unit: string;
  frequency_per_day?: number;
}

export default function PrescriptionForm() {
  const [currentItem, setCurrentItem] = useState<PrescriptionItem>({
    drug_name: "",
    dosage: undefined,
    dosage_unit: "",
    frequency_per_day: undefined,
  });

  const [items, setItems] = useState<PrescriptionItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleCurrentItemChange = (
    field: keyof PrescriptionItem,
    value: string | number
  ) => {
    setCurrentItem((prev) => ({
      ...prev,
      [field]:
        field === "dosage" || field === "frequency_per_day"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    }));
  };

  const addItem = () => {
    if (!currentItem.drug_name) return;
    setItems([...items, currentItem]);
    setCurrentItem({
      drug_name: "",
      dosage: undefined,
      dosage_unit: "",
      frequency_per_day: undefined,
    });
    setShowForm(false);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return alert("Add at least one medicine!");

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/prescriptions/validate",
        { items }
      );

      setResult(response.data.consultation);
    } catch (error) {
      console.error(error);
      alert("Failed to validate prescription.");
    } finally {
      setLoading(false);
    }
  };

  const buttonClasses =
    "w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow transition flex items-center justify-center gap-2";

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Add Medicine Button */}
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className={buttonClasses}
        >
          <Plus className="w-5 h-5" /> Add Medicine
        </button>

        {/* Input Form */}
        {showForm && (
          <div className="flex flex-col gap-3 p-4 rounded-lg border border-gray-700 bg-gray-900">
            <input
              placeholder="Medicine name"
              className="input"
              value={currentItem.drug_name}
              onChange={(e) =>
                handleCurrentItemChange("drug_name", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Dosage"
              className="input"
              value={currentItem.dosage ?? ""}
              onChange={(e) =>
                handleCurrentItemChange("dosage", e.target.value)
              }
            />

            <input
              placeholder="Dosage unit (mg/ml)"
              className="input"
              value={currentItem.dosage_unit}
              onChange={(e) =>
                handleCurrentItemChange("dosage_unit", e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Frequency per day"
              className="input"
              value={currentItem.frequency_per_day ?? ""}
              onChange={(e) =>
                handleCurrentItemChange("frequency_per_day", e.target.value)
              }
            />

            <button type="button" onClick={addItem} className={buttonClasses}>
              Add to Prescription
            </button>
          </div>
        )}

        {/* Items List */}
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700"
          >
            <div>
              <p className="font-semibold text-white">{item.drug_name}</p>
              <p className="text-sm text-gray-300">
                {item.dosage} {item.dosage_unit} – {item.frequency_per_day}/day
              </p>
            </div>
            <button onClick={() => removeItem(index)}>
              <Trash2 className="text-red-500" />
            </button>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold"
        >
          {loading ? "Validating..." : "Validate Prescription"}
        </button>
      </form>

      {/* Result */}
      {result && (
        <PrescriptionResult result={result} onClear={() => setResult(null)} />
      )}
    </>
  );
}
