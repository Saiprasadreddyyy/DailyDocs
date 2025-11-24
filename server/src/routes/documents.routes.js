import express from "express";
import { upload } from "../services/storage.service.js";
import { uploadDocument, getAllDocuments} from "../controllers/documents.controllers.js";
import { searchDocuments } from "../controllers/search.controllers.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadDocument);
router.get("/search", searchDocuments);
router.get("/all", getAllDocuments);

export default router;
