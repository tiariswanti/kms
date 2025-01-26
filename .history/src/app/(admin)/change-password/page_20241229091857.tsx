"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import InputForm from "@/app/components/Input/InputForm";
import Button from "@/app/components/Button/Button";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return false;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password.");
      }

      setSuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setError("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Change Password
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <InputForm
              label="Old Password"
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Button
              type="button"
              classname="absolute right-3 top-10 text-gray-600"
              onClick={() => setShowOldPassword(!showOldPassword)}
              icon={showOldPassword ? <FaEye /> : <FaEyeSlash />}
            />
          </div>
          <div className="relative mb-4">
            <InputForm
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              type="button"
              classname="absolute right-3 top-10 text-gray-600"
              onClick={() => setShowNewPassword(!showNewPassword)}
              icon={showNewPassword ? <FaEye /> : <FaEyeSlash />}
            />
          </div>
          <div className="relative mb-6">
            <InputForm
              label="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="button"
              classname="absolute right-3 top-10 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              icon={showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            />
          </div>
          <Button
            type="submit"
            classname={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-lg hover:bg-tertiary focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin mr-2" />
                Loading...
              </div>
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
