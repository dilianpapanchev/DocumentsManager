import { DocumentsService } from "../services/DocumentsService";
import { Document } from "../models/Document";

const axios = require('axios');
const documentId = process.argv[2];

if (!documentId) {
  console.error("Error: You need to enter an ID to delete.");
  process.exit(1);
}

async function deleteDocumentById(id: string) {
  try {
    const response = await axios.delete(`http://localhost:3001/documents/${id}`);
    console.log(`Document with ID ${id} deleted successfully.`);
  } catch (error) {
    console.log(`Document with ID ${id} has not been found.`);}  
}

deleteDocumentById(documentId);
