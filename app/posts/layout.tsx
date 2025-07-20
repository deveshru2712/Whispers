import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <Navbar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
