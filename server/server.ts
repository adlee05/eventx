import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 5900;

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`); 
})
