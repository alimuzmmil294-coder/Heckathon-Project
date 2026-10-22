import User from "../models/User.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Prescription from "../models/Prescription.js";
import Staff from "../models/Staff.js";

export const seedDatabase = async () => {
  try {
    // 1. Seed Users if empty
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("🌱 [Seed] Seeding initial users into MongoDB...");
      await User.create([
        {
          name: "Dr. Sarah Mitchell",
          email: "dr.mitchell@clinic.com",
          password: "password123",
          role: "Doctor",
          specialty: "General Internal Medicine",
        },
        {
          name: "Alex Rivera",
          email: "alex.rivera@patient.com",
          password: "password123",
          role: "Patient",
        },
        {
          name: "Director Davis",
          email: "admin@medflow.com",
          password: "password123",
          role: "Clinic Manager",
        },
      ]);
      console.log("✅ [Seed] Users seeded successfully.");
    }

    // 2. Seed Patients if empty
    const patientCount = await Patient.countDocuments();
    if (patientCount === 0) {
      console.log("🌱 [Seed] Seeding patient records into MongoDB...");
      await Patient.create([
        {
          fullName: "Sophia Martinez",
          age: 38,
          gender: "Female",
          bloodGroup: "A+",
          phone: "+1 (555) 382-9012",
          allergies: ["Penicillin", "Sulfa drugs"],
          chronicConditions: ["Moderate Asthma", "Allergic Rhinitis"],
          recentVitals: { bloodPressure: "118/76", heartRate: 74, temperature: "98.6°F", oxygenSaturation: "98%" },
        },
        {
          fullName: "Michael Chang",
          age: 52,
          gender: "Male",
          bloodGroup: "O+",
          phone: "+1 (555) 749-3381",
          allergies: ["None known"],
          chronicConditions: ["Stage 1 Essential Hypertension"],
          recentVitals: { bloodPressure: "134/86", heartRate: 68, temperature: "98.2°F", oxygenSaturation: "99%" },
        },
        {
          fullName: "Emily Jenkins",
          age: 29,
          gender: "Female",
          bloodGroup: "B+",
          phone: "+1 (555) 891-2204",
          allergies: ["Codeine"],
          chronicConditions: ["Migraine with aura"],
          recentVitals: { bloodPressure: "112/70", heartRate: 72, temperature: "98.4°F", oxygenSaturation: "99%" },
        },
        {
          fullName: "David Kim",
          age: 44,
          gender: "Male",
          bloodGroup: "O-",
          phone: "+1 (555) 412-9903",
          allergies: ["Aspirin", "Ibuprofen"],
          chronicConditions: ["Hyperlipidemia"],
          recentVitals: { bloodPressure: "124/80", heartRate: 76, temperature: "98.5°F", oxygenSaturation: "99%" },
        },
        {
          fullName: "Alex Rivera",
          age: 34,
          gender: "Male",
          bloodGroup: "O+",
          phone: "+1 (555) 602-1849",
          allergies: ["Dust Mites", "Penicillin"],
          chronicConditions: ["Mild Asthma"],
          recentVitals: { bloodPressure: "118/76", heartRate: 72, temperature: "98.4°F", oxygenSaturation: "99%" },
        },
        {
          fullName: "Hannah Baker",
          age: 21,
          gender: "Female",
          bloodGroup: "A-",
          phone: "+1 (555) 234-8891",
          allergies: ["Peanuts"],
          chronicConditions: ["Seasonal Bronchospasm"],
          recentVitals: { bloodPressure: "110/68", heartRate: 80, temperature: "98.7°F", oxygenSaturation: "99%" },
        },
      ]);
      console.log("✅ [Seed] Patients seeded successfully.");
    }

    // 3. Seed Appointments if empty
    const appointmentCount = await Appointment.countDocuments();
    if (appointmentCount === 0) {
      console.log("🌱 [Seed] Seeding appointment queue into MongoDB...");
      await Appointment.create([
        {
          patientName: "Emily Jenkins",
          doctorName: "Dr. Sarah Mitchell",
          date: "Today",
          time: "09:00 AM",
          type: "In-Person",
          reason: "Severe migraine with visual aura recurrence",
          status: "Completed",
          notes: "Exam Room 1 - Prescription updated",
        },
        {
          patientName: "Michael Chang",
          doctorName: "Dr. Sarah Mitchell",
          date: "Today",
          time: "10:15 AM",
          type: "Follow-up",
          reason: "Hypertension medication titration & BP review",
          status: "In Progress",
          notes: "Exam Room 2 - BP 134/86",
        },
        {
          patientName: "Sophia Martinez",
          doctorName: "Dr. Sarah Mitchell",
          date: "Today",
          time: "11:30 AM",
          type: "In-Person",
          reason: "Persistent productive cough, fever x 4 days",
          status: "Confirmed",
          notes: "Exam Room 1 - AI Copilot differential analyzed",
        },
        {
          patientName: "David Kim",
          doctorName: "Dr. Sarah Mitchell",
          date: "Today",
          time: "02:00 PM",
          type: "Telehealth",
          reason: "Routine lipid panel and fasting glucose lab review",
          status: "Confirmed",
          notes: "Virtual Telehealth Room A",
        },
        {
          patientName: "Hannah Baker",
          doctorName: "Dr. Sarah Mitchell",
          date: "Today",
          time: "03:15 PM",
          type: "In-Person",
          reason: "Allergic rhinitis exacerbation & rescue inhaler refill",
          status: "Confirmed",
          notes: "Exam Room 3",
        },
        {
          patientName: "Robert Evans",
          doctorName: "Dr. Sarah Mitchell",
          date: "Today",
          time: "04:30 PM",
          type: "Follow-up",
          reason: "Post-procedural incision healing inspection",
          status: "Confirmed",
          notes: "Exam Room 2",
        },
      ]);
      console.log("✅ [Seed] Appointments seeded successfully.");
    }

    // 4. Seed Prescriptions if empty
    const rxCount = await Prescription.countDocuments();
    if (rxCount === 0) {
      console.log("🌱 [Seed] Seeding e-prescriptions into MongoDB...");
      await Prescription.create([
        {
          patientName: "Sophia Martinez",
          doctorName: "Dr. Sarah Mitchell, MD",
          diagnosis: "Community-Acquired Atypical Pneumonia",
          medications: [
            {
              name: "Amoxicillin-Clavulanate (Augmentin)",
              dosage: "875/125 mg",
              frequency: "Twice daily with meals",
              duration: "7 days",
              instructions: "Take with food to minimize gastric irritation",
            },
            {
              name: "Benzonatate (Tessalon Perles)",
              dosage: "100 mg",
              frequency: "3 times daily as needed",
              duration: "5 days",
              instructions: "Swallow whole with a full glass of water",
            },
          ],
          aiPlainExplanation:
            "Augmentin is an antibiotic that fights the bacterial infection in your airways. Taking it with food helps protect your stomach. Be sure to finish all pills even if you start feeling completely recovered.",
          dateIssued: "Oct 20, 2026",
        },
        {
          patientName: "Alex Rivera",
          doctorName: "Dr. Sarah Mitchell, MD",
          diagnosis: "Acute Bronchitis & Cough Exacerbation",
          medications: [
            {
              name: "Amoxicillin-Clavulanate (Augmentin)",
              dosage: "875/125 mg",
              frequency: "Twice daily with meals",
              duration: "7 days",
              instructions: "Complete entire 7-day course",
            },
            {
              name: "Cetirizine (Zyrtec)",
              dosage: "10 mg",
              frequency: "Once daily before bedtime",
              duration: "30 days",
              instructions: "Take nightly for allergic airway inflammation",
            },
          ],
          aiPlainExplanation:
            "This combination clears the bacterial bronchial inflammation and calms allergic histamine responses so you can sleep peacefully.",
          dateIssued: "Oct 21, 2026",
        },
        {
          patientName: "Michael Chang",
          doctorName: "Dr. Sarah Mitchell, MD",
          diagnosis: "Essential Hypertension",
          medications: [
            {
              name: "Lisinopril",
              dosage: "10 mg",
              frequency: "Once daily every morning",
              duration: "90 days",
              instructions: "Monitor blood pressure weekly",
            },
          ],
          aiPlainExplanation:
            "Lisinopril relaxes your blood vessels to keep your blood pressure within safe target ranges.",
          dateIssued: "Oct 19, 2026",
        },
      ]);
      console.log("✅ [Seed] Prescriptions seeded successfully.");
    }

    // 5. Seed Staff if empty
    const staffCount = await Staff.countDocuments();
    if (staffCount === 0) {
      console.log("🌱 [Seed] Seeding staff duty roster into MongoDB...");
      await Staff.create([
        {
          staffId: "STF-01",
          name: "Dr. Sarah Mitchell",
          role: "Attending Physician",
          dept: "Internal Medicine",
          shift: "Morning (08:00 - 16:00)",
          status: "On Duty",
        },
        {
          staffId: "STF-02",
          name: "Dr. James Wilson",
          role: "Cardiology Consultant",
          dept: "Cardiology",
          shift: "Afternoon (12:00 - 18:00)",
          status: "On Call",
        },
        {
          staffId: "STF-03",
          name: "Elena Rostova, RN",
          role: "Lead Triage Nurse",
          dept: "Emergency & Intake",
          shift: "Morning (07:00 - 15:30)",
          status: "On Duty",
        },
        {
          staffId: "STF-04",
          name: "Marcus Vance",
          role: "Head Receptionist",
          dept: "Front Desk & Scheduling",
          shift: "Day (08:30 - 17:00)",
          status: "On Duty",
        },
        {
          staffId: "STF-05",
          name: "Chloe Bennett, PharmD",
          role: "Clinical Pharmacist",
          dept: "Pharmacy & E-Rx",
          shift: "Day (09:00 - 17:30)",
          status: "On Duty",
        },
      ]);
      console.log("✅ [Seed] Staff duty roster seeded successfully.");
    }
  } catch (error) {
    console.error("⚠️ [Seed Error]", error.message);
  }
};
