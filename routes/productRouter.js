import express from 'express'

const router= express.Router()

import  { index, search } from '../controllers/productController.js';

router.get('/', index );

// Funzione Ricerca barra di navigazione
// Definizione della rotta '/search/:term' per la ricerca dei prodotti
// :term è un parametro URL che rappresenta il parametro di ricerca

router.get('/search/:term', search);


export default router