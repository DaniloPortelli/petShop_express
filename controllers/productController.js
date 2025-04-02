import connection from '../data/db.js';


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
    SELECT p.id, p.*, c.id AS category_id, c.name 
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
    SELECT p.id AS product_id, p.*, c.id AS category_id, c.name 
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
    SELECT p.id AS product_id, p.*, c.id AS category_id, c.name 
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
    SELECT p.id AS product_id, p.*, c.id AS category_id, c.name 
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
    SELECT p.id AS product_id, p.*, c.id AS category_id, c.name
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Accessori';`;

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

    const sql = 'SELECT * FROM products WHERE name or description or category LIKE ? LIMIT 100';
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
export { index, showDogsFood, showDogsGames, showCatsFood, showCatsGames, showAccessories, showDiscountedProducts, showDogsProducts, showCatsProducts, search, show };

