"use client";

import { useState, useRef } from "react";
import { 
  UploadCloud, 
  File as FileIcon, 
  X, 
  Settings, 
  CheckCircle, 
  Download,
  FileText
} from "lucide-react";

export default function PdfToWordClient() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      const droppedFile = Array.from(e.dataTransfer.files).find(f => f.type === "application/pdf");
      if (droppedFile) setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files?.length > 0) {
      const selectedFile = Array.from(e.target.files).find(f => f.type === "application/pdf");
      if (selectedFile) setFile(selectedFile);
    }
  };

  const removeFile = () => setFile(null);

  // REAL CONVERSION API CALL
  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Backend API ko file bhejein
      const response = await fetch("/api/pdf-to-word", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Conversion failed on server");
      }

      // Backend se aayi hui DOCX file ko Blob me convert karein
      const blob = await response.blob();
      
      // Download URL banayein
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setIsConverting(false);
      setIsSuccess(true);
      
    } catch (error) {
      console.error("Conversion Error:", error);
      alert("Failed to convert PDF. It might be a scanned image or protected.");
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setIsSuccess(false);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 p-6 md:p-10 shadow-2xl">
      {!isSuccess ? (
        <>
          {!file && (
            <div 
              onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 flex flex-col items-center 
                ${isDragging ? "border-indigo-500 bg-indigo-500/5" : "border-gray-700 bg-[#161616] hover:border-gray-500 hover:bg-gray-900/50"}`}
            >
              <input type="file" accept=".pdf" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
              <div className={`p-4 bg-gray-800/50 rounded-full mb-4 ${isDragging ? "text-indigo-500" : "text-gray-400"}`}>
                <UploadCloud className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{isDragging ? "Drop PDF here" : "Select PDF File"}</h3>
              <p className="text-gray-500 text-sm">Drag and drop your PDF here to convert to Word</p>
            </div>
          )}

          {file && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#161616] border border-indigo-500/30 rounded-xl">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg"><FileIcon className="h-6 w-6" /></div>
                  <div className="truncate pr-4">
                    <p className="text-white text-sm font-medium truncate">{file.name}</p>
                    <p className="text-gray-500 text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <button onClick={removeFile} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><X className="h-5 w-5" /></button>
              </div>

              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 flex gap-3">
                <FileText className="h-5 w-5 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-indigo-100">Text Extraction to DOCX</p>
                  <p className="text-xs text-indigo-300 mt-1">
                    We will extract all readable text from this PDF and convert it into a clean, editable Microsoft Word document.
                  </p>
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-800 pt-6">
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all 
                    ${isConverting ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/25"}`}
                >
                  {isConverting ? (
                    <><Settings className="h-5 w-5 animate-spin" /> Converting...</>
                  ) : (
                    <><FileText className="h-5 w-5" /> Convert to Word</>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="py-12 text-center flex flex-col items-center">
          <div className="h-20 w-20 bg-indigo-500/10 text-indigo-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Conversion Complete!</h3>
          <p className="text-gray-400 mb-8 max-w-md">
            Your PDF has been successfully converted into an editable Microsoft Word document.
          </p>
          
          <div className="flex gap-4">
            {downloadUrl && (
              <a 
                href={downloadUrl} 
                download={`${file?.name.replace(".pdf", "")}_Converted.docx`} 
                className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
              >
                <Download className="h-5 w-5" /> Download Word File
              </a>
            )}
            <button onClick={handleReset} className="px-6 py-3.5 bg-[#161616] text-white hover:bg-gray-800 border border-gray-700 font-semibold rounded-xl transition-colors">
              Convert Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}