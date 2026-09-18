"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactFormClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Yahan aap apne backend API (jaise Formspree, Resend ya Next.js API) ka use kar sakte hain.
    // Abhi ke liye hum 2 second ka mock delay de rahe hain.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 p-8 md:p-12 shadow-2xl text-center flex flex-col items-center justify-center h-full min-h-[400px]">
        <div className="h-20 w-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
        <p className="text-gray-400 mb-8 max-w-sm">
          Thank you for reaching out to DrPDF. Our support team will get back to you within 24 hours.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="px-6 py-3 bg-[#161616] text-white hover:bg-gray-800 border border-gray-700 font-semibold rounded-xl transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 p-8 md:p-10 shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-300">Your Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-[#121212] border border-gray-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full bg-[#121212] border border-gray-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
          <input 
            type="text" 
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help you?"
            className="w-full bg-[#121212] border border-gray-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
          <textarea 
            id="message"
            name="message"
            required
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            className="w-full bg-[#121212] border border-gray-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all 
            ${isSubmitting 
              ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
              : "bg-[#0066FF] text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25"}`}
        >
          {isSubmitting ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Sending Message...</>
          ) : (
            <><Send className="h-5 w-5" /> Send Message</>
          )}
        </button>
      </form>
    </div>
  );
}