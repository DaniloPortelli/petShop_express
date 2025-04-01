# PetShop Express 🐾

PetShop Express è un'applicazione backend sviluppata con Node.js ed Express che fornisce un'API RESTful per la gestione di un negozio di articoli per animali. L'applicazione offre funzionalità avanzate di ricerca prodotti, gestione ordini con notifiche email automatiche e sistema di sconti.

## 🚀 Tecnologie Utilizzate

- Node.js
- Express.js
- MySQL2
- Nodemailer
- Mailtrap (per testing email)
- CORS
- Dotenv

## 📁 Struttura del Progetto

```text
.
├── app.js                 # Entry point dell'applicazione
├── controllers/          # Controller per la logica di business
├── data/                 # Configurazione database e script SQL
├── middlewares/         # Middleware personalizzati
├── routes/              # Definizione delle rotte API
├── services/            # Servizi (email, etc.)
├── config/              # File di configurazione
└── public/              # File statici (immagini)
```

## 🛠️ Installazione

1. Clona il repository
2. Installa le dipendenze:

   ```bash
   npm install
   ```

3. Crea un file `.env` basandoti su `.env_example` con le tue configurazioni:
  
   ```env
   DB_HOST=localhost
   DB_USER=il_tuo_user
   DB_PASSWORD=la_tua_password
   DB_NAME=il_tuo_database
   MAILTRAP_USER=user_mailtrap
   MAILTRAP_PASS=pass_mailtrap
   ```

4. Importa lo schema del database utilizzando il file `data/petsShop_db.sql`

## 🚀 Avvio dell'Applicazione

Per avviare l'applicazione in modalità standard:

```bash
npm start
```

Per avviare l'applicazione in modalità watch (riavvio automatico al salvataggio):

```bash
npm run watch
```

L'applicazione sarà disponibile su `http://localhost:3000`

## 📊 Struttura del Database

Il database include le seguenti tabelle principali:

- `products`: Catalogo prodotti con dettagli come nome, prezzo, categoria, brand
- `categories`: Categorie dei prodotti
- `orders`: Ordini dei clienti
- `order_details`: Dettagli degli ordini
- `discount_codes`: Codici sconto

## 📫 API Disponibili

### Gestione Ordini

`POST /api/orders`

Crea un nuovo ordine e invia email di conferma al cliente.

Esempio di richiesta:
```json
{
  "customerEmail": "cliente@example.com",
  "products": [
    {
      "id": 1,
      "name": "Crocchette Premium",
      "price": 29.99,
      "quantity": 2
    }
  ]
}
```

### Test Email

`POST /api/send-test-email`

Invia un'email di test per verificare la configurazione del sistema di notifiche.

Esempio di richiesta:
```json
{
  "email": "test@example.com"
}
```

### Ricerca Prodotti

`GET /products/search`

Permette di cercare prodotti utilizzando vari parametri:

- name
- brand
- category
- animals

Esempio:
```path
GET /products/search/crocchette
```

## 🔒 Sicurezza

- Validazione e sanitizzazione degli input
- Protezione contro SQL injection attraverso query parametrizzate
- Gestione sicura delle variabili d'ambiente
- Sistema di logging per tracciamento errori

## 📝 Note per lo Sviluppo

- Il progetto utilizza ES Modules (type: "module" nel package.json)
- Sistema di notifiche email integrato con Nodemailer e Mailtrap
- Le immagini dei prodotti sono servite staticamente dalla cartella `public`
- Implementato middleware CORS per gestire le richieste cross-origin
- Sistema di gestione percorsi immagini personalizzato

## 🤝 Contribuire

Se desideri contribuire al progetto:

1. Fai un fork del repository
2. Crea un branch per la tua feature
3. Commita le tue modifiche
4. Apri una Pull Request

## 📄 Licenza

Questo progetto è rilasciato sotto licenza ISC.
