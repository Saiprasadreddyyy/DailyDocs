import { docsIndex } from "../services/meili.service.js";

export const searchDocuments = async (req, res) => {
    try {
      const q = req.query.q?.trim() || "";
  
      if (!q) return res.json([]);
  
      const searchResult = await docsIndex.search(q, {
        limit: 20,
        attributesToRetrieve: ["id", "title", "content", "type"]
      });
  
      return res.json(searchResult.hits);
  
    } catch (err) {
      console.error("Search Error:", err);
      return res.status(500).json({ error: err.message });
    }
  };
  