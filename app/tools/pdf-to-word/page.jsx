import Link from "next/link";
import { ArrowLeft } from "lucide-react";
// Path adjust kar lijiye agar components folder kisi aur jagah hai
import PdfToWordClient from "@/components/PdfToWordClient"; 

export const metadata = {
  title: "PDF to Word Converter - Edit PDF Files | DrPDF",
  description: "Convert your PDF files to editable Microsoft Word (.docx) documents instantly. Free, secure, and accurate PDF to Word converter.",
};

export default function PdfToWordPage() {
  return (
    <div className="bg-[#121212] text-[#F0F0F0] min-h-screen pb-20">
      
      {/* STATIC HEADER (Fast Loading) */}
      <header className="border-b border-gray-800/50 bg-[#161616]">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Tools
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-12">
        
        {/* SEO FRIENDLY TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            PDF to Word
          </h1>
          <p className="text-gray-400 text-lg">
            Convert your PDF documents to editable DOCX files with high accuracy.
          </p>
        </div>

        {/* INTERACTIVE CLIENT COMPONENT */}
        <PdfToWordClient />

      </main>
    </div>
  );
}