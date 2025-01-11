import { DocumentsService } from "../services/DocumentsService";
import { Document } from "../models/Document";

const axios = require("axios");
const documentsService = new DocumentsService();

async function addNewDocument() {
  try {
    const allDocumentsResponse = await axios.get("http://localhost:3001/documents");
    const documents: Document[] = allDocumentsResponse.data;

    const nextId = documents.length > 0
      ? (Math.max(...documents.map((doc) => parseInt(doc.id, 10))) + 1).toString()
      : "1";

    const newDocument: Document = {
      id: nextId,
      name: "Mecko",
      type: "pedal",
      description: "debel",
      publishDate: new Date("2025-01-01"),
    };

    const response = await axios.post("http://localhost:3001/documents", newDocument);
    console.log("New document added:", response.data);
  } catch (error) {}
}

addNewDocument();
