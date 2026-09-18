"use client";

import { useState, useRef } from "react";
import { 
  UploadCloud, 
  File as FileIcon, 
  X, 
  Settings, 
  CheckCircle, 
  Download,
  FileDown,
  Zap,
  ShieldCheck,
  Sliders
} from "lucide-react";

export default function CompressPDFClient() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [compressionMode, setCompressionMode] = useState("recommended"); 
  const [customSize, setCustomSize] = useState("");
  const [customUnit, setCustomUnit] = useState("KB"); 
  
  const [compressedStats, setCompressedStats] = useState({ oldSize: 0, newSize: 0, percentage: 0 });
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

  const handleCompress = async () => {
    if (!file) return;

    let targetKB = 0;
    if (compressionMode === "custom") {
      if (!customSize || isNaN(customSize) || customSize <= 0) {
        alert("Please enter a valid target size.");
        return;
      }
      targetKB = customUnit === "MB" ? parseFloat(customSize) * 1024 : parseFloat(customSize);
      
      if (targetKB >= (file.size / 1024)) {
        alert("Target size must be smaller than the original file size.");
        return;
      }
    }

    setIsCompressing(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("level", compressionMode);
      if (compressionMode === "custom") {
        formData.append("customSizeKB", targetKB.toString());
      }

      const response = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Compression failed on server");

      const compressedBlob = await response.blob();
      
      const oldSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const newSizeMB = (compressedBlob.size / (1024 * 1024)).toFixed(2);
      
      let savedPercent = Math.round(((oldSizeMB - newSizeMB) / oldSizeMB) * 100);
      if (savedPercent < 0) savedPercent = 0;

      setCompressedStats({
        oldSize: oldSizeMB,
        newSize: newSizeMB,
        percentage: savedPercent
      });

      const url = URL.createObjectURL(compressedBlob);
      setDownloadUrl(url); 
      
      setIsCompressing(false);
      setIsSuccess(true);
      
    } catch (error) {
      console.error("Error compressing file:", error);
      alert("Compression failed! Please try again.");
      setIsCompressing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setIsSuccess(false);
    setCompressionMode("recommended");
    setCustomSize("");
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
              className={`relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 flex flex-col items-center ${isDragging ? "border-green-500 bg-green-500/5" : "border-gray-700 bg-[#161616] hover:border-gray-500 hover:bg-gray-900/50"}`}
            >
              <input type="file" accept=".pdf" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
              <div className={`p-4 bg-gray-800/50 rounded-full mb-4 ${isDragging ? "text-green-500" : "text-gray-400"}`}>
                <UploadCloud className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{isDragging ? "Drop PDF here" : "Select PDF File"}</h3>
              <p className="text-gray-500 text-sm">Drag and drop your PDF here</p>
            </div>
          )}

          {file && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-[#161616] border border-green-500/30 rounded-xl">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="p-2 bg-green-500/10 text-green-500 rounded-lg"><FileIcon className="h-6 w-6" /></div>
                  <div className="truncate pr-4">
                    <p className="text-white text-sm font-medium truncate">{file.name}</p>
                    <p className="text-gray-500 text-xs">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <button onClick={removeFile} className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"><X className="h-5 w-5" /></button>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3 text-sm">Select Compression Level</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Recommended */}
                  <div onClick={() => setCompressionMode("recommended")} className={`p-4 rounded-xl border cursor-pointer transition-all ${compressionMode === "recommended" ? "bg-green-500/10 border-green-500" : "bg-[#161616] border-gray-800 hover:border-gray-600"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <ShieldCheck className={`h-5 w-5 ${compressionMode === "recommended" ? "text-green-500" : "text-gray-500"}`} />
                      <span className={`text-xs font-bold ${compressionMode === "recommended" ? "text-green-500" : "text-gray-500"}`}>RECOMMENDED</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">Good quality</p>
                    <p className="text-xs text-gray-500">Perfect balance of size & quality</p>
                  </div>

                  {/* Extreme */}
                  <div onClick={() => setCompressionMode("extreme")} className={`p-4 rounded-xl border cursor-pointer transition-all ${compressionMode === "extreme" ? "bg-green-500/10 border-green-500" : "bg-[#161616] border-gray-800 hover:border-gray-600"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Zap className={`h-5 w-5 ${compressionMode === "extreme" ? "text-green-500" : "text-gray-500"}`} />
                      <span className={`text-xs font-bold ${compressionMode === "extreme" ? "text-green-500" : "text-gray-500"}`}>EXTREME</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">Smallest size</p>
                    <p className="text-xs text-gray-500">Lower image quality</p>
                  </div>

                  {/* Less */}
                  <div onClick={() => setCompressionMode("less")} className={`p-4 rounded-xl border cursor-pointer transition-all ${compressionMode === "less" ? "bg-green-500/10 border-green-500" : "bg-[#161616] border-gray-800 hover:border-gray-600"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <FileDown className={`h-5 w-5 ${compressionMode === "less" ? "text-green-500" : "text-gray-500"}`} />
                      <span className={`text-xs font-bold ${compressionMode === "less" ? "text-green-500" : "text-gray-500"}`}>LESS</span>
                    </div>
                    <p className="text-sm font-semibold text-white mb-1">High quality</p>
                    <p className="text-xs text-gray-500">Minimal compression applied</p>
                  </div>

                  {/* Custom Size */}
                  <div onClick={() => setCompressionMode("custom")} className={`p-4 rounded-xl border cursor-pointer transition-all ${compressionMode === "custom" ? "bg-green-500/10 border-green-500" : "bg-[#161616] border-gray-800 hover:border-gray-600"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <Sliders className={`h-5 w-5 ${compressionMode === "custom" ? "text-green-500" : "text-gray-500"}`} />
                      <span className={`text-xs font-bold ${compressionMode === "custom" ? "text-green-500" : "text-gray-500"}`}>CUSTOM SIZE</span>
                    </div>
                    {compressionMode === "custom" ? (
                      <div className="flex gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                        <input type="number" placeholder="E.g. 500" value={customSize} onChange={(e) => setCustomSize(e.target.value)} className="w-full bg-[#121212] border border-gray-700 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-green-500" />
                        <select value={customUnit} onChange={(e) => setCustomUnit(e.target.value)} className="bg-[#121212] border border-gray-700 text-white text-sm rounded-lg px-2 focus:outline-none focus:border-green-500">
                          <option value="KB">KB</option>
                          <option value="MB">MB</option>
                        </select>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-white mb-1">Target specific size</p>
                        <p className="text-xs text-gray-500">Set exactly in KB or MB</p>
                      </>
                    )}
                  </div>

                </div>
              </div>

              <div className="flex justify-end border-t border-gray-800 pt-6">
                <button
                  onClick={handleCompress}
                  disabled={isCompressing}
                  className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all ${isCompressing ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-green-500/25"}`}
                >
                  {isCompressing ? <><Settings className="h-5 w-5 animate-spin" /> Compressing PDF...</> : <><FileDown className="h-5 w-5" /> Compress PDF</>}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="py-12 text-center flex flex-col items-center">
          <div className="h-20 w-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">PDF Compressed!</h3>
          <p className="text-gray-400 mb-6 max-w-md">
            Your document has been optimized. We saved <span className="text-green-400 font-bold">{compressedStats.percentage}%</span> of the original size!
          </p>

          <div className="flex items-center gap-6 bg-[#161616] border border-gray-800 rounded-xl p-4 mb-8">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1">Original Size</p>
              <p className="text-lg font-semibold text-white">{compressedStats.oldSize} MB</p>
            </div>
            <div className="h-10 w-px bg-gray-800"></div>
            <div className="text-center">
              <p className="text-xs text-green-500 mb-1">New Size</p>
              <p className="text-xl font-bold text-green-500">{compressedStats.newSize} MB</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            {downloadUrl && (
              <a href={downloadUrl} download="Compressed_Document.pdf" className="flex items-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-green-500/20">
                <Download className="h-5 w-5" /> Download PDF
              </a>
            )}
            <button onClick={handleReset} className="px-6 py-3.5 bg-[#161616] text-white hover:bg-gray-800 border border-gray-700 font-semibold rounded-xl transition-colors">
              Compress Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}