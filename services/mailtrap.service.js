/**
 * Servizio per l'invio di email di conferma ordine tramite Mailtrap questo modulo gestisce l'invio automatico di email di conferma agli utenti dopo che hanno effettuato un ordine. Utilizza Nodemailer come libreria di base  per la gestione delle email e Mailtrap come servizio SMTP per l'ambiente di sviluppo e test.*/

/* Importa il modulo Nodemailer */
import nodemailer from "nodemailer";

/* Importa la configurazione personalizzata di Mailtrap */
import mailtrapConfig from "../config/mailtrap.config.js";
/**
 * Il transport è l'oggetto responsabile della connessione al server SMTP e dell'invio effettivo delle email. Viene configurato con i parametri specifici di Mailtrap per garantire il corretto instradamento dei messaggi */
const transporter = nodemailer.createTransport({
  host: mailtrapConfig.host,
  port: mailtrapConfig.port,
  auth: {
    user: mailtrapConfig.auth.user,
    pass: mailtrapConfig.auth.pass,
  },
});

/* Invia una email di conferma dell'ordine al cliente questa funzione si occupa di comporre e inviare una email personalizzata di conferma dell'ordine */
const sendOrderConfirmationEmail = async (toEmail, orderDetails) => {
  try {
    /* Configurazione delle opzioni del messaggio email definisce tutti i parametri necessari per la composizionedel messaggio come mittente, destinatario, oggetto e contenuto*/
    const mailOptions = {
      from: `"${mailtrapConfig.from.name}" <${mailtrapConfig.from.email}>`, // Formatta il mittente nel formato "Nome" <email>

      to: toEmail, // Indirizzo email del destinatario

      subject: `Conferma Ordine #${orderDetails.orderId}`, // Oggetto dell'email con ID ordine dinamico
      attachments: [
        {
          filename: "image-logo.png", // Nome del file allegato
          path: `http://localhost:${process.env.PORT}${process.env.COMPANY_LOGO_URL}`, // Percorso del file allegato
          cid: "logo_shop", // ID del contenuto per il riferimento nell'HTML
        },
      ], // Puoi aggiungere eventuali allegati qui se necessario
      /* Template HTML dell'email struttura il contenuto dell'email in formato HTML */
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border: 2px solid #cabd9c; border-radius: 12px;">
            <div style="text-align: center; padding: 30px 0; background-color: #cabd9c; border-radius: 8px 8px 0 0;">
              <img src="cid:logo_shop" alt="PetShop Logo" style="max-width: 200px; height: auto; margin-bottom: 15px;">
              <h1 style="color: #ffffff; margin: 20px 0 10px; font-size: 28px;">Grazie per il tuo ordine!</h1>
            </div>

            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #cabd9c; border-bottom: 2px solid #cabd9c; padding-bottom: 10px; font-size: 24px;">Dettagli Ordine</h2>
              <p style="margin: 10px 0; font-size: 16px;">
                <strong>ID Ordine:</strong> #${orderDetails.orderId}<br>
                <strong>Data:</strong> ${new Date(
                  orderDetails.orderDate
                ).toLocaleDateString()}
              </p>

              <h3 style="color: #cabd9c; margin-top: 20px; font-size: 20px;">Informazioni Cliente</h3>
              <p style="margin: 10px 0;">
                <strong>Nome:</strong> ${orderDetails.name} ${
        orderDetails.lastName
      }<br>
                <strong>Email:</strong> ${orderDetails.email}
              </p>

              <h3 style="color: #cabd9c; margin-top: 20px; font-size: 20px;">Indirizzo di Spedizione</h3>
              <p style="margin: 10px 0;">
                ${orderDetails.shippingAddress}<br>
                ${orderDetails.city}, ${orderDetails.state} ${
        orderDetails.zipCode
      }<br>
                ${orderDetails.country}
              </p>

              <h3 style="color: #cabd9c; margin-top: 20px; font-size: 20px;">Dati di Fatturazione</h3>
              <p style="margin: 10px 0;">${orderDetails.billingAddress}</p>

              <h3 style="color: #cabd9c; margin-top: 20px; font-size: 20px;">Prodotti Ordinati</h3>
              <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
                <thead>
                  <tr style="background-color: #cabd9c; color: #ffffff;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ffffff;">Prodotto</th>
                    <th style="padding: 10px; text-align: center; border-bottom: 2px solid #dee2e6;">Quantità</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #dee2e6;">Prezzo</th>
                    <th style="padding: 10px; text-align: right; border-bottom: 2px solid #dee2e6;">Totale</th>
                  </tr>
                </thead>
                <tbody>
                  ${orderDetails.cartItems
                    .map(
                      (item) => `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">${
                        item.name
                      }</td>
                      <td style="padding: 10px; text-align: center; border-bottom: 1px solid #dee2e6;">${
                        item.quantity
                      }</td>
                      <td style="padding: 10px; text-align: right; border-bottom: 1px solid #dee2e6;">${parseFloat(
                        item.price
                      ).toFixed(2)} €</td>
                      <td style="padding: 10px; text-align: right; border-bottom: 1px solid #dee2e6;">${(
                        item.price * item.quantity
                      ).toFixed(2)} €</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>

              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <h3 style="color: #2c3e50; margin-top: 0;">Riepilogo Costi</h3>
                <table style="width: 100%;">
                  <tr>
                    <td style="padding: 5px 0;">Subtotale:</td>
                    <td style="text-align: right;">${orderDetails.subtotal.toFixed(
                      2
                    )} €</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0;">Spese di spedizione:</td>
                    <td style="text-align: right;">${orderDetails.shippingCost.toFixed(
                      2
                    )}€</td>
                  </tr>
                  ${
                    orderDetails.discount
                      ? `
                    <tr>
                      <td style="padding: 5px 0;">Codice Sconto (${orderDetails.discount.code}):</td>
                      <td style="text-align: right;">-${orderDetails.discount.amount} €</td>
                    </tr>
                  `
                      : ""
                  }
                  <tr style="font-weight: bold;">
                    <td style="padding: 5px 0; border-top: 2px solid #dee2e6;">Totale:</td>
                    <td style="text-align: right; border-top: 2px solid #dee2e6;">${orderDetails.totalAmount.toFixed(
                      2
                    )} €</td>
                  </tr>
                </table>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #cabd9c; border-radius: 0 0 8px 8px; color: #ffffff;">
              <p style="margin: 0;">Se hai domande, non esitare a contattarci rispondendo a questa email.</p>
              <p style="margin: 10px 0 0; font-weight: bold; font-size: 18px;">Grazie per aver scelto il nostro negozio!</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions); // Invio effettivo dell'email tramite il transport Nodemailer

    console.log(
      "Email inviata con successo. ID Messaggio: %s",
      info.messageId,
      process.env.PORT,
      process.env.COMPANY_LOGO_URL
    ); // Registra l'ID del messaggio per tracciamento
    return info;
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error); // Registra l'errore nel log

    throw new Error("EMAIL_SEND_FAILED", {
      // Crea un nuovo errore con informazioni dettagliate
      cause: error,
      details: {
        toEmail,
        orderId: orderDetails.orderId,
        timestamp: new Date().toISOString(),
      },
    });
  }
};

export { sendOrderConfirmationEmail };
