import React from "react";
import SideBarD from "../Components/SideBarD";
import { BsPeopleFill } from "react-icons/bs";
const DoctorDashboard = () => {
  return (
    <div className="flex">
      <SideBarD />
      <div className="flex-1 p-5">
        <h1 className="text-gray-400">Doctor Dashboard</h1>
        <p className="text-2xl font-bold">Welcome to your dashboard!</p>
        <section className="p-5 flex w-full gap-6 mt-5 ">
          <div className="border p-5 rounded-md w-full border-gray-200 flex flex-col gap-5">
            <p className="text-gray-500">Patients Today</p>
            <p className="font-bold text-2xl ">0</p>
          </div>
          <div className="border p-5 rounded-md w-full border-gray-200 flex flex-col gap-5">
            <p className="text-gray-500">Appointments today</p>
            <p className="font-bold text-2xl ">0</p>
          </div>
          <div className="border p-5 rounded-md w-full border-gray-200 flex flex-col gap-5">
            <p className="text-gray-500">Total Appointments</p>
            <p className="font-bold text-2xl ">0</p>
          </div>
          <div className="border p-5 rounded-md w-full border-gray-200 flex flex-col gap-5">
            <p className="text-gray-500">Prescriptions</p>
            <p className="font-bold text-2xl ">0</p>
          </div>
        </section>
        <section className="p-5 flex gap-6 mt-5 ">
          <div className="w-[48%] cursor-pointer border border-gray-500 rounded-md hover:scale-102 p-5 transition-all duration-400">
            <p className="font-bold"> View Appointments</p>
            <p className="text-gray-500">
              Today's Schedule and upcoming visits
            </p>
          </div>
          <div className="w-[48%] cursor-pointer border border-gray-500 rounded-md hover:scale-102 p-5 transition-all duration-400">
            <p className="font-bold ">My Prescriptions</p>
            <p className="text-gray-500">Download PDF and AI explanations</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DoctorDashboard;
