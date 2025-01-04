import { Request, Response } from "express";
import { DocumentsService } from "../services/DocumentsService";

export class DocumentsController {
  private documentsService = new DocumentsService();

  getAllDocumentsByType(req: Request, res: Response): void {
    const { type } = req.query;
    try {
      const documents = this.documentsService.getAllDocumentsByType(type as string || "");
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).send("Internal server error.");
    }
  }

  updateDocument(req: Request, res: Response): void {
    const { id, description } = req.query;
    if (!id || !description) {
      res.status(400).send("ID and description parameters are required.");
      return;
    }

    try {
      const updatedDocument = this.documentsService.updateDocument(id as string, description as string);
      if (updatedDocument) {
        res.json(updatedDocument);
      } else {
        res.status(404).send("Document not found.");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).send("Internal server error.");
    }
  }

  addDocument(req: Request, res: Response): void {
    const newDocument = req.body;
    if (!newDocument || !newDocument.id || !newDocument.name || !newDocument.type || !newDocument.publishDate) {
      res.status(400).send("All document fields are required.");
      return;
    }

    try {
      const addedDocument = this.documentsService.addDocument(newDocument);
      res.status(201).json(addedDocument);
    } catch (error) {
      console.error("Error adding document:", error);
      res.status(500).send("Internal server error.");
    }
  }

  deleteDocument(req: Request, res: Response): void {
    const { id } = req.query;
    if (!id) {
      res.status(400).send("ID parameter is required.");
      return;
    }

    try {
      const isDeleted = this.documentsService.deleteDocument(id as string);
      if (isDeleted) {
        res.status(204).send();
      } else {
        res.status(404).send("Document not found.");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).send("Internal server error.");
    }
  }
}
