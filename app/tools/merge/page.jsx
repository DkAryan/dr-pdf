import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// Path apne hisaab se adjust kar lein agar 'components' root me nahi hai
import MergePDFClient from "@/components/MergePDFClient"; 

export const metadata = {
  title: "Merge PDF Files - DrPDF",
  description: "Combine multiple PDF files into one unified document securely in your browser.",
};

export default function MergePDFPage() {
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
        
        {/* STATIC TITLE & DESCRIPTION (SEO Friendly & Fast Loading) */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Merge PDF Files
          </h1>
          <p className="text-gray-400 text-lg">
            Combine multiple PDFs into one unified document. Drag and drop your files below.
          </p>
        </div>

        {/* CLIENT COMPONENT (Interactive Logic) */}
        <MergePDFClient />

      </main>
    </div>
  );
}