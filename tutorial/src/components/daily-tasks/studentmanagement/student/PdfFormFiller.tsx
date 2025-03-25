import React, { useState } from "react";
import {
  Upload,
  User,
  Phone,
  Home,
  Calendar,
  Hash,
  Users,
  Mail,
  MapPin,
  Map,
  Send,
} from "lucide-react";
import usePdfOcr from "../../../../../src/usePdfOcr"; // ✅ Ensure correct import path
import { Toaster, toast } from "react-hot-toast"; // ✅ Import Toaster for notifications

type AadharFormData = {
  name: string;
  phone: string;
  address: string;
  dob: string;
  gender: "Male" | "Female" | "Other" | "";
  aadharNumber: string;
  email: string;
  state: string;
  pincode: string;
};

const PdfFormFiller: React.FC = () => {
  const { extractTextFromPdf, loading, error } = usePdfOcr();

  // ✅ Initial state for form
  const initialFormData: AadharFormData = {
    name: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    aadharNumber: "",
    email: "",
    state: "",
    pincode: "",
  };

  const [formData, setFormData] = useState<AadharFormData>(initialFormData);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const extractedData = await extractTextFromPdf(file);

      setFormData((prevData) => ({
        ...prevData,
        name: extractedData.name || "",
        phone: extractedData.phone || "",
        address: extractedData.address || "",
        dob: extractedData.dob || "",
        gender: extractedData.gender || "",
        aadharNumber: extractedData.aadharNumber || "",
        // 🚨 Email, State, Pincode are not fetched, so they remain as they are
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Simulate form submission
    console.log("Submitted Data:", formData);
    toast.success("Form submitted successfully!");

    // ✅ Reset the form after submission
    setFormData(initialFormData);
  };

  return (
    <div className="max-w-3xl w-full mt-20 mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      <Toaster /> {/* ✅ Toaster for notifications */}
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <User /> Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>

          {/* Aadhaar Number */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Hash /> Aadhaar Number
            </label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              placeholder="Enter Aadhaar number"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Calendar /> Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Users /> Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Phone /> Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Mail /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col col-span-2">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Home /> Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <Map /> State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>

          {/* Pincode */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-gray-700 font-medium">
              <MapPin /> Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>
        </div>

        {/* Buttons Aligned to Right */}
        <div className="flex justify-end gap-4 mt-6">
          <label className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md cursor-pointer hover:bg-orange-600 transition duration-300">
            <Upload className="w-5 h-5" />
            Upload Aadhaar PDF
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
              disabled={loading}
            />
          </label>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
          >
            <Send className="w-5 h-5" /> Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PdfFormFiller;
