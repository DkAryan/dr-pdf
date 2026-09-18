import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, MapPin, Headphones } from "lucide-react";
import ContactFormClient from "@/components/ContactFormClient";

export const metadata = {
  title: "Contact Us | DrPDF Support",
  description: "Have a question or need help with our PDF tools? Get in touch with the DrPDF support team today.",
};

export default function ContactPage() {
  return (
    <div className="bg-[#121212] text-[#F0F0F0] min-h-screen pb-20">
      
      {/* HEADER */}
      <header className="border-b border-gray-800/50 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-[#161616] to-[#121212]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-[#0066FF] mb-6 border border-blue-500/20">
            <Headphones className="h-4 w-4" /> We are here to help
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Get in <span className="text-[#0066FF]">Touch</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about our tools, need technical support, or want to report a bug, our team is ready to assist you.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* LEFT SIDE: CONTACT INFO */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Fill out the form and our team will try to get back to you within 24 hours. Alternatively, you can reach out to us directly via email.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Block */}
              <div className="flex gap-4 p-4 rounded-2xl bg-[#161616] border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="bg-blue-500/10 p-3 rounded-xl h-fit text-[#0066FF]">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email Us</h4>
                  <a href="mailto:support@drpdf.com" className="text-gray-400 text-sm hover:text-[#0066FF] transition-colors">
                    support@drpdf.com
                  </a>
                </div>
              </div>

              {/* Location Block */}
              <div className="flex gap-4 p-4 rounded-2xl bg-[#161616] border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="bg-purple-500/10 p-3 rounded-xl h-fit text-purple-500">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Location</h4>
                  <p className="text-gray-400 text-sm">
                    Global Remote Team<br/>Available 24/7
                  </p>
                </div>
              </div>

              {/* FAQ Hint Block */}
              <div className="flex gap-4 p-4 rounded-2xl bg-[#161616] border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="bg-emerald-500/10 p-3 rounded-xl h-fit text-emerald-500">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Check FAQs</h4>
                  <p className="text-gray-400 text-sm mb-2">
                    Most of the common questions are already answered on our homepage.
                  </p>
                  <Link href="/#faqs" className="text-sm text-emerald-500 font-medium hover:underline">
                    Read FAQs →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTACT FORM CLIENT COMPONENT */}
          <div className="lg:col-span-3">
            <ContactFormClient />
          </div>

        </div>
      </main>
    </div>
  );
}