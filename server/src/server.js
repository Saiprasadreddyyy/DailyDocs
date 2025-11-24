import app from "./app.js";
import mongoose from "mongoose";

// IMPORT THESE
import { initMeili } from "./services/meili.service.js";
import { syncDocsToMeili } from "./services/syncMeili.js";

// CONNECT TO MONGO FIRST
mongoose.connect("mongodb+srv://saiprasad45_db:Spr1414@cluster0.9vk9cu7.mongodb.net/Meili")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// RUN THESE ONLY AFTER MONGO CONNECTS
mongoose.connection.once("open", async () => {
  console.log("MongoDB ready");

  await initMeili();        // prepares Meili index
  await syncDocsToMeili();  // pushes Mongo DB docs into Meili

  console.log("MeiliSearch synced with MongoDB");
});

// START SERVER
app.listen(5050, () => {
  console.log("Server running on port 5050");
});
