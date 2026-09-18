"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Combine, 
  Scissors, 
  FileDown, 
  FileSpreadsheet, 
  FileText, 
  ShieldCheck, 
  Zap, 
  Smile, 
  ArrowRight,
  Search,
  Lock,
  Unlock,
  Image as ImageIcon,
  RotateCw,
  FilePlus,
  Type,
  FileCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Tool = {
  name: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  href: string;
  comingSoon?: boolean;
};

type Category = {
  title: string;
  tools: Tool[];
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      q: "Are my personal data and documents secure with DrPDF?",
      a: "Yes, security is central to our framework. Processing is completed locally in temporary memory layers, immediately purging raw document data as soon as tasks finish executing."
    },
    {
      q: "Do I need to sign up for an account to convert files?",
      a: "No account creation or authorization steps are required to navigate or activate any parsing engine on DrPDF. All tools remain readily open."
    }
  ];

  // Data Array: Jab tool ready ho jaye, usme se 'comingSoon: true' hata dein.
  const categories: Category[] = [
    {
      title: "Popular Tools (Most Used)",
      tools: [
        { name: "Merge PDF", desc: "Combine multiple PDF files into one document instantly.", icon: Combine, color: "text-blue-500", href: "/tools/merge" },
        { name: "Compress PDF", desc: "Drastically reduce the file size of your PDF without degrading quality.", icon: FileDown, color: "text-green-500", href: "/tools/compress" },
        { name: "PDF to Word", desc: "Convert PDF documents back to fully editable Microsoft Word files.", icon: FileText, color: "text-indigo-500", href: "/tools/pdf-to-word" },
        { name: "Split PDF", desc: "Extract specific pages or separate pages into individual files.", icon: Scissors, color: "text-red-500", href: "/tools/split" },
      ]
    },
    {
      title: "Edit & Organise PDF",
      tools: [
        { name: "Edit PDF Text", desc: "Add text, comments, highlights, and annotations directly onto your PDF pages.", icon: Type, color: "text-amber-500", href: "/tools/edit", comingSoon: true },
        { name: "Organise Pages", desc: "Sort, add, or delete specific pages within your PDF file structure.", icon: FilePlus, color: "text-purple-500", href: "/tools/organise", comingSoon: true },
        { name: "Rotate PDF", desc: "Rotate upside-down pages or change landscape views to portrait layout.", icon: RotateCw, color: "text-orange-500", href: "/tools/rotate", comingSoon: true },
        { name: "Sign & Approve", desc: "Add digital signatures or fill out form layers inside documents securely.", icon: FileCheck, color: "text-teal-500", href: "/tools/sign", comingSoon: true },
      ]
    },
    {
      title: "Convert to PDF",
      tools: [
        { name: "Word to PDF", desc: "Convert standard Microsoft Word documents into pixel-perfect PDFs.", icon: FileText, color: "text-blue-600", href: "/tools/word-to-pdf", comingSoon: true },
        { name: "Excel to PDF", desc: "Turn dynamic data tables and spreadsheets into structured PDF layouts.", icon: FileSpreadsheet, color: "text-emerald-600", href: "/tools/excel-to-pdf", comingSoon: true },
        { name: "JPG to PDF", desc: "Convert image files like JPG and PNG into print-ready PDF formats.", icon: ImageIcon, color: "text-pink-500", href: "/tools/jpg-to-pdf", comingSoon: true },
      ]
    },
    {
      title: "Convert from PDF & Security",
      tools: [
        { name: "PDF to Excel", desc: "Extract raw tables from PDF sheets directly into clean XLSX formats.", icon: FileSpreadsheet, color: "text-emerald-500", href: "/tools/pdf-to-excel", comingSoon: true },
        { name: "PDF to JPG", desc: "Extract embedded image items or convert whole pages into standalone images.", icon: ImageIcon, color: "text-teal-500", href: "/tools/pdf-to-jpg", comingSoon: true },
        { name: "Protect PDF", desc: "Secure important documents by layering on robust custom password encryptions.", icon: Lock, color: "text-amber-500", href: "/tools/protect", comingSoon: true },
        { name: "Unlock PDF", desc: "Remove restrictive passwords and structural protections from secured files.", icon: Unlock, color: "text-rose-500", href: "/tools/unlock", comingSoon: true },
      ]
    }
  ];

  const getFilteredCategories = () => {
    return categories.map(category => {
      const filteredTools = category.tools.filter(tool => 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...category, tools: filteredTools };
    }).filter(category => category.tools.length > 0);
  };

  const filteredCategories = getFilteredCategories();

  return (
    <div className="bg-[#121212] text-[#F0F0F0] min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-gray-800/50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-[#0066FF] mb-4 border border-blue-500/20">
            ⚡ 14 Premium Tools — 100% Free
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-6">
            The Ultimate Prescription For Your <span className="text-[#0066FF]">PDF Tasks</span>
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            DrPDF provides fast, secure, and browser-based tools to optimize, convert, structure, and secure documents. No installation or registration necessary.
          </p>
          
          {/* Search Box */}
          <div className="max-w-md mx-auto relative group">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-[#0066FF] transition-colors" />
            <input 
              type="text"
              placeholder="Search tools (e.g. Merge, Edit, Compress)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1E1E1E] text-white pl-12 pr-4 py-3.5 rounded-xl border border-gray-800 focus:outline-none focus:border-[#0066FF] transition-colors shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* CATEGORIZED TOOLS GRID */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {filteredCategories.length > 0 ? (
          <div className="space-y-12">
            {filteredCategories.map((category, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-gray-800 pb-2">
                  <span className="h-2 w-2 rounded-full bg-[#0066FF]"></span>
                  {category.title}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool, idx) => {
                    const IconComponent = tool.icon;
                    const card = (
                      <div
                        key={idx} 
                        className={`relative bg-[#1E1E1E] p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group 
                          ${tool.comingSoon 
                            ? "border-gray-800/40 opacity-75 cursor-not-allowed" 
                            : "border-gray-800/80 hover:border-[#0066FF]/50 cursor-pointer"
                          }`}
                      >
                        {/* Coming Soon Badge */}
                        {tool.comingSoon && (
                          <span className="absolute top-4 right-4 bg-gray-800 text-gray-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Coming Soon
                          </span>
                        )}

                        <div>
                          <div className={`p-3 rounded-xl bg-gray-900/50 w-fit mb-4 ${tool.color}`}>
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                            tool.comingSoon ? "text-gray-300" : "text-white group-hover:text-[#0066FF]"
                          }`}>
                            {tool.name}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed mb-6">{tool.desc}</p>
                        </div>
                        
                        <div className={`flex items-center text-xs font-semibold gap-1 transition-all ${
                          tool.comingSoon 
                            ? "text-gray-500" 
                            : "text-[#0066FF] group-hover:gap-2"
                        }`}>
                          {tool.comingSoon ? (
                            "Available Soon"
                          ) : (
                            <>Launch Tool <ArrowRight className="h-3.5 w-3.5" /></>
                          )}
                        </div>
                      </div>
                    );

                    return tool.comingSoon ? card : (
                      <Link key={idx} href={tool.href} className="block h-full">
                        {card}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#1E1E1E] rounded-2xl border border-gray-800">
            <p className="text-gray-400 text-sm">No specific tools match your search criteria. Try typing another format name.</p>
          </div>
        )}
      </section>

      {/* VALUE PROPOSITION */}
      <section className="bg-[#161616] border-y border-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Why Trust DrPDF?</h2>
            <p className="text-gray-400 text-sm">Engineered with modern privacy frameworks and local processing engines.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4">
              <div className="mx-auto p-3 bg-blue-500/10 text-[#0066FF] rounded-full w-fit mb-4"><ShieldCheck className="h-6 w-6" /></div>
              <h3 className="text-base font-semibold text-white mb-2">Absolute File Privacy</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Files pass through secure, automated script nodes and are completely deleted instantly. We do not store templates.</p>
            </div>
            <div className="text-center p-4">
              <div className="mx-auto p-3 bg-yellow-500/10 text-yellow-500 rounded-full w-fit mb-4"><Zap className="h-6 w-6" /></div>
              <h3 className="text-base font-semibold text-white mb-2">Blazing Fast Rendering</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Built on client-optimized WebAssembly logic to process massive structural modifications in fractions of a second.</p>
            </div>
            <div className="text-center p-4">
              <div className="mx-auto p-3 bg-purple-500/10 text-purple-500 rounded-full w-fit mb-4"><Smile className="h-6 w-6" /></div>
              <h3 className="text-base font-semibold text-white mb-2">Zero Hidden Restrictions</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Enjoy direct, unrestricted batch downloads and structural operations completely clear of strict paywalls or watermarks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}