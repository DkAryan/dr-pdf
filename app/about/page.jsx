import Link from "next/link";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Rocket, 
  Lock, 
  Code,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "About Us | DrPDF - Free & Secure PDF Tools",
  description: "Learn about DrPDF's mission to provide fast, secure, and completely free PDF manipulation tools for everyone.",
};

export default function AboutPage() {
  const coreValues = [
    {
      icon: ShieldCheck,
      title: "Privacy First",
      desc: "Your documents belong to you. We use local browser processing where possible, and strictly auto-delete server files within minutes.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Zap,
      title: "Blazing Fast",
      desc: "Built on modern web architectures like Next.js and WebAssembly to ensure your heavy PDF tasks finish in fractions of a second.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      icon: Heart,
      title: "100% Free",
      desc: "No hidden paywalls, no annoying watermarks, and no registration required. Premium tools should be accessible to everyone.",
      color: "text-pink-500",
      bg: "bg-pink-500/10"
    },
    {
      icon: Code,
      title: "Modern Tech",
      desc: "We leverage industry-leading PDF engines (like Ghostscript and pdf-lib) to guarantee high-quality rendering and accurate compression.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    }
  ];

  return (
    <div className="bg-[#121212] text-[#F0F0F0] min-h-screen pb-20">
      
      {/* HEADER NAVIGATION */}
      <header className="border-b border-gray-800/50 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-20 pb-16 border-b border-gray-800/50 bg-gradient-to-b from-[#161616] to-[#121212]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-[#0066FF] mb-6 border border-blue-500/20">
            <Rocket className="h-4 w-4" /> The Story Behind DrPDF
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Empowering Your <br className="hidden md:block" />
            <span className="text-[#0066FF]">Digital Documents</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We built DrPDF because we believe managing, editing, and converting PDF files shouldn't require expensive software or compromising your privacy.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 pt-16">
        
        {/* OUR MISSION */}
        <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                The internet is full of PDF tools that force you to sign up, restrict your file sizes, or stamp massive watermarks on your professional documents. We decided to change that.
              </p>
              <p className="text-gray-400 leading-relaxed">
                DrPDF was created to be the ultimate prescription for your document tasks. Whether you are a student merging assignments, or a professional compressing reports, we provide the cleanest, fastest, and most secure toolkit on the web.
              </p>
            </div>
            
            {/* Trust Badge */}
            <div className="bg-[#161616] border border-gray-700/50 rounded-2xl p-6 text-center">
              <div className="h-16 w-16 bg-blue-500/10 text-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Zero Data Retention</h3>
              <p className="text-sm text-gray-500">
                We don't want your data. Uploaded files are processed in isolated memory layers and instantly destroyed after your task is complete. No backups, no logs.
              </p>
            </div>
          </div>
        </div>

        {/* CORE VALUES GRID */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-white mb-10">Why Choose DrPDF?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreValues.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div key={idx} className="bg-[#161616] border border-gray-800 hover:border-gray-700 transition-colors rounded-2xl p-6 flex gap-5">
                  <div className={`p-3 rounded-xl h-fit shrink-0 ${value.bg} ${value.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="text-center bg-[#0066FF]/10 border border-[#0066FF]/20 rounded-3xl p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to optimize your workflow?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Stop dealing with limitations. Experience the smoothest PDF tools right now, directly in your browser.
          </p>
          <Link 
            href="/tools" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0066FF] hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Explore All Tools <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

      </main>
    </div>
  );
}