import express from 'express'

const router = express.Router()


import  { index, showDogsFood, showDogsGames, showCatsFood, showCatsGames, showAccessories, showDiscountedProducts, search, show } from '../controllers/productController.js';


router.get('/', index);
// Rotta per ottenere il cibo per cani
router.get('/cani/food', showDogsFood);

// Rotta per ottenere i giochi per cani
router.get('/cani/games', showDogsGames);

// Rotta per ottenere il cibo per gatti
router.get('/gatti/food', showCatsFood);

// Rotta per ottenere i giochi per gatti
router.get('/gatti/games', showCatsGames);

// Rotta per ottenere gli accessori
router.get('/accessories', showAccessories);

// Rotta per ottenere i prodotti sconto
router.get('/discounted', showDiscountedProducts);

// Funzione Ricerca barra di navigazione
// Definizione della rotta '/search/:term' per la ricerca dei prodotti
// :term è un parametro URL che rappresenta il parametro di ricerca

router.get('/search/:term', search);

// Funzione per la visualizzazione di un prodotto specifico tramite lo slug
router.get('/:slug', show);

export default router