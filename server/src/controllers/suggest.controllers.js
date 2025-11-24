import { suggestIndex } from "../search/meili.js";

export const getSuggestions = async (req, res) => {
  try {
    const q = req.query.q || "";
    if (!q.trim()) return res.json([]);

    const results = await suggestIndex.search(q, {
      limit: 5,
    });

    res.json(results.hits.map(hit => hit.word));

  } catch (err) {
    console.error("Suggestions error:", err);
    res.status(500).json({ error: err.message });
  }
};
