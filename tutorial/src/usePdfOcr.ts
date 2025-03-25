import { useState } from "react";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { toast } from "react-hot-toast"; // ✅ Import Hot-Toast

// ✅ PDF.js Worker Setup
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Aadhaar Data Type
interface AadharFormData {
  name: string;
  dob: string;
  gender: "Male" | "Female" | "Other" | "";
  aadharNumber: string;
  phone: string;
  address: string;
}

const usePdfOcr = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Extract Text from Aadhaar PDF
  const extractTextFromPdf = async (file: File): Promise<AadharFormData> => {
    setLoading(true);
    setError(null);
    toast.loading("Extracting Aadhaar details...");

    try {
      // Load PDF
      const pdfData = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const page = await pdf.getPage(1);

      // Render PDF to Canvas
      const scale = 2;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas context is null");

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: context, viewport }).promise;

      // Convert Canvas to Image for OCR
      const imageSrc = canvas.toDataURL("image/png");

      // ✅ Perform OCR
      const { data } = await Tesseract.recognize(imageSrc, "eng", {
        logger: (m) => console.log(m), // Logs OCR progress
      });

      const extractedText = data.text;
      console.log("Extracted Text:", extractedText);

      // ✅ Parse Aadhaar Details
      const parsedData = parseAadharData(extractedText);

      if (parsedData.name && parsedData.aadharNumber) {
        toast.success("Aadhaar details fetched successfully!");
      } else {
        toast.error("Could not extract name or Aadhaar number correctly.");
      }

      return parsedData;
    } catch (err) {
      setError("Error processing Aadhaar PDF");
      toast.error("Error extracting Aadhaar details.");
      console.error("PDF OCR Error:", err);
      return {
        name: "",
        dob: "",
        gender: "",
        aadharNumber: "",
        phone: "",
        address: "",
      };
    } finally {
      setLoading(false);
      toast.dismiss();
    }
  };

  // ✅ Improved Aadhaar Parsing Logic
  const parseAadharData = (text: string): AadharFormData => {
    const nameMatch = text.match(
      /(?:Name|NAME)[:\s]*([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)/
    );
    const dobMatch = text.match(/(?:DOB|D.O.B)[:\s]*(\d{2}\/\d{2}\/\d{4})/);
    const genderMatch = text.match(/\b(FEMALE|MALE|OTHER)\b/);
    const aadharMatch = text.match(/\b(\d{4}\s\d{4}\s\d{4})\b/);
    const phoneMatch = text.match(/(?:Mobile|Phone)[:\s]*(\d{10})/);
    const addressMatch = text.match(
      /Address[:\s]*(.+?)(?:Tamil Nadu\s*-\s*\d{6})/
    );

    return {
      name: nameMatch ? nameMatch[1].trim() : "",
      dob: dobMatch ? dobMatch[1].trim() : "",
      gender: genderMatch
        ? (genderMatch[1] as "Male" | "Female" | "Other")
        : "",
      aadharNumber: aadharMatch ? aadharMatch[1] : "",
      phone: phoneMatch ? phoneMatch[1] : "",
      address: addressMatch ? addressMatch[1].trim() : "",
    };
  };

  return { extractTextFromPdf, loading, error };
};

export default usePdfOcr;
