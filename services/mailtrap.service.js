/**
 * Servizio per l'invio di email di conferma ordine tramite Mailtrap questo modulo gestisce l'invio automatico di email di conferma agli utenti dopo che hanno effettuato un ordine. Utilizza Nodemailer come libreria di base  per la gestione delle email e Mailtrap come servizio SMTP per l'ambiente di sviluppo e test.*/

/* Importa il modulo Nodemailer */
import nodemailer from 'nodemailer';

/* Importa la configurazione personalizzata di Mailtrap */
import mailtrapConfig from '../config/mailtrap.config.js';
/**
 * Il transport è l'oggetto responsabile della connessione al server SMTP e dell'invio effettivo delle email. Viene configurato con i parametri specifici di Mailtrap per garantire il corretto instradamento dei messaggi */
const transporter = nodemailer.createTransport({
  host: mailtrapConfig.host,       
  port: mailtrapConfig.port,       
  auth: {
    user: mailtrapConfig.auth.user, 
    pass: mailtrapConfig.auth.pass  
  }
});

/* Invia una email di conferma dell'ordine al cliente questa funzione si occupa di comporre e inviare una email personalizzata di conferma dell'ordine */
const sendOrderConfirmationEmail = async (toEmail, orderDetails) => {
  try {

    /* Configurazione delle opzioni del messaggio email definisce tutti i parametri necessari per la composizionedel messaggio come mittente, destinatario, oggetto e contenuto*/
    const mailOptions = {

      
      from: `"${mailtrapConfig.from.name}" <${mailtrapConfig.from.email}>`,// Formatta il mittente nel formato "Nome" <email>
      
    
      to: toEmail,  // Indirizzo email del destinatario
  
      subject: `Conferma Ordine #${orderDetails.orderId}`, // Oggetto dell'email con ID ordine dinamico
      
     /* Template HTML dell'email struttura il contenuto dell'email in formato HTML */
      html: ` 
        <h1>Grazie per il tuo ordine!</h1>
        <p>Ecco i dettagli del tuo ordine:</p>
        <ul>
          <li>ID Ordine: ${orderDetails.orderId}</li>
          <li>Data: ${new Date(orderDetails.orderDate).toLocaleDateString()}</li>
        </ul>

        <h3>Informazioni Cliente:</h3>
        <ul>
          <li>Nome: ${orderDetails.name} ${orderDetails.lastName}</li>
          <li>Email: ${orderDetails.email}</li>
        </ul>

        <h3>Indirizzo di Spedizione:</h3>
        <p>${orderDetails.shippingAddress}</p>
        <ul>
          <li>Città: ${orderDetails.city}</li>
          <li>Stato/Regione: ${orderDetails.state}</li>
          <li>CAP: ${orderDetails.zipCode}</li>
          <li>Paese: ${orderDetails.country}</li>
        </ul>

        <h3>Indirizzo di Fatturazione:</h3>
        <p>${orderDetails.billingAddress}</p>

        <h3>Prodotti ordinati:</h3>
        <ul>
          ${orderDetails.cartItems.map(item => `
            <li>
              ${item.name} - Quantità: ${item.quantity} - Prezzo: €${item.price.toFixed(2)} - Totale: €${(item.price * item.quantity).toFixed(2)}
            </li>
          `).join('')}
        </ul>

        <h3>Riepilogo Costi:</h3>
        <ul>
          <li>Subtotale: €${orderDetails.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</li>
          <li>Spese di spedizione: €${orderDetails.shippingCost.toFixed(2)}</li>
          ${orderDetails.discountCodeId ? '<li>Codice Sconto Applicato: #' + orderDetails.discountCodeId + '</li>' : ''}
          <li><strong>Totale: €${(orderDetails.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + orderDetails.shippingCost).toFixed(2)}</strong></li>
        </ul>

        <p>Se hai domande, non esitare a contattarci rispondendo a questa email.</p>
        <p>Grazie per aver scelto il nostro negozio!</p>
      `
    };

    
    const info = await transporter.sendMail(mailOptions); // Invio effettivo dell'email tramite il transport Nodemailer 
    
  
    console.log('Email inviata con successo. ID Messaggio: %s', info.messageId);  // Registra l'ID del messaggio per tracciamento
    return info;
    
  } catch (error) {
    
    console.error('Errore durante l\'invio dell\'email:', error);  // Registra l'errore nel log
    

    throw new Error('EMAIL_SEND_FAILED', {     // Crea un nuovo errore con informazioni dettagliate 
      cause: error,
      details: {
        toEmail,
        orderId: orderDetails.orderId,
        timestamp: new Date().toISOString()
      }
    });
  }
};

export { sendOrderConfirmationEmail };