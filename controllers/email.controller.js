/* Controller per l'invio di email di test per la conferma ordine, questo modulo gestisce una richiesta API per inviare un'email di prova utilizzando il servizio Mailtrap. */

// Importa la funzione per l'invio email dal servizio Mailtrap
import { sendOrderConfirmationEmail } from '../services/mailtrap.service.js';


const sendTestEmail = async (req, res, next) => {
  try {
    // Estrae l'email dal body della richiesta esempio   {"email": "emailcliente@email.com"}
    const { email } = req.body;
    
    // Verifica che l'email sia presente
    if (!email) {
      return res.status(400).json({ error: 'Email mancante' });
    }

    const Order = {
      orderId: 123456,
      orderDate: new Date(),
      totalAmount: 99.99, 
     
      products: [
        { name: 'Prodotto di Test 1', quantity: 1, price: 49.99 },
        { name: 'Prodotto di Test 2', quantity: 2, price: 25.00 }
      ]
    };

    // Invoca il servizio per l'invio dell'email
    await sendOrderConfirmationEmail(email, Order);
    
    // Risposta di successo
    res.status(200).json({ message: 'Email di test inviata con successo' });
  } catch (error) {
    // Passa l'errore al middleware di gestione errori
    next(error);
  }
};

// Esporta la funzione per l'uso nelle routes
export  {sendTestEmail} ;