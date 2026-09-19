import { NextResponse } from "next/server";
import { writeFile, readFile, unlink } from "fs/promises";
import { exec } from "child_process";
import util from "util";
import path from "path";
import os from "os";

const execPromise = util.promisify(exec);

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const level = formData.get("level"); 
    const customSizeKB = parseFloat(formData.get("customSizeKB"));

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const originalSizeKB = buffer.length / 1024;

    const tempDir = os.tmpdir();
    const inputPath = path.join(tempDir, `input_${Date.now()}.pdf`);
    const outputPath = path.join(tempDir, `output_${Date.now()}.pdf`);

    await writeFile(inputPath, buffer);

    let gsCommand = "";

    // 🔴 CUSTOM SIZE LOGIC (Forced Downsampling)
    if (level === "custom" && customSizeKB && customSizeKB < originalSizeKB) {
      
      const ratio = customSizeKB / originalSizeKB;
      // Normal PDF images 200-300 DPI ki hoti hain. Ratio ke hisab se DPI kam karenge.
      let targetDpi = Math.floor(200 * Math.sqrt(ratio));
      
      // Extreme cases limit
      if (targetDpi < 36) targetDpi = 36; // 36 se niche blur ho jayega padhne layaq nahi rahega
      if (targetDpi > 150) targetDpi = 150;

      // Yahan hum Ghostscript ko ZABARDASTI compress karne ka order de rahe hain
      const forceCompressionFlags = [
        "-dDownsampleColorImages=true",
        `-dColorImageResolution=${targetDpi}`,
        "-dColorImageDownsampleType=/Bicubic",
        "-dColorImageDownsampleThreshold=1.0", // 1.0 means force compress all images above targetDpi
        
        "-dDownsampleGrayImages=true",
        `-dGrayImageResolution=${targetDpi}`,
        "-dGrayImageDownsampleType=/Bicubic",
        "-dGrayImageDownsampleThreshold=1.0",
        
        "-dDownsampleMonoImages=true",
        `-dMonoImageResolution=${targetDpi}`,
        "-dMonoImageDownsampleType=/Bicubic",
        "-dMonoImageDownsampleThreshold=1.0"
      ].join(" ");

      gsCommand = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 ${forceCompressionFlags} -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`;
    } 
    // 🔵 PRESET LOGIC (Extreme, Recommended, Less)
    else {
      let pdfSettings = "/ebook"; 
      if (level === "extreme") pdfSettings = "/screen";
      else if (level === "less") pdfSettings = "/printer";
      
      gsCommand = `gswin64c -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=${pdfSettings} -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`;
    }
    
    // Command Execute Karein
    await execPromise(gsCommand);

    const compressedBuffer = await readFile(outputPath);

    // Temp files ko server se hata dein
    await unlink(inputPath);
    await unlink(outputPath);

    return new NextResponse(compressedBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="compressed.pdf"',
      },
    });

  } catch (error) {
    console.error("Compression Error:", error);
    return NextResponse.json({ error: "Compression failed" }, { status: 500 });
  }
}