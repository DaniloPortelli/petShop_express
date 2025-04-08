import connection from "../data/db.js";
import { sendOrderConfirmationEmail } from "../services/mailtrap.service.js";

function index(req, res) {
  const indexSql = "SELECT * FROM products";

  connection.query(indexSql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });
    }
    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    res.json(products); // Invia la risposta JSON con i prodotti modificati
  });
}

/*Chiamata per cibo per cani*/

function showDogsFood(req, res) {
  const sql = `
    SELECT p.id AS product_id, p.name AS product_name, p.*, c.id AS category_id, c.name AS category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Cibo' AND p.animals = 'cani';`;

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });

    // res.json(results);

    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    res.json(products); // Invia la risposta JSON con i prodotti modificati
  });
}

/*Chiamata per giochi per cani*/

function showDogsGames(req, res) {
  const sql = `
    SELECT p.id AS product_id, p.name AS product_name, p.*, c.id AS category_id, c.name AS category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Giochi' AND p.animals = 'cani';
`;

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });

    // res.json(results);
    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    res.json(products); // Invia la risposta JSON con i prodotti modificati
  });
}

/*Chiamata per cibo per gatti*/

function showCatsFood(req, res) {
  const sql = `
    SELECT p.id AS product_id, p.name AS product_name, p.*, c.id AS category_id, c.name AS category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Cibo' AND p.animals = 'gatti';

`;

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });

    // res.json(results);
    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    res.json(products); // Invia la risposta JSON con i prodotti modificati
  });
}

/*Chiamata per giochi per gatti*/

function showCatsGames(req, res) {
  const sql = `
    SELECT p.id AS product_id, p.name AS product_name, p.*, c.id AS category_id, c.name AS category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Giochi' AND p.animals = 'gatti';
`;

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });

    // res.json(results);
    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    res.json(products); // Invia la risposta JSON con i prodotti modificati
  });
}

/*Chiamata per accessori*/

function showAccessories(req, res) {
  const sql = `
    SELECT p.id AS product_id, p.name AS product_name, p.*, c.id AS category_id, c.name AS category_name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Accessori';
`;

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });

    // res.json(results);
    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    res.json(products); // Invia la risposta JSON con i prodotti modificati
  });
}

/*Chiamata per prodotti in offerta*/

function showDiscountedProducts(req, res) {
  const sql = `
    SELECT *
    FROM products
    WHERE discounted_price < price;`;

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });

    // res.json(results);
    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    res.json(products); // Invia la risposta JSON con i prodotti modificati
  });
}

/*Chiamata per prodotti per cani*/

function showDogsProducts(req, res) {
  const sql = `
    SELECT * 
    FROM products p
    WHERE p.animals = 'cani';`;

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });

    // res.json(results);
    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    res.json(products); // Invia la risposta JSON con i prodotti modificati
  });
}

/*Chiamata per prodotti per gatti*/

function showCatsProducts(req, res) {
  const sql = `
    SELECT * 
    FROM products p
    WHERE p.animals = 'gatti';`;

  connection.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({
        error: "Errore lato server INDEX function",
      });

    // res.json(results);
    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    res.json(products); // Invia la risposta JSON con i prodotti modificati
  });
}

// Funzione di ricerca che gestisce le richieste GET per cercare prodotti per nome
function search(req, res) {
  const searchPar = req.params.term; // Estrazione del parametro  di ricerca dai parametri dell'URL // .term è il dato a cui ci stiamo riferendo dalla router

  if (!searchPar || searchPar.trim().length === 0) {
    // .trim() rimuove gli spazi bianchi all'inizio e alla fine della stringa
    return res.status(400).json({
      error: "Il parametro di ricerca non può essere vuoto",
    });
  }

  if (searchPar.length > 50) {
    // Limitazione della lunghezza del parametro di ricerca
    return res.status(400).json({
      error: "Il parametro di ricerca è troppo lungo (massimo 50 caratteri)",
    });
  }

  const sql = `SELECT * FROM products WHERE CONCAT(name, ' ', description) LIKE ? LIMIT 100`;
  // %searchTerm% è un pattern di ricerca che permette di trovare tutte le parole che contengono il termine di ricerca
  const searchPattern = `%${searchPar}%`;

  connection.query(sql, [searchPattern], (err, results) => {
    // errore generico
    if (err) {
      console.error("Errore database:", err);
      return res.status(500).json({
        error: "Errore durante la ricerca dei prodotti",
      });
    }
    // errore prodotto non trovato
    if (results.length === 0) {
      return res.json({
        message: "Nessun prodotto trovato",
        data: [],
      });
    }
    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    // res.json(products); // Invia la risposta JSON con i prodotti modificati

    // risposta
    res.json(products);
  });
}

