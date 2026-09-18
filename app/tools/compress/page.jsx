import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// Path adjust kar lijiye apne folder structure ke hisaab se
import CompressPDFClient from "@/components/CompressPDFClient"; 

export const metadata = {
  title: "Compress PDF - Reduce File Size Online | DrPDF",
  description: "Drastically reduce the file size of your PDF without losing quality. Fast, secure, and easy PDF compression.",
};

export default function CompressPDFPage() {
  return (
    <div className="bg-[#121212] text-[#F0F0F0] min-h-screen pb-20">
      
      {/* STATIC HEADER (Loads Instantly) */}
      <header className="border-b border-gray-800/50 bg-[#161616]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-12">
        
        {/* STATIC TITLE & DESCRIPTION (SEO Friendly) */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Compress PDF File
          </h1>
          <p className="text-gray-400 text-lg">
            Reduce file size while optimizing for maximal PDF quality.
          </p>
        </div>

        {/* CLIENT COMPONENT (Interactive Logic) */}
        <CompressPDFClient />

      </main>
    </div>
  );
}