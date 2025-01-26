import { generateMetadata } from ""; // Import the generateMetadata function

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export { generateMetadata }; // Export generateMetadata to be used by Next.js