function show(req, res) {
  const { slug } = req.params; // Destruttura slug dai parametri della richiesta

  const showSql = "SELECT * FROM products WHERE slug = ?"; // Query SQL per selezionare il prodotto con lo slug specificato
  connection.query(showSql, [slug], (err, results) => {
    // Esegui la query SQL
    if (err) {
      console.error("Errore database:", err); // Logga l'errore se c'è un problema con il database
      return res.status(500).json({
        // Restituisci un errore 500 se c'è un problema con il server
        error: "Errore durante la ricerca del prodotto",
      });
    }
    if (results.length === 0) {
      // Se non ci sono risultati
      return res.status(404).json({
        // Restituisci un errore 404
        error: "Prodotto non trovato",
      });
    }
    // res.json(results[0]); // Restituisci il primo risultato come JSON visto che sarà sempre univoco utilizzando lo slug
    const products = results.map((product) => {
      return {
        ...product,
        image_url: req.imagePath + product.image_url, // Aggiungi il prefisso dell'URL all'immagine
      };
    });

    res.json(products[0]); // Invia la risposta JSON con i prodotti modificati
  });
}

async function storeOrder(req, res) {
  const {
    name,
    email,
    shippingAddress,
    billingAddress,
    cartItems,
    discountCode,
    shippingCost,
    lastName,
    country,
    state,
    city,
    zipCode,
  } = req.body;

  try {
    // 1. Validazione preliminare

    if (!cartItems || cartItems.length === 0) {
      console.log("ERRORE: Il carrello è vuoto");
      return res.status(400).json({ error: "Il carrello è vuoto" });
    }

    // 2. Recupero prezzi dal database
    const productIds = cartItems.map((item) => item.id);

    const [products] = await connection
      .promise()
      .query(
        "SELECT id, price, discounted_price, name FROM products WHERE id IN (?)",
        [productIds]
      );

    // 3. Verifica corrispondenza prodotti
    if (products.length !== cartItems.length) {
      console.log("ERRORE: Alcuni prodotti nel carrello non esistono");
      return res
        .status(400)
        .json({ error: "Alcuni prodotti nel carrello non esistono" });
    }

    // 4. Calcolo subtotale
    const productPriceMap = {};
    let subtotal = 0;

    products.forEach((product) => {
      // Usa il prezzo scontato se presente e minore del prezzo normale
      const effectivePrice =
        product.discounted_price && product.discounted_price < product.price
          ? product.discounted_price
          : product.price;
      productPriceMap[product.id] = effectivePrice;
      const cartItem = cartItems.find((item) => item.id === product.id);
      subtotal += effectivePrice * cartItem.quantity;
    });

    // 5. Gestione codice sconto
    let discountCodeId = null;
    let discountValue = 0;

    if (discountCode) {
      console.log("Codice sconto fornito:", discountCode);

      const [discountResults] = await connection
        .promise()
        .query(
          "SELECT id, discount FROM discount_codes WHERE code = ? AND CURDATE() BETWEEN start_date AND end_date",
          [discountCode]
        );
      console.log("Risultati ricerca codice sconto:", discountResults);

      if (discountResults.length > 0) {
        discountCodeId = discountResults[0].id;
        discountValue = discountResults[0].discount;
        console.log(
          `Codice sconto valido! ID: ${discountCodeId}, Valore: ${discountValue}€`
        );
      } else {
        console.log("ERRORE: Codice sconto non valido o scaduto");
        return res
          .status(400)
          .json({ error: "Codice sconto non valido o scaduto" });
      }
    } else {
      console.log("Nessun codice sconto fornito");
    }

    // 6. Calcolo spedizione (gratis per ordini >= 20€)

    const calculatedShippingCost =
      subtotal >= 20 ? 0 : parseFloat(shippingCost || 0);

    // Assicuriamoci che discountValue sia un numero prima di usarlo

    const discountAmount = parseFloat(discountValue || 0);

    const totalAmount = subtotal - discountAmount + calculatedShippingCost;

    const [orderResult] = await connection
      .promise()
      .query(
        "INSERT INTO orders (name, email, shipping_address, billing_address, discount_code_id, shipping_cost, last_name, country, state, city, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          email,
          shippingAddress,
          billingAddress,
          discountCodeId,
          calculatedShippingCost,
          lastName,
          country,
          state,
          city,
          zipCode,
        ]
      );

    const orderId = orderResult.insertId;

    // 8. Salvataggio dettagli ordine

    const orderDetailsPromises = cartItems.map((item) => {
      console.log(
        `Salvataggio dettaglio: Prodotto ID ${item.id}, Nome: ${
          item.name
        }, Quantità: ${item.quantity}, Prezzo: ${productPriceMap[item.id]}€`
      );
      return connection
        .promise()
        .query(
          "INSERT INTO order_details (order_id, product_id, quantity, price, name) VALUES (?, ?, ?, ?, ?)",
          [orderId, item.id, item.quantity, productPriceMap[item.id], item.name]
        );
    });

    await Promise.all(orderDetailsPromises);
    console.log("Dettagli ordine salvati con successo!");

    // 9. Preparazione dati per email
    const orderDetails = {
      orderId,

      name,

      lastName,

      email,

      shippingAddress,

      billingAddress,

      city,

      state,

      zipCode,

      country,

      cartItems: cartItems.map((item) => ({
        ...item,

        price: productPriceMap[item.id],

        total: productPriceMap[item.id] * item.quantity,

        originalPrice: products.find((p) => p.id === item.id).price,
      })),

      shippingCost: calculatedShippingCost,

      shippingFree: subtotal >= 20,

      discount: discountCodeId
        ? {
            code: discountCode,

            value: discountValue, // Valore fisso in euro

            amount: discountAmount,
          }
        : null,

      orderDate: new Date(),

      subtotal,

      discountAmount,

      totalAmount,

      paymentMethod: req.body.paymentMethod || "Non specificato",
    };
    // 10. Invio email di conferma

    await sendOrderConfirmationEmail(email, orderDetails);
    console.log("Email inviata con successo!");
    console.log("=== PROCESSO ORDINE COMPLETATO CON SUCCESSO ===");
    res.status(201).json({
      success: true,

      orderId,

      subtotal: parseFloat(subtotal).toFixed(2),

      discount: parseFloat(discountAmount).toFixed(2),

      shippingCost: parseFloat(calculatedShippingCost).toFixed(2),

      totalAmount: parseFloat(totalAmount).toFixed(2),

      shippingFree: subtotal >= 20,

      message:
        subtotal >= 20
          ? "Congratulazioni! Hai ottenuto la spedizione gratuita"
          : "Ordine creato con successo",
    });
  } catch (error) {
    console.log("=== ERRORE DURANTE IL PROCESSO ORDINE ===");
    console.error("Errore durante la creazione dell'ordine:", error);
    console.error("Stack trace:", error.stack);

    // Gestione errori specifici
    let status = 500;
    let errorMessage = "Errore durante la creazione dell'ordine";

    if (error.code === "ER_DUP_ENTRY") {
      status = 400;
      errorMessage = "Ordine già esistente";
      console.log("Tipo errore: Duplicazione entry");
    } else if (error.code === "ER_NO_REFERENCED_ROW_2") {
      status = 400;
      errorMessage = "Riferimento a dato inesistente";
      console.log("Tipo errore: Riferimento inesistente");
    }

    console.log(
      `Risposta errore: Status ${status}, Messaggio: ${errorMessage}`
    );
    res.status(status).json({
      success: false,

      error: errorMessage,

      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

const validateDiscountCode = (req, res) => {
  const { discountCode } = req.body;
  //NOTE - errore generico Bad Request appare in console quando non viene passato il codice sconto

  if (!discountCode) {
    return res.status(400).json({ error: "Inserisci il codice sconto" });
  }

  const sql =
    "SELECT * FROM discount_codes WHERE code = ? AND CURDATE() BETWEEN start_date AND end_date";

  connection.query(sql, [discountCode], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Errore interno del server" });
    }
    //NOTE - status 200 e valid true se il codice sconto è valido non restituisce nessuna informazione in console

    if (results.length > 0) {
      res.status(200).json({
        valid: true,
        message: "Codice sconto valido!",
        discount: results[0], // Invia anche i dettagli dello sconto (valore in euro)
      });
    } else {
      //NOTE - status 404 e valid false se il codice sconto non è valido o scaduto
      // In questo caso, non restituiamo alcun messaggio specifico per evitare di rivelare informazioni sui codici sconto

      res.status(404).json({
        valid: false,
        message: "Codice sconto non valido o scaduto",
      });
    }
  });
};

export {
  index,
  showDogsFood,
  showDogsGames,
  showCatsFood,
  showCatsGames,
  showAccessories,
  showDiscountedProducts,
  showDogsProducts,
  showCatsProducts,
  search,
  show,
  storeOrder,
  validateDiscountCode,
};
