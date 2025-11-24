import {Document} from "../models/document.model.js";
import { extractPdfText } from "../services/pdf.service.js";
import { docsIndex } from "../services/meili.service.js";

export const uploadDocument = async(req,res)=>{
    try{
        let content = req.body.text || "";
        let type  = "text";
        let title = req.body.title || "untitled";
        let filePath = null;
        
        if(req.file){
            filePath = req.file.path;
            type  = "pdf";
            title = req.body.title || req.file.originalname;
            
            if (req.file.mimetype === "application/pdf") {
                content = await extractPdfText(req.file.path);
              } else {
                return res.status(400).json({
                  error: "Only PDF files are supported"
                });
              }
        }
    
    const doc = await Document.create({
        title,
        content,
        type,
        filePath
    });
    try {
        await docsIndex.addDocuments([{
          id: doc._id.toString(),
          title: doc.title,
          content: doc.content,
          type: doc.type
        }]);
         }catch(indexErr){
            console.error("Meili Search Indexing Failed...",indexErr);
        }
        res.json({
            message: "Document Stroed and Indexed",document: doc
        });

    }catch(err){
            console.error(err);
            return res.status(500).json({error : err.message});
    }
}
export const getAllDocuments = async (req, res) => {
  try {
    const docs = await Document.find();
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
};