import { DocumentsService } from "../services/DocumentsService";

const documentId = process.argv[2];
const fieldToUpdate = process.argv[3];
const newValue = process.argv[4];

if (!documentId) {
  console.error("Error: You need to enter an ID of the document to update.");
  process.exit(1);
}

if (!fieldToUpdate) {
  console.error("Error: You need to specify the field to update.");
  process.exit(1);
}

if (!newValue) {
  console.error("Error: You need to specify a new value for the field.");
  process.exit(1);
}

const documentsService = new DocumentsService();
const documents = documentsService.getAllDocumentsByType("");

const document = documents.find(doc => doc.id === documentId);

if (!document) {
  console.error(`Error: Document with ID ${documentId} not found.`);
  process.exit(1);
}

if (document.hasOwnProperty(fieldToUpdate)) {
  (document as any)[fieldToUpdate] = fieldToUpdate === "publishDate" 
    ? new Date(newValue)
    : newValue;

  documentsService["saveDocuments"](documents);
  console.log(`Document with ID ${documentId} updated:`);
  console.log(document);
} else {
  console.error(`Error: Field '${fieldToUpdate}' does not exist on the document.`);
}
