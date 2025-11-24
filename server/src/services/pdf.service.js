import pdf from "pdf-parse"
import fs from "fs";

export async function extractPdfText(path){
    const dataBuffer = fs.readFileSync(path);
    const pdfData = await pdf(dataBuffer);
    return pdfData.text;
}
