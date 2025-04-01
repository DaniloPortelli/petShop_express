/**
 * File: routes/order.routes.js
 * Desc: Configurazione delle route API per la gestione ordini e email
 *       Separa le route per ordini e test email in endpoint distinti
 */

import express from 'express';
const router = express.Router();

// Importa i controller
import  {processOrder}  from '../controllers/order.controller.js';
import  {sendTestEmail}  from '../controllers/email.controller.js';

/**
 * Route per la gestione degli ordini
 * POST /api/orders -> Crea un nuovo ordine e invia email di conferma
 */
router.post('/', processOrder);

/**
 * Route per testing email (da disabilitare in produzione)
 * POST /api/send-test-email -> Invia un'email di test
 */
router.post('/send-test-email',sendTestEmail);

export default router;