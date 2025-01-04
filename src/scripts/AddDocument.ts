import { DocumentsService } from "../services/DocumentsService";
import { Document } from "../models/Document";

const documentsService = new DocumentsService();

const documents = documentsService.getAllDocumentsByType("");
const nextId = documents.length > 0 
  ? Math.max(...documents.map(doc => parseInt(doc.id, 10))) + 1 
  : 1;

const newDocument: Document = {
  id: nextId.toString(),
  name: "Sample Document",
  type: "project",
  description: "This is a sample document.",
  publishDate: new Date("2025-01-01"),
};

documentsService.addDocument(newDocument);
console.log("Document added:", newDocument);
