import express from "express";
import mysl from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.listen(8081, () => {
  console.log("Listening");
});
