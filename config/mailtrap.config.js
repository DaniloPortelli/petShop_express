/**
 * Configurazione principale di Mailtrap per il servizio di invio email
 */
const config = {
 
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  
  /* Configurazione dell'autenticazione SMTPContiene le credenziali necessarie per autenticarsi al servizio */
  auth: {
   
    user: process.env.MAILTRAP_USER,
    
    /* Password per l'autenticazione SMTP */
    pass: process.env.MAILTRAP_PASS
  },
  
  /* Configurazione del mittente predefinito Questi dettagli verranno utilizzati come mittente predefinito per tutte le email inviate attraverso questo servizio*/
  from: {
    /* Indirizzo email del mittente Esempio: 'noreply@tuodominio.com' viene prelevato dalle variabili d'ambiente */
    email: process.env.MAILTRAP_FROM_EMAIL,
    
    /* Nome visualizzato del mittente Questo è il nome che apparirà come mittente nelle email Esempio: 'Il Tuo Negozio Online'v iene prelevato dalle variabili d'ambiente */
    name: process.env.MAILTRAP_FROM_NAME
  }
};

export default config;