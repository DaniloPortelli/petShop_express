import express from 'express';
import 'dotenv/config'

   //impostiamo express e la porta del server
   const app = express();
   const port = 3000;

   //attivazione del server
   app.listen(port, () => {
     console.log(`Server in funzione sulla porta: ${port}`);
   });