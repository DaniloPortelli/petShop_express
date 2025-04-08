# PetShop Express 🐾

PetShop Express è un'applicazione backend sviluppata con Node.js ed Express che fornisce un'API RESTful per la gestione di un negozio di articoli per animali. L'applicazione offre funzionalità avanzate di ricerca prodotti 🔍, gestione ordini con notifiche email automatiche 📧, sistema di sconti 💰 e un'interfaccia intuitiva per l'amministrazione del catalogo 📱.

## 🚀 Tecnologie Utilizzate

- Node.js 💻
- Express.js 🛠️
- MySQL2 🗄️
- Nodemailer 📨
- Mailtrap (per testing email) ✉️
- CORS 🌐
- Dotenv 🔐

## 📁 Struttura del Progetto# PetShop Express 🐾

PetShop Express è un'applicazione backend sviluppata con Node.js ed Express che fornisce un'API RESTful per la gestione di un negozio di articoli per animali. L'applicazione offre funzionalità avanzate di ricerca prodotti 🔍, gestione ordini con notifiche email automatiche 📧, sistema di sconti 💰 e un'interfaccia intuitiva per l'amministrazione del catalogo 📱.

## 🚀 Tecnologie Utilizzate

- Node.js 💻
- Express.js 🛠️
- MySQL2 🗄️
- Nodemailer 📨
- Mailtrap (per testing email) ✉️
- CORS 🌐
- Dotenv 🔐

## 📁 Struttura del Progetto

```text
.
├── app.js                 # Entry point dell'applicazione
├── controllers/          # Controller per la logica di business
│   ├── email.controller.js    # Gestione invio email
│   ├── order.controller.js    # Gestione ordini
│   └── productController.js   # Gestione prodotti
├── data/                 # Configurazione database e script SQL
├── middlewares/         # Middleware personalizzati
├── routes/              # Definizione delle rotte API
├── services/            # Servizi (email, etc.)
├── config/              # File di configurazione
└── public/              # File statici (immagini)
```

## ⚙️ Installazione

1. Clona il repository 📥
2. Installa le dipendenze:

   ```bash
   npm install
   ```

3. Crea un file `.env` basandoti su `.env_example` con le tue configurazioni 🔧:
  
   ```env
   DB_HOST=localhost
   DB_USER=il_tuo_user
   DB_PASSWORD=la_tua_password
   DB_NAME=il_tuo_database
   MAILTRAP_HOST=host_mailtrap
   MAILTRAP_PORT=port_mailtrap
   MAILTRAP_USER=user_mailtrap
   MAILTRAP_PASS=pass_mailtrap
   MAILTRAP_FROM_EMAIL=noreply@example.com
   MAILTRAP_FROM_NAME=PetShop Express
   PORT=3000
   ```

4. Importa lo schema del database utilizzando il file `data/petShop_db.sql` 📥

## 🚀 Avvio dell'Applicazione

Per avviare l'applicazione in modalità standard:

```bash
npm start
```

Per avviare l'applicazione in modalità watch (riavvio automatico al salvataggio) 👀:

```bash
npm run watch
```

L'applicazione sarà disponibile su `http://localhost:3000` 🌐

## 🗃️ Struttura del Database

Il database include le seguenti tabelle principali:

- `products`: Catalogo prodotti con dettagli come nome, prezzo, categoria, brand, descrizione e immagine 🏷️
- `categories`: Categorie dei prodotti (es. Cibo, Accessori, Giocattoli) 📑
- `orders`: Ordini dei clienti con data, stato e informazioni di spedizione 🛍️
- `order_details`: Dettagli degli ordini inclusi prodotti, quantità e prezzi 📋
- `discount_codes`: Codici sconto con percentuale, validità e condizioni d'uso 🎟️

## 🔌 API Disponibili

### 🔍 Gestione Prodotti

`GET /products`
Ottiene l'elenco completo dei prodotti disponibili.

`GET /products/search/:term`
Ricerca prodotti per termine specifico.

`GET /products/search?name=&animal=&maxPrice=`
Ricerca prodotti con filtri avanzati:
- Nome prodotto 📝
- Marca 🏢
- Categoria 📑
- Tipo di animale 🐱🐶
- Range di prezzo 💲

