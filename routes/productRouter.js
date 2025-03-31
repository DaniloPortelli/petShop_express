import express from 'express'

const router= express.Router()

import  {index, showDogsFood, showDogsGames, showCatsFood, showCatsGames, showAccessories, showDiscountedProducts } from '../controllers/productController.js';

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



export default router