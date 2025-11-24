import { Document } from "../models/document.model.js";
import { docsIndex } from "./meili.service.js";

export async function syncDocsToMeili() {
  try {
    const docs = await Document.find();

    if (!docs.length) {
      console.log("No documents found in MongoDB!");
      return;
    }

    const formatted = docs.map((doc) => ({
      id: String(doc._id),
      title: doc.title,
      content: doc.content,
      type: doc.type,
    }));

    await docsIndex.addDocuments(formatted);

    console.log("MongoDB → MeiliSearch sync complete!");
  } catch (err) {
    console.error("Sync Error:", err);
  }
}
