import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5050/api/docs/search?q=${encodeURIComponent(query)}`
      );
      setResults(res.data);
    } catch (err) {
      console.error("Search Error:", err);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">DailyDocs Search</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search your documents…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="search-button"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div>
        {results.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No results found…</p>
        ) : (
          results.map((doc) => (
            <div key={doc.id} className="result-card">
              <h2 className="result-title">{doc.title}</h2>
              <p className="result-type">{doc.type.toUpperCase()}</p>
              <p className="result-content">{doc.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
