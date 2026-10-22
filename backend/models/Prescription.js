import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
      default: "Dr. Sarah Mitchell, MD",
    },
    diagnosis: {
      type: String,
      required: true,
    },
    medications: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        duration: { type: String, required: true },
        instructions: { type: String, default: "Take after meals" },
      },
    ],
    aiPlainExplanation: {
      type: String,
      default: "",
    },
    dateIssued: {
      type: String,
      default: () => new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    },
    pdfDownloadUrl: {
      type: String,
      default: "#",
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.models.Prescription || mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
