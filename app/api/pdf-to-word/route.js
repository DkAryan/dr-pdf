// app/api/pdf-to-word/route.js
import { NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun } from "docx";
const pdfParse = require("pdf-parse");

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. PDF se Text Extract karein
    const pdfData = await pdfParse(buffer);
    let text = pdfData.text;

    if (!text || text.trim() === "") {
      throw new Error("No readable text found in PDF. It might be a scanned image.");
    }

    // 2. Text ko Paragraphs me todein
    // DOCX library fix: 'new TextRun({ text: line })' use karna zaroori hai
    const paragraphs = text.split('\n').map(line => {
      return new Paragraph({
        children: [
          new TextRun({ 
            text: line !== undefined && line !== null ? line : " " 
          })
        ],
      });
    });

    // 3. Naya Word Document create karein
    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs,
      }],
    });

    // 4. Document ko Buffer (File) me pack karein
    const docxBuffer = await Packer.toBuffer(doc);

    // 5. Word File ko Frontend par wapas bhejein
    return new NextResponse(docxBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="converted.docx"',
      },
    });

  } catch (error) {
    // Terminal me exact error dekhne ke liye:
    console.error("PDF to Word Error in Backend:", error.message || error);
    
    return NextResponse.json(
      { error: "Conversion failed on server: " + (error.message || "Unknown error") }, 
      { status: 500 }
    );
  }
}