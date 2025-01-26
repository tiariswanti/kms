import Home from "./components/Home/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "...",
  description: "...",
};

export default function HomePage() {
  return (
    <div>
      <Head>
        <meta name="robots" content="index, follow" />
        <title>KMS KNPK - Knowledge Management System</title>
        <meta
          name="description"
          content="Platform Knowledge Management System untuk KMS KNPK."
        />
      </Head>
      <Home />
    </div>
  );
}
