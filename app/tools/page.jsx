"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Combine, 
  Scissors, 
  FileDown, 
  FileSpreadsheet, 
  FileText, 
  Search,
  Lock,
  Unlock,
  Image as ImageIcon,
  RotateCw,
  FilePlus,
  Type,
  FileCheck,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

export default function AllToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Same categories data with 'comingSoon' flags
  const categories = [
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

  // Filter tools based on search query
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
      
      {/* HEADER NAVIGATION */}
      <header className="border-b border-gray-800/50 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-16 pb-12 border-b border-gray-800/50 bg-[#161616]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            All <span className="text-[#0066FF]">PDF Tools</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Explore our complete suite of free, secure, and fast PDF tools. Everything you need to manage your documents in one place.
          </p>
          
          {/* SEARCH BOX */}
          <div className="max-w-lg mx-auto relative group">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500 group-focus-within:text-[#0066FF] transition-colors" />
            <input 
              type="text"
              placeholder="Search for a tool (e.g., Merge, Split, Word)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1E1E1E] text-white pl-12 pr-4 py-3.5 rounded-xl border border-gray-800 focus:outline-none focus:border-[#0066FF] transition-colors shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* TOOLS GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {filteredCategories.length > 0 ? (
          <div className="space-y-16">
            {filteredCategories.map((category, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 border-b border-gray-800 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0066FF]"></span>
                  {category.title}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.tools.map((tool, idx) => {
                    const IconComponent = tool.icon;
                    return (
                      <Link 
                        href={tool.comingSoon ? "#" : tool.href}
                        key={idx} 
                      >
                        <div className={`bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800/80 transition-all duration-300 flex flex-col justify-between group h-full
                          ${tool.comingSoon ? 'opacity-60 cursor-not-allowed' : 'hover:border-[#0066FF]/50 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0066FF]/5'}
                        `}>
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <div className={`p-3 rounded-xl bg-gray-900/50 w-fit ${tool.color}`}>
                                <IconComponent className="h-6 w-6" />
                              </div>
                              
                              {tool.comingSoon && (
                                <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-gray-800/80 text-gray-400 rounded-md border border-gray-700">
                                  Coming Soon
                                </span>
                              )}
                            </div>
                            
                            <h3 className={`text-lg font-semibold text-white mb-2 transition-colors ${!tool.comingSoon && 'group-hover:text-[#0066FF]'}`}>
                              {tool.name}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                              {tool.desc}
                            </p>
                          </div>
                          
                          <div className={`flex items-center text-xs font-semibold gap-1 transition-all 
                            ${tool.comingSoon ? 'text-gray-500' : 'text-[#0066FF] group-hover:gap-2'}
                          `}>
                            {tool.comingSoon ? (
                              "Development in Progress"
                            ) : (
                              <>Launch Tool <ArrowRight className="h-3.5 w-3.5" /></>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#1E1E1E] rounded-2xl border border-gray-800">
            <Search className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
            <p className="text-gray-400 text-sm">We couldn't find any tools matching "{searchQuery}". Try a different keyword.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-6 px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
      
    </div>
  );
}