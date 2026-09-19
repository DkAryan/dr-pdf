import { NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun } from "docx";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 🔴 FIX: Dynamic import taaki build time par error na aaye
    const pdfParse = (await import("pdf-parse")).default;

    const pdfData = await pdfParse(buffer);
    let text = pdfData.text;

    if (!text || text.trim() === "") {
      throw new Error("No readable text found in PDF. It might be a scanned image.");
    }

    const paragraphs = text.split('\n').map(line => {
      return new Paragraph({
        children: [
          new TextRun({ 
            text: line !== undefined && line !== null ? line : " " 
          })
        ],
      });
    });

    const doc = new Document({
      sections: [{
        properties: {},
        children: paragraphs,
      }],
    });

    const docxBuffer = await Packer.toBuffer(doc);

    return new NextResponse(docxBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="converted.docx"',
      },
    });

  } catch (error) {
    console.error("PDF to Word Error in Backend:", error.message || error);
    return NextResponse.json(
      { error: "Conversion failed on server: " + (error.message || "Unknown error") }, 
      { status: 500 }
    );
  }
}