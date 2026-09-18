import Link from "next/link";
import { FileText, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    tools: [
      { name: "Merge PDF", href: "/tools/merge" },
      { name: "Split PDF", href: "/tools/split" },
      { name: "Compress PDF", href: "/tools/compress" },
      { name: "PDF to Word", href: "/tools/pdf-to-word" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "Sitemap", href: "/sitemap.xml" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  };

  return (
    <footer className="bg-[#121212] text-[#F0F0F0] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* Main Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12">
          
          {/* Brand & Description Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-[#0066FF]" />
              <span className="text-xl font-bold tracking-wider text-white">
                Dr<span className="text-[#0066FF]">PDF</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Your free, secure, and fast medical-grade solution for web-based PDF editing. Convert, merge, split, and compress your documents in seconds without software installation.
            </p>
            {/* Social Icons for AdSense Quality Signals */}
            <div className="flex space-x-4 pt-2">
              {/* <Link href="#" className="text-gray-500 hover:text-[#0066FF] transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-gray-500 hover:text-[#0066FF] transition-colors"><Github className="h-5 w-5" /></Link>
              <Link href="#" className="text-gray-500 hover:text-[#0066FF] transition-colors"><Linkedin className="h-5 w-5" /></Link> */}
              <Link href="#" className="text-gray-500 hover:text-[#0066FF] transition-colors"><Mail className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              {links.tools.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links Column */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Compliance Column (Critical for AdSense) */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal & Trust</h3>
            <ul className="space-y-2">
              {links.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-[#FF3B30] transition-colors font-medium">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* AdSense Compliance Disclaimer Text Box */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center lg:text-left">
          <p className="text-xs text-gray-500 max-w-4xl leading-relaxed mx-auto lg:mx-0">
            <strong>Disclaimer:</strong> DrPDF does not store, copy, or retain your files on our servers. All document processing happens safely inside your browser or via secure, isolated memory chunks that delete immediately upon completion. We prioritize user data privacy.
          </p>
        </div>

        {/* Copyright and Bottom Row */}
        <div className="mt-6 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <div>
            &copy; {currentYear} DrPDF. All rights reserved. Built for lightning-fast utility.
          </div>
          <div className="flex space-x-6">
            <span className="text-gray-500">Secure 256-Bit SSL Encryption</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
