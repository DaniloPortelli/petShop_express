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
  const requiredFields = [
    'name',
    'email',
    'shippingAddress',
    'billingAddress',
    'cartItems',
    'lastName',
    'country',
    'state',
    'city',
    'zipCode'
  ];

  const missingFields = requiredFields.filter(field => !order[field]);
  
  if (missingFields.length > 0 || !order.cartItems || order.cartItems.length === 0) {
    return {
      isValid: false,
      error: {
        status: 400,
        message: 'Dati ordine mancanti o non validi',
        details: {
          requiredFields,
          missingFields: missingFields.length > 0 ? missingFields : undefined,
          note: 'Tutti i campi sono obbligatori e il carrello deve contenere almeno un prodotto'
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

const calculateTotal = (cartItems, shippingCost = 0) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );
  const total = subtotal + shippingCost;
  return parseFloat(total.toFixed(2));
};

//  Arricchisce i dati dell'ordine con informazioni aggiuntive
const enrichOrderData = (order) => ({
  ...order,
  orderId: Math.floor(Math.random() * 1000000),
  orderDate: new Date(),
  totalAmount: order.totalAmount || calculateTotal(order.cartItems, order.shippingCost)
});

const formatOrderResponse = (order) => ({
  success: true,
  message: 'Ordine processato con successo',
  order: {
    id: order.orderId,
    date: order.orderDate,
    customer: {
      name: order.name,
      lastName: order.lastName,
      email: order.email
    },
    shipping: {
      address: order.shippingAddress,
      city: order.city,
      state: order.state,
      zipCode: order.zipCode,
      country: order.country
    },
    billing: {
      address: order.billingAddress
    },
    items: order.cartItems,
    costs: {
      subtotal: calculateTotal(order.cartItems),
      shipping: order.shippingCost,
      total: order.totalAmount
    },
    discountCodeId: order.discountCodeId
  }
});

const processOrder = async (req, res) => {
  try {
    // richiamiamo la funzione validateOrder
    const validation = validateOrder(req.body);

    if (!validation.isValid) {
      return res.status(validation.error.status).json(validation.error);
    }
    // richiamiamo la funzione enrichOrderData
    const order = enrichOrderData(req.body);
    
    // passiamo alla funzione di invio email i dati rispettivamente email e ordine
    await sendOrderConfirmationEmail(order.email, order);

    res.status(201).json(formatOrderResponse(order));

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Errore durante l'invio della conferma",
      error: error.message
    });
  }
};

export  { processOrder} ;