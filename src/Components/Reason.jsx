import React from "react";

const Reason = () => {
  return (
    <div className="container mx-auto py-20">
      <h1 className="text-3xl font-bold text-center">
        Built for everyone in the clinic
      </h1>
      <div className="w-[80vw] mx-auto flex justify-around mt-10 gap-10 flex-wrap">
        <div className="border p-5 rounded-md shadow-md w-[250px]">
          <h1>Admin</h1>
          <ul className="text-gray-500">
            <li>Manage Staff and roles</li>
            <li>Subscriptions & usage</li>
            <li>Clinic-wide analytics</li>
          </ul>
        </div>
        <div className="border p-5 rounded-md shadow-md w-[250px]">
          <h1>Doctor</h1>
          <ul className="text-gray-500">
            <li>Manage Patient Records</li>
            <li>Prescribe Medications</li>
            <li>View Appointments</li>
          </ul>
        </div>
        <div className="border p-5 rounded-md shadow-md w-[250px]">
          <h1>Patient</h1>
          <ul className="text-gray-500">
            <li>View Medical History</li>
            <li>Book Appointments</li>
            <li>Access Test Results</li>
          </ul>
        </div>

        <div className="border p-5 rounded-md shadow-md w-[250px]">
          <h1>Receptionist</h1>
          <ul className="text-gray-500">
            <li>Manage Appointments</li>
            <li>Update Patient Information</li>
            <li>Generate Reports</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reason;
