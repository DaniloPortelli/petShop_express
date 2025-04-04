import connection from '../data/db.js';
import { sendOrderConfirmationEmail } from '../services/mailtrap.service.js';

function index(req, res) {
    const indexSql = 'SELECT * FROM products';

    connection.query(indexSql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: 'Errore lato server INDEX function',
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
                error: 'Errore lato server INDEX function',
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
                error: 'Errore lato server INDEX function',
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
                error: 'Errore lato server INDEX function',
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
                error: 'Errore lato server INDEX function',
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
                error: 'Errore lato server INDEX function',
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
                error: 'Errore lato server INDEX function',
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
                error: 'Errore lato server INDEX function',
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
                error: 'Errore lato server INDEX function',
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

    if (!searchPar || searchPar.trim().length === 0) {// .trim() rimuove gli spazi bianchi all'inizio e alla fine della stringa
        return res.status(400).json({
            error: 'Il parametro di ricerca non può essere vuoto'
        });
    }


    if (searchPar.length > 50) { // Limitazione della lunghezza del parametro di ricerca
        return res.status(400).json({
            error: 'Il parametro di ricerca è troppo lungo (massimo 50 caratteri)'
        });
    }

    const sql = `SELECT * FROM products WHERE CONCAT(name, ' ', description) LIKE ? LIMIT 100`
    // %searchTerm% è un pattern di ricerca che permette di trovare tutte le parole che contengono il termine di ricerca
    const searchPattern = `%${searchPar}%`;

    connection.query(sql, [searchPattern], (err, results) => {
        // errore generico
        if (err) {
            console.error('Errore database:', err);
            return res.status(500).json({
                error: 'Errore durante la ricerca dei prodotti'
            });
        }
        // errore prodotto non trovato
        if (results.length === 0) {
            return res.json({
                message: 'Nessun prodotto trovato',
                data: []
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

    const showSql = 'SELECT * FROM products WHERE slug = ?'; // Query SQL per selezionare il prodotto con lo slug specificato
    connection.query(showSql, [slug], (err, results) => { // Esegui la query SQL
        if (err) {
            console.error('Errore database:', err); // Logga l'errore se c'è un problema con il database
            return res.status(500).json({ // Restituisci un errore 500 se c'è un problema con il server
                error: 'Errore durante la ricerca del prodotto'
            });
        }
        if (results.length === 0) { // Se non ci sono risultati
            return res.status(404).json({ // Restituisci un errore 404
                error: 'Prodotto non trovato'
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
    })
}



function storeOrder(req, res) {
    const {
        name,
        email,
        shippingAddress,
        billingAddress,
        cartItems,
        discountCodeId,
        shippingCost,
        lastName, 
        country, 
        state, 
        city, 
        zipCode, 
    } = req.body;

    // Inserisci l'ordine nella tabella 'orders'
    connection.query(
        'INSERT INTO orders (name, email, shipping_address, billing_address, discount_code_id, shipping_cost, last_name, country, state, city, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, email, shippingAddress, billingAddress, discountCodeId, shippingCost, lastName, country, state, city, zipCode],
        async (err, orderResult) => {
            if (err) {
                res.status(500).json({ error: 'Errore durante la creazione dell\'ordine' });
                return;
            }
            const orderId = orderResult.insertId;

            // Inserisci i dettagli dell'ordine nella tabella 'order_details'
            cartItems.forEach((item) => {
                connection.query(
                    'INSERT INTO order_details (order_id, product_id, quantity, price, name) VALUES (?, ?, ?, ?, ?)',
                    [orderId, item.id, item.quantity, item.price, item.name]
                );
            });
            // Prepara i dettagli dell'ordine per l'email
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
                cartItems,
                shippingCost,
                discountCodeId,
                orderDate: new Date(),
                totalAmount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0) + shippingCost
            };
            try {
                // Invia l'email di conferma
                await sendOrderConfirmationEmail(email, orderDetails);
                res.status(201).json({ message: 'Ordine creato con successo e email di conferma inviata' });
            } catch (emailError) {
                console.error('Errore nell\'invio dell\'email:', emailError);
                res.status(201).json({ 
                    message: 'Ordine creato con successo, ma si è verificato un errore nell\'invio dell\'email di conferma'
                });
            }
        }
    );
}


export { index, showDogsFood, showDogsGames, showCatsFood, showCatsGames, showAccessories, showDiscountedProducts, showDogsProducts, showCatsProducts, search, show, storeOrder };

