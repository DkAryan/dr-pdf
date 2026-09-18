"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { 
  UploadCloud, 
  File as FileIcon, 
  X, 
  Settings, 
  CheckCircle, 
  Download,
  Scissors,
  FileDigit,
  Layers
} from "lucide-react";

export default function SplitPDFClient() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Split Modes: "range" (e.g. 1-3) or "all" (extract every page)
  const [splitMode, setSplitMode] = useState("range"); 
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [downloadFileName, setDownloadFileName] = useState("Split_Document.pdf");
  
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  
  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) {
      const droppedFile = Array.from(e.dataTransfer.files).find(f => f.type === "application/pdf");
      if (droppedFile) await loadFileInfo(droppedFile);
    }
  };

  const handleFileSelect = async (e) => {
    if (e.target.files?.length > 0) {
      const selectedFile = Array.from(e.target.files).find(f => f.type === "application/pdf");
      if (selectedFile) await loadFileInfo(selectedFile);
    }
  };

  // PDF Load karke total pages check karna
  const loadFileInfo = async (selectedFile) => {
    try {
      setFile(selectedFile);
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdf.getPageCount());
      setRangeStart(1);
      setRangeEnd(pdf.getPageCount());
    } catch (error) {
      alert("Failed to read PDF. It might be corrupted or password protected.");
      setFile(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setTotalPages(0);
  };

  const handleSplit = async () => {
    if (!file) return;
    
    // Validation for Range Mode
    if (splitMode === "range") {
      const start = parseInt(rangeStart);
      const end = parseInt(rangeEnd);
      if (!start || !end || start < 1 || end > totalPages || start > end) {
        alert(`Please enter a valid range between 1 and ${totalPages}.`);
        return;
      }
    }

    setIsSplitting(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      
      // MODE 1: CUSTOM RANGE (Create single PDF)
      if (splitMode === "range") {
        const startIdx = parseInt(rangeStart) - 1;
        const endIdx = parseInt(rangeEnd) - 1;
        
        const newPdf = await PDFDocument.create();
        
        // Loop through required pages and copy them
        const indicesToCopy = [];
        for (let i = startIdx; i <= endIdx; i++) indicesToCopy.push(i);
        
        const copiedPages = await newPdf.copyPages(originalPdf, indicesToCopy);
        copiedPages.forEach((page) => newPdf.addPage(page));
        
        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        
        setDownloadUrl(URL.createObjectURL(blob));
        setDownloadFileName(`Pages_${rangeStart}-${rangeEnd}_${file.name}`);
      } 
      
      // MODE 2: EXTRACT ALL (Create ZIP file)
      else if (splitMode === "all") {
        const zip = new JSZip();
        
        for (let i = 0; i < totalPages; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(originalPdf, [i]);
          newPdf.addPage(copiedPage);
          
          const pdfBytes = await newPdf.save();
          // Add to ZIP folder
          zip.file(`Page_${i + 1}.pdf`, pdfBytes);
        }
        
        const zipBlob = await zip.generateAsync({ type: "blob" });
        setDownloadUrl(URL.createObjectURL(zipBlob));
        setDownloadFileName(`Split_AllPages_${file.name.replace('.pdf', '')}.zip`);
      }

      setIsSplitting(false);
      setIsSuccess(true);
      
    } catch (error) {
      console.error("PDF Split Error:", error);
      alert("Something went wrong while splitting the PDF.");
      setIsSplitting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setIsSuccess(false);
    setSplitMode("range");
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 p-6 md:p-10 shadow-2xl">
      {!isSuccess ? (
        <>
          {/* UPLOAD ZONE */}
          {!file && (
            <div 
              onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 flex flex-col items-center 
                ${isDragging ? "border-red-500 bg-red-500/5" : "border-gray-700 bg-[#161616] hover:border-gray-500 hover:bg-gray-900/50"}`}
            >
              <input type="file" accept=".pdf" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
              <div className={`p-4 bg-gray-800/50 rounded-full mb-4 ${isDragging ? "text-red-500" : "text-gray-400"}`}>
                <UploadCloud className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{isDragging ? "Drop PDF here" : "Select PDF File"}</h3>
              <p className="text-gray-500 text-sm">Drag and drop your PDF here to split pages</p>
            </div>
          )}

          {/* FILE DETAILS & SPLIT OPTIONS */}
          {file && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#161616] border border-red-500/30 rounded-xl">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="p-2 bg-red-500/10 text-red-500 rounded-lg"><FileIcon className="h-6 w-6" /></div>
                  <div className="truncate pr-4">
                    <p className="text-white text-sm font-medium truncate">{file.name}</p>
                    <p className="text-gray-500 text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB • <span className="text-red-400">{totalPages} Pages</span></p>
                  </div>
                </div>
                <button onClick={removeFile} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><X className="h-5 w-5" /></button>
              </div>

              {/* Split Mode Selector */}
              <div>
                <h4 className="text-white font-medium mb-3 text-sm">How do you want to split?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Custom Range Option */}
                  <div onClick={() => setSplitMode("range")} className={`p-4 rounded-xl border cursor-pointer transition-all ${splitMode === "range" ? "bg-red-500/10 border-red-500" : "bg-[#161616] border-gray-800 hover:border-gray-600"}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <FileDigit className={`h-5 w-5 ${splitMode === "range" ? "text-red-500" : "text-gray-500"}`} />
                      <span className={`text-sm font-bold ${splitMode === "range" ? "text-red-500" : "text-white"}`}>Extract Custom Range</span>
                    </div>
                    {splitMode === "range" ? (
                      <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                        <span className="text-gray-400 text-sm">From</span>
                        <input type="number" min="1" max={totalPages} value={rangeStart} onChange={(e) => setRangeStart(e.target.value)} className="w-16 bg-[#121212] border border-gray-700 text-white text-center text-sm rounded-lg py-1.5 focus:outline-none focus:border-red-500" />
                        <span className="text-gray-400 text-sm">to</span>
                        <input type="number" min="1" max={totalPages} value={rangeEnd} onChange={(e) => setRangeEnd(e.target.value)} className="w-16 bg-[#121212] border border-gray-700 text-white text-center text-sm rounded-lg py-1.5 focus:outline-none focus:border-red-500" />
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500">Create 1 PDF from selected pages</p>
                    )}
                  </div>

                  {/* Extract All Option */}
                  <div onClick={() => setSplitMode("all")} className={`p-4 rounded-xl border cursor-pointer transition-all ${splitMode === "all" ? "bg-red-500/10 border-red-500" : "bg-[#161616] border-gray-800 hover:border-gray-600"}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <Layers className={`h-5 w-5 ${splitMode === "all" ? "text-red-500" : "text-gray-500"}`} />
                      <span className={`text-sm font-bold ${splitMode === "all" ? "text-red-500" : "text-white"}`}>Extract All Pages</span>
                    </div>
                    <p className="text-xs text-gray-500">Separates every page into its own PDF (Downloads as .zip)</p>
                  </div>

                </div>
              </div>

              <div className="flex justify-end border-t border-gray-800 pt-6">
                <button
                  onClick={handleSplit}
                  disabled={isSplitting}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all 
                    ${isSplitting ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-500/25"}`}
                >
                  {isSplitting ? (
                    <><Settings className="h-5 w-5 animate-spin" /> Splitting PDF...</>
                  ) : (
                    <><Scissors className="h-5 w-5" /> Split PDF</>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* SUCCESS STATE */
        <div className="py-12 text-center flex flex-col items-center">
          <div className="h-20 w-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">PDF Split Complete!</h3>
          <p className="text-gray-400 mb-8 max-w-md">
            Your document has been successfully split and is ready for download.
          </p>
          
          <div className="flex gap-4">
            {downloadUrl && (
              <a 
                href={downloadUrl} 
                download={downloadFileName} 
                className="flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-red-500/20"
              >
                <Download className="h-5 w-5" /> {splitMode === "all" ? "Download ZIP" : "Download PDF"}
              </a>
            )}
            <button onClick={handleReset} className="px-6 py-3.5 bg-[#161616] text-white hover:bg-gray-800 border border-gray-700 font-semibold rounded-xl transition-colors">
              Split Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}