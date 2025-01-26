"use client";

import Link from "next/link";
import Logo from "./logo";
import InputForm from "@/app/components/Input/InputForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import { login } from "@/utils/auth";
import Button from "@/app/components/Button/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));

    setIsChecking(false);

    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  const validateInputs = () => {
    if (!username.trim()) return "Username wajib diisi.";
    if (username.length < 4) return "Username minimal 4 karakter.";
    if (!password) return "Password wajib diisi.";
    if (password.length < 6) return "Password minimal 6 karakter.";
    return null;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const error = validateInputs();
    if (error) {
      setErrorMessage(error);
      setLoading(false);
      return;
    }

    const token = await login(username, password);

    if (token) {
      router.push("/dashboard");
    } else {
      setLoading(false);
      setErrorMessage("Username atau password salah.");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden mx-4">
      <div className="w-full p-6 bg-white rounded-md shadow-md max-w-sm">
        <Logo />
        <form className="mt-6" onSubmit={handleLogin}>
          <InputForm
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputForm
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            href="/forget"
            className="flex justify-end text-xs text-blue-600 hover:underline mb-6 -mt-4"
          >
            Forget Password?
          </Link>
          <div className="mt-2">
            <Button
              type="submit"
              classname={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-lg hover:bg-tertiary focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading} // Button disabled during loading
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </div>
          {errorMessage && (
            <div className="flex text-red-500 mt-2 text-sm items-center">
              <BiSolidErrorCircle className="mr-2" />
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
