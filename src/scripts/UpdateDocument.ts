import { DocumentsService } from "../services/DocumentsService";
import { Document } from "../models/Document";

const axios = require('axios');
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

async function updateDocument() {
  try {
    const response = await axios.patch(`http://localhost:3001/documents/${documentId}`, {
      fieldToUpdate,
      newValue: fieldToUpdate === "publishDate" ? new Date(newValue) : newValue,
    });

    console.log(`Document with ID ${documentId} updated:`);
    console.log(response.data);
  } catch (error) {
  }
}

updateDocument();