Esempio:
```
GET /products/search?name=crocchette&animal=cane&maxPrice=50
```

`GET /products/:slug`
Ottiene i dettagli di un singolo prodotto tramite slug.

`GET /products/cani`
Ottiene tutti i prodotti per cani.

`GET /products/gatti`
Ottiene tutti i prodotti per gatti.

`GET /products/cani/cibo`
Ottiene il cibo per cani.

`GET /products/cani/giochi`
Ottiene i giochi per cani.

`GET /products/gatti/cibo`
Ottiene il cibo per gatti.

`GET /products/gatti/giochi`
Ottiene i giochi per gatti.

`GET /products/accessori`
Ottiene gli accessori per animali.

`GET /products/promozioni`
Ottiene i prodotti in promozione.

### 🛍️ Gestione Ordini

`POST /products/orders`
Crea un nuovo ordine e invia email di conferma al cliente con template HTML personalizzato e logo aziendale PawPlanet.

Esempio di richiesta:
```json
{
  "name": "Mario",
  "lastName": "Rossi",
  "email": "cliente@example.com",
  "shippingAddress": "Via Roma 1",
  "billingAddress": "Via Roma 1",
  "city": "Milano",
  "state": "MI",
  "zipCode": "20100",
  "country": "Italia",
  "cartItems": [
    {
      "id": 1,
      "name": "Crocchette Premium",
      "price": 29.99,
      "quantity": 2
    }
  ],
  "shippingCost": 5.99,
  "discountCodeId": 1,
  "paymentMethod": "Carta di credito"
}
```

`POST /products/validateDiscountCode`
Verifica la validità di un codice sconto, controllando se è attivo e nel periodo di validità.

Esempio di richiesta:
```json
{
  "discountCode": "WELCOME10"
}
```

Esempio di risposta (codice valido):
```json
{
  "valid": true,
  "message": "Codice sconto valido!",
  "discount": {
    "id": 1,
    "code": "WELCOME10",
    "discount_percent": 10,
    "start_date": "2023-01-01",
    "end_date": "2023-12-31"
  }
}
```

### 📧 Sistema di Notifiche Email

Il sistema di notifiche email è integrato con il processo di ordine e utilizza Nodemailer con Mailtrap per l'invio di email di conferma. Le email di conferma ordine includono:

- Template HTML personalizzato con stile grafico coordinato ai colori aziendali 🎨
- Logo aziendale PawPlanet integrato nell'intestazione 🖼️
- Dettagli completi dell'ordine (prodotti, quantità, prezzi) 📋
- Informazioni di spedizione e fatturazione 🚚
- Riepilogo dei costi (subtotale, sconto, spese di spedizione, totale) 💲
- Messaggio di ringraziamento e istruzioni per il supporto 🙏

## 🔒 Sicurezza

- Validazione e sanitizzazione degli input con middleware dedicati ✔️
- Protezione contro SQL injection attraverso query parametrizzate 🛡️
- Gestione sicura delle variabili d'ambiente con dotenv 🔐
- Sistema di logging per tracciamento errori e monitoraggio 📝
- Rate limiting per prevenire abusi delle API 🚫

## 💻 Note per lo Sviluppo

- Architettura modulare con separazione delle responsabilità 🏗️
- Sistema di notifiche email avanzato con template HTML personalizzato e logo aziendale PawPlanet 📧
- Email di conferma ordine con dettagli completi e stile grafico coordinato ai colori aziendali 🎨
- Gestione ottimizzata delle immagini con middleware dedicato 🖼️
- Sistema di validazione dei codici sconto con verifica di validità temporale 🏷️
- Supporto per richieste cross-origin tramite CORS 🌐
- Documentazione API integrata e aggiornata 📚

## 🤝 Contribuire

Se desideri contribuire al progetto:

1. Fai un fork del repository 🔄
2. Crea un branch per la tua feature 🌿
3. Commita le tue modifiche ✍️
4. Apri una Pull Request 📤

## 📄 Licenza

Questo progetto è rilasciato sotto licenza ISC. ⚖️

## 📞 Supporto

Per domande o problemi, apri una issue sul repository o contatta il team di sviluppo. 🤝
