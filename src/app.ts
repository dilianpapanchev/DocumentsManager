import express from "express";
import { DocumentsService } from "./services/DocumentsService";

const app = express();
const port = 3000;

const documentsService = new DocumentsService();

app.use(express.json());

app.get("/documents", (req, res) => {
  const type = req.query.type as string || "";
  const documents = documentsService.getAllDocumentsByType(type);
  res.json(documents);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
