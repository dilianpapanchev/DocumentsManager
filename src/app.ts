import express from "express";
import path from "path";
import documentsRouter from "./controllers/DocumentsController";

const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "views", "index.html");
  res.sendFile(filePath);
});

app.use("/documents", documentsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
