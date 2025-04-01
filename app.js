
import express from "express";

import cors from "cors";

import "dotenv/config";

import imagePathMiddleware from "./middlewares/imagePath.js";

//impostiamo express e la porta del server
const app = express();

const port = 3000;

import productRouter from "./routes/productRouter.js";

import emailRoutes from "./routes/email.routes.js";

import bodyParser from "body-parser";

app.use(cors());

app.use(express.static("public"));

app.use(express.json());


app.use(bodyParser.urlencoded({ extended: true }));

app.use(imagePathMiddleware);

app.use("/products", productRouter);



app.use('/orders', emailRoutes);


//attivazione del server
app.listen(port, () => {
  console.log(`Server in funzione sulla porta: ${port}`);
});
