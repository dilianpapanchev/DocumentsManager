import { Document } from "../models/Document";
import fs from "fs";
import path from "path";

export class DocumentsService {
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, "../data/documents.json");
    console.log("Resolved file path:", this.filePath);
    this.ensureFileExists();
  }

  private ensureFileExists(): void {
    try {
      if (!fs.existsSync(this.filePath)) {
        console.warn("File does not exist. Creating a new one at:", this.filePath);
        fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
      }
    } catch (error) {
      console.error("Error ensuring the file exists:", error);
    }
  }

  private loadDocuments(): Document[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        console.warn("Warning: File does not exist at:", this.filePath);
        return [];
      }
      const data = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading or parsing documents.json:", error);
      return [];
    }
  }

  private saveDocuments(documents: Document[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(documents, null, 2));
    } catch (error) {
      console.error("Error saving documents to file:", error);
    }
  }

  getAllDocumentsByType(type: string): Document[] {
    const documents = this.loadDocuments();
    if (type) {
      return documents.filter(doc => doc.type === type);
    }
    return documents;
  }

  updateDocument(id: string, description: string): Document | null {
    const documents = this.loadDocuments();
    const document = documents.find(doc => doc.id === id);
    if (document) {
      document.description = description;
      this.saveDocuments(documents);
      return document;
    }
    return null;
  }

  addDocument(newDocument: Document): Document {
    const documents = this.loadDocuments();
    documents.push(newDocument);
    this.saveDocuments(documents);
    return newDocument;
  }

  deleteDocument(id: string): boolean {
    const documents = this.loadDocuments();
    const index = documents.findIndex(doc => doc.id === id);
    if (index !== -1) {
      documents.splice(index, 1);
      this.saveDocuments(documents);
      return true;
    }
    return false;
  }
}
