import { Router, Request, Response } from "express";
import { DocumentsService } from "../services/DocumentsService";

const documentsRouter = Router();
const documentsService = new DocumentsService();

// Get all documents or documents by type
documentsRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const type = req.query.type as string || "";
    const documents = documentsService.getAllDocumentsByType(type);
    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get documents by a specific field dynamically
documentsRouter.get("/byType", async (req: Request, res: Response): Promise<void> => {
  try {
    const queryField = Object.keys(req.query)[0]; // Get the first query parameter key
    const queryValue = req.query[queryField] as string;

    if (!queryField || !queryValue) {
      res.status(400).json({ message: "A query parameter is required." });
      return;
    }

    const documents = documentsService.getDocumentsByField(queryField, queryValue);
    res.json(documents);
  } catch (error) {
    console.error("Error fetching documents by field:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Get a single document by ID
documentsRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const document = documentsService.getDocumentById(id);

    if (document) {
      res.json(document);
    } else {
      res.status(404).json({ message: `Document with ID ${id} not found.` });
    }
  } catch (error) {
    console.error("Error fetching document by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new document
documentsRouter.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, type, description, publishDate } = req.body;
    if (!id || !name || !type || !description || !publishDate) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newDocument = { id, name, type, description, publishDate };
    const addedDocument = documentsService.addDocument(newDocument);
    res.status(201).json(addedDocument);
  } catch (error) {
    console.error("Error adding document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a document field
documentsRouter.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { fieldToUpdate, newValue } = req.body;

    if (!fieldToUpdate || newValue === undefined) {
      res.status(400).json({ message: "Field and new value are required." });
      return;
    }

    const updatedDocument = documentsService.updateDocument(id, fieldToUpdate, newValue);
    if (updatedDocument) {
      res.status(200).json({ message: `Document with ID ${id} updated successfully.`, document: updatedDocument });
    } else {
      res.status(404).json({ message: `Document with ID ${id} not found or invalid field provided.` });
    }
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a document by ID
documentsRouter.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const isDeleted = documentsService.deleteDocument(id);

    if (isDeleted) {
      res.status(200).json({ message: `Document with ID ${id} deleted.` });
    } else {
      res.status(404).json({ message: `Document with ID ${id} not found.` });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default documentsRouter;
