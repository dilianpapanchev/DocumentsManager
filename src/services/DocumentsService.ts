import { Document } from "../models/Document";
import fs from "fs";
import path from "path";

export class DocumentsService {
  private filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, "../data/documents.json");
    this.ensureFileExists();
  }

  // Ensure the file exists before performing any operations
  private ensureFileExists(): void {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  // Load documents from the file
  private loadDocuments(): Document[] {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const data = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(data) as Document[];
    } catch (error) {
      console.error("Error loading documents:", error);
      return [];
    }
  }

  // Save documents back to the file
  private saveDocuments(documents: Document[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(documents, null, 2));
      console.log("Documents saved successfully.");
    } catch (error) {
      console.error("Error saving documents:", error);
    }
  }

  // Get all documents, optionally filtering by type
  getAllDocumentsByType(type: string): Document[] {
    const documents = this.loadDocuments();
    if (type) {
      return documents.filter((doc) => doc.type === type);
    }
    return documents;
  }

  // Get a document by ID
  getDocumentById(id: string): Document | null {
    const documents = this.loadDocuments();
    return documents.find((doc) => doc.id === id) || null;
  }

  // Get documents by a specific field
  getDocumentsByField(field: string, value: string): Document[] {
    const documents = this.loadDocuments();
    return documents.filter((doc) => (doc as any)[field] === value);
  }

  // Update a specific field of a document
  updateDocument(id: string, fieldToUpdate: string, newValue: any): Document | null {
    const documents = this.loadDocuments();
    const document = documents.find((doc) => doc.id === id);
    if (document) {
      if (document.hasOwnProperty(fieldToUpdate)) {
        (document as any)[fieldToUpdate] =
          fieldToUpdate === "publishDate" ? new Date(newValue).toISOString() : newValue;
        this.saveDocuments(documents); // Persist the updated documents
        return document;
      } else {
        console.error(`Field '${fieldToUpdate}' does not exist on the document.`);
        return null;
      }
    }
    return null;
  }

  // Add a new document
  addDocument(newDocument: Document): Document {
    const documents = this.loadDocuments();
    documents.push(newDocument);
    this.saveDocuments(documents);
    return newDocument;
  }

  // Delete a document by ID
  deleteDocument(id: string): boolean {
    const documents = this.loadDocuments();
    const index = documents.findIndex((doc) => doc.id === id);
    if (index !== -1) {
      documents.splice(index, 1);
      this.saveDocuments(documents);
      return true;
    }
    return false;
  }
}
