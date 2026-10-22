import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    doctorName: {
      type: String,
      required: true,
      default: "Dr. Sarah Mitchell",
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["In-Person", "Telehealth", "Follow-up", "Emergency"],
      default: "In-Person",
    },
    status: {
      type: String,
      enum: ["Confirmed", "In Progress", "Completed", "Cancelled"],
      default: "Confirmed",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
export default Appointment;
