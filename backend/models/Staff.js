import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    dept: {
      type: String,
      required: true,
    },
    shift: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["On Duty", "On Call", "Off Duty"],
      default: "On Duty",
    },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.models.Staff || mongoose.model("Staff", staffSchema);
export default Staff;
