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

  const inputClasses =
    "mt-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-600 text-white " +
    "placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition";

  const buttonClasses =
    "w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg shadow transition flex items-center justify-center gap-2";

  const handleCurrentItemChange = (
    field: keyof PrescriptionItem,
    value: string | number,
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
    if (items.length === 0) {
      alert("Please add at least one medicine for prescrition.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/prescriptions/validate",
        { items },
      );

      setResult(response.data.consultation);
    } catch (error) {
      console.error(error);
      alert("Failed to validate prescription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Add Medicine Button */}
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className={buttonClasses}
        >
          <Plus className="w-5 h-5" />
          Add Medicine
        </button>

        {/* Medicine Input Form */}
        {showForm && (
          <div className="flex flex-col gap-4 p-5 rounded-lg border border-gray-700 bg-gray-900">
            <label className="flex flex-col text-sm text-gray-300">
              Medicine Name
              <input
                type="text"
                className={inputClasses}
                value={currentItem.drug_name}
                onChange={(e) =>
                  handleCurrentItemChange("drug_name", e.target.value)
                }
                placeholder="e.g. Amoxicillin"
                required
              />
            </label>

            <label className="flex flex-col text-sm text-gray-300">
              Dosage
              <input
                type="number"
                className={inputClasses}
                value={currentItem.dosage ?? ""}
                onChange={(e) =>
                  handleCurrentItemChange("dosage", e.target.value)
                }
                placeholder="e.g. 500"
              />
            </label>

            <label className="flex flex-col text-sm text-gray-300">
              Dosage Unit
              <input
                type="text"
                className={inputClasses}
                value={currentItem.dosage_unit}
                onChange={(e) =>
                  handleCurrentItemChange("dosage_unit", e.target.value)
                }
                placeholder="mg / ml / tablet"
              />
            </label>

            <label className="flex flex-col text-sm text-gray-300">
              Frequency per Day
              <input
                type="number"
                className={inputClasses}
                value={currentItem.frequency_per_day ?? ""}
                onChange={(e) =>
                  handleCurrentItemChange("frequency_per_day", e.target.value)
                }
                placeholder="e.g. 3"
              />
            </label>

            <button type="button" onClick={addItem} className={buttonClasses}>
              Add to Prescription
            </button>
          </div>
        )}

        {/* Added Medicines List */}
        {items.length > 0 && (
          <div className="flex flex-col gap-3">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700 shadow"
              >
                <div>
                  <p className="font-semibold text-white">{item.drug_name}</p>
                  <p className="text-sm text-gray-300">
                    {item.dosage} {item.dosage_unit} — {item.frequency_per_day}{" "}
                    / day
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg shadow transition"
        >
          {loading ? "Validating..." : "Validate Prescription"}
        </button>
      </form>

      {/* AI Result */}
      {result && (
        <PrescriptionResult result={result} onClear={() => setResult(null)} />
      )}
    </>
  );
}
