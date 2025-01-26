import Home from "./components/Home/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KMS KNPK",
  description: "Knowledge Management System",
  robots: "index, follow",
};

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}
