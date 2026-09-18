"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { 
  UploadCloud, 
  File as FileIcon, 
  X, 
  Settings, 
  CheckCircle, 
  GripVertical,
  Download,
  Layers
} from "lucide-react";

export default function MergePDFClient() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState(null);
  
  const fileInputRef = useRef(null);

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type === "application/pdf"
      );
      setFiles((prev) => [...prev, ...droppedFiles]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter(
        file => file.type === "application/pdf"
      );
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setIsMerging(true);
    
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      setMergedPdfUrl(url);
      setIsSuccess(true);
    } catch (error) {
      console.error("PDF Merge Failed: ", error);
      alert("Something went wrong while merging PDFs. Please check if the files are valid or encrypted.");
    } finally {
      setIsMerging(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setIsSuccess(false);
    if (mergedPdfUrl) {
      URL.revokeObjectURL(mergedPdfUrl);
      setMergedPdfUrl(null);
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 p-6 md:p-10 shadow-2xl">
      {!isSuccess ? (
        <>
          {/* DRAG & DROP ZONE */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ease-in-out flex flex-col items-center justify-center
              ${isDragging 
                ? "border-[#0066FF] bg-blue-500/5" 
                : "border-gray-700 bg-[#161616] hover:border-gray-500 hover:bg-gray-900/50"
              }
              ${files.length > 0 ? "py-8" : "py-20"}
            `}
          >
            <input 
              type="file" 
              multiple 
              accept=".pdf"
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            
            <div className={`p-4 bg-gray-800/50 rounded-full mb-4 ${isDragging ? "text-[#0066FF]" : "text-gray-400"}`}>
              <UploadCloud className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {isDragging ? "Drop PDFs here" : "Choose Files or Drag & Drop"}
            </h3>
            <p className="text-gray-500 text-sm">Only PDF files are supported</p>
          </div>

          {/* FILE LIST */}
          {files.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-white font-medium">Selected Files ({files.length})</h4>
              </div>
              
              <div className="space-y-3 mb-8">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#161616] border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <GripVertical className="h-5 w-5 text-gray-600 cursor-grab" />
                      <div className="p-2 bg-blue-500/10 text-[#0066FF] rounded-lg">
                        <FileIcon className="h-5 w-5" />
                      </div>
                      <div className="truncate pr-4">
                        <p className="text-white text-sm font-medium truncate">{file.name}</p>
                        <p className="text-gray-500 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* ACTION BUTTON */}
              <div className="flex justify-end border-t border-gray-800 pt-6">
                <button
                  onClick={handleMerge}
                  disabled={files.length < 2 || isMerging}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all
                    ${files.length < 2 
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                      : "bg-[#0066FF] text-white hover:bg-blue-600 shadow-lg hover:shadow-blue-500/25"}
                  `}
                >
                  {isMerging ? (
                    <>
                      <Settings className="h-5 w-5 animate-spin" /> Merging PDFs...
                    </>
                  ) : (
                    <>
                      <Layers className="h-5 w-5" /> Merge {files.length} Files
                    </>
                  )}
                </button>
              </div>
              
              {files.length === 1 && (
                <p className="text-orange-400 text-xs text-right mt-3">
                  * Please select at least 2 files to merge.
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        /* SUCCESS STATE */
        <div className="py-12 text-center flex flex-col items-center">
          <div className="h-20 w-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Merge Complete!</h3>
          <p className="text-gray-400 mb-8 max-w-sm">
            Your PDF files have been successfully merged into a single document.
          </p>
          
          <div className="flex gap-4">
            {mergedPdfUrl && (
              <a 
                href={mergedPdfUrl} 
                download="Merged_Document.pdf"
                className="flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-green-500/20"
              >
                <Download className="h-5 w-5" /> Download Merged PDF
              </a>
            )}
            <button 
              onClick={handleReset}
              className="px-6 py-3.5 bg-[#161616] text-white hover:bg-gray-800 border border-gray-700 font-semibold rounded-xl transition-colors"
            >
              Merge More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}