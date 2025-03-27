import express from 'express'

const router= express.Router()

import  index from '../controllers/productController.js';

router.get('/', index);

export default router