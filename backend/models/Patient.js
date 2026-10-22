import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },
    bloodGroup: {
      type: String,
      default: "O+",
    },
    phone: {
      type: String,
      default: "",
    },
    allergies: {
      type: [String],
      default: [],
    },
    chronicConditions: {
      type: [String],
      default: [],
    },
    recentVitals: {
      bloodPressure: { type: String, default: "120/80" },
      heartRate: { type: Number, default: 72 },
      temperature: { type: String, default: "98.6°F" },
      oxygenSaturation: { type: String, default: "99%" },
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema);
export default Patient;
