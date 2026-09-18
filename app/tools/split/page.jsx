import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SplitPDFClient from "@/components/SplitPDFClient"; 

export const metadata = {
  title: "Split PDF Pages - Extract Pages Online | DrPDF",
  description: "Extract specific pages or separate all pages of your PDF into individual files securely in your browser.",
};

export default function SplitPDFPage() {
  return (
    <div className="bg-[#121212] text-[#F0F0F0] min-h-screen pb-20">
      
      {/* STATIC HEADER */}
      <header className="border-b border-gray-800/50 bg-[#161616]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-12">
        
        {/* TITLE & DESCRIPTION */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Split PDF File
          </h1>
          <p className="text-gray-400 text-lg">
            Extract specific ranges or split every page into a separate document.
          </p>
        </div>

        {/* CLIENT COMPONENT */}
        <SplitPDFClient />

      </main>
    </div>
  );
}