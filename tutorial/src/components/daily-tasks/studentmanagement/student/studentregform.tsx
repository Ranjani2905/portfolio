import React from "react";
import { useForm } from "react-hook-form";

type StudentFormData = {
  name: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  rollNo: string;
  department: string;
  year: string;
  cgpa: string;
  fatherName: string;
  motherName: string;
  parentContact: string;
  parentOccupation: string;
};

const StudentRegForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, // ✅ Using errors correctly
  } = useForm<StudentFormData>();

  const onSubmit = (data: StudentFormData) => {
    console.log("Submitted Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Student Registration Form
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Details */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">Personal Details</legend>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <input
                className="border p-2 rounded w-full"
                placeholder="Full Name"
                {...register("name", { required: "Full Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <input
                className="border p-2 rounded w-full"
                type="date"
                {...register("dob", { required: "Date of Birth is required" })}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob.message}</p>
              )}
            </div>

            <div>
              <select
                className="border p-2 rounded w-full"
                {...register("gender", { required: "Please select gender" })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <input
                className="border p-2 rounded w-full"
                placeholder="Phone Number"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <input
                className="border p-2 rounded w-full"
                placeholder="Email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <textarea
                className="border p-2 rounded w-full"
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* Academic Details */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">Academic Details</legend>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <input
                className="border p-2 rounded w-full"
                placeholder="Roll Number"
                {...register("rollNo", { required: "Roll Number is required" })}
              />
              {errors.rollNo && (
                <p className="text-red-500 text-sm">{errors.rollNo.message}</p>
              )}
            </div>

            <div>
              <select
                className="border p-2 rounded w-full"
                {...register("department", {
                  required: "Please select a department",
                })}
              >
                <option value="">Select Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm">
                  {errors.department.message}
                </p>
              )}
            </div>

            <div>
              <select
                className="border p-2 rounded w-full"
                {...register("year", { required: "Please select a year" })}
              >
                <option value="">Select Year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </select>
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year.message}</p>
              )}
            </div>

            <div>
              <input
                className="border p-2 rounded w-full"
                type="number"
                step="0.01"
                placeholder="CGPA"
                {...register("cgpa", { required: "CGPA is required" })}
              />
              {errors.cgpa && (
                <p className="text-red-500 text-sm">{errors.cgpa.message}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* Parent Details */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold">Parent Details</legend>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <input
                className="border p-2 rounded w-full"
                placeholder="Father’s Name"
                {...register("fatherName", {
                  required: "Father's Name is required",
                })}
              />
              {errors.fatherName && (
                <p className="text-red-500 text-sm">
                  {errors.fatherName.message}
                </p>
              )}
            </div>

            <div>
              <input
                className="border p-2 rounded w-full"
                placeholder="Mother’s Name"
                {...register("motherName", {
                  required: "Mother's Name is required",
                })}
              />
              {errors.motherName && (
                <p className="text-red-500 text-sm">
                  {errors.motherName.message}
                </p>
              )}
            </div>

            <div>
              <input
                className="border p-2 rounded w-full"
                placeholder="Parent Contact"
                {...register("parentContact", {
                  required: "Parent Contact is required",
                })}
              />
              {errors.parentContact && (
                <p className="text-red-500 text-sm">
                  {errors.parentContact.message}
                </p>
              )}
            </div>

            <div>
              <input
                className="border p-2 rounded w-full"
                placeholder="Parent Occupation"
                {...register("parentOccupation", {
                  required: "Parent Occupation is required",
                })}
              />
              {errors.parentOccupation && (
                <p className="text-red-500 text-sm">
                  {errors.parentOccupation.message}
                </p>
              )}
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentRegForm;
