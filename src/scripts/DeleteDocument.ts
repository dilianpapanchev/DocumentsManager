import { DocumentsService } from "../services/DocumentsService";

const documentId = process.argv[2];

if (!documentId) {
  console.error("Error: You need to enter an ID to delete.");
  process.exit(1);
}

const documentsService = new DocumentsService();

const isDeleted = documentsService.deleteDocument(documentId);

if (isDeleted) {
  console.log(`Document with ID ${documentId} deleted.`);

  if (documentId === "1") {
    const documents = documentsService.getAllDocumentsByType("");

    const adjustedDocuments = documents.map(doc => ({
      ...doc,
      id: (parseInt(doc.id, 10) - 1).toString(),
    }));

    documentsService["saveDocuments"](adjustedDocuments);
    console.log("All document IDs have been adjusted to ensure proper sequence.");
  }
} else {
  console.error(`Document with ID ${documentId} not found.`);
}
