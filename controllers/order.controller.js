/* Controller per la gestione degli ordini e l'invio di email di conferma questo modulo gestisce il processo di creazione ordine e l'invio della conferma via email. processa sostanzialmente i dati dell'ordine per inviarli al service di mailtrap che crea effettivamente la mail */

import { sendOrderConfirmationEmail } from '../services/mailtrap.service.js';

//  validateOrder  controllo di validazione ordine
// (order) è un oggetto che rappresenta un ordine con i seguenti campi: customerEmail: l'indirizzo email del cliente ,products: un array di oggetti che rappresentano i prodotti nel carrello, totalAmount: il totale dell'ordine (opzionale) 
//   
// Esempio di ordine valido
//   const validOrder = {
//    customerEmail: 'cliente@example.com',
//    products: [{ id: 1, name: 'Prodotto', price: 10.99, quantity: 2 }]
//  };
 
const validateOrder = (order) => {
  if (!order.customerEmail || !order.products || order.products.length === 0) {
    return {isValid: false,
      error: {
        status: 400,
        message: 'Dati ordine mancanti o non validi',
        details: {
          requiredFields: ['customerEmail', 'products'],
          note: 'products array must contain at least one item'
        }
      }
    };
  }
  return { isValid: true };
};

// Calcola il totale dell'ordine basato sui prodotti
//  const total = calculateTotal([
//    { price: 10.99, quantity: 2 },
//    { price: 5.50, quantity: 1 }
//   ]); // returns 27.48

const calculateTotal = (products) => {
  const total = products.reduce(
    (sum, product) => sum + (product.price * product.quantity),
    0
  );
  return parseFloat(total.toFixed(2));
};
//  Arricchisce i dati dell'ordine con informazioni aggiuntive
const enrichOrderData = (order) => ({
  ...order,
  orderId: Math.floor(Math.random() * 1000000),
  orderDate: new Date(),
  totalAmount: order.totalAmount || calculateTotal(order.products)
});

const formatOrderResponse = (order) => ({
  success: true,
  message: 'Ordine processato con successo',
  order: {
    id: order.orderId,
    date: order.orderDate,
    customerEmail: order.customerEmail,
    total: order.totalAmount,
    products: order.products
  }
});

const processOrder = async (req, res, next) => {
  try {
    const validation = validateOrder(req.body);
    if (!validation.isValid) {
      return res.status(validation.error.status).json(validation.error);
    }
    const order = enrichOrderData(req.body);
    await sendOrderConfirmationEmail(order.customerEmail, order);
    res.status(201).json(formatOrderResponse(order));
  } catch (error) {
    next({
      ...error,
      type: 'ORDER_PROCESSING_ERROR',
      timestamp: new Date().toISOString()
    });
  }
};

export  { processOrder} ;