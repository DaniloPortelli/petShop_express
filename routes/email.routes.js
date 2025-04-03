/**
 * File: routes/order.routes.js Desc: Configurazione delle route API per la gestione ordini*/

import express from 'express';
const router = express.Router();

// Importa il controller ordini
import  {processOrder}  from '../controllers/order.controller.js';

/* Route per la gestione degli ordini POST /api/orders -> Crea un nuovo ordine e invia email di conferma*/

router.post('/', processOrder);

export default router;