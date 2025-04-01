import connection from '../data/db.js';

function index(req, res) {
    const sql = 'SELECT * FROM products';

    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'Errore lato server INDEX function',
            });
        res.json(results);
    });
}


/*Chiamata per cibo per cani*/

function showDogsFood(req, res) {
    const sql = `
    SELECT * 
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Cibo' AND p.animals = 'cani'`;

    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'Errore lato server INDEX function',
            });

        res.json(results);
    });
}

/*Chiamata per giochi per cani*/

function showDogsGames(req, res) {
    const sql = `
    SELECT * 
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Giochi' AND p.animals = 'cani'`;

    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'Errore lato server INDEX function',
            });

        res.json(results);
    });
}

/*Chiamata per cibo per gatti*/

function showCatsFood(req, res) {
    const sql = `
    SELECT * 
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Cibo' AND p.animals = 'gatti'`;

    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'Errore lato server INDEX function',
            });

        res.json(results);
    });
}

/*Chiamata per giochi per gatti*/

function showCatsGames(req, res) {
    const sql = `
    SELECT * 
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Giochi' AND p.animals = 'gatti'`;

    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'Errore lato server INDEX function',
            });

        res.json(results);
    });
}

/*Chiamata per accessori*/

function showAccessories(req, res) {
    const sql = `
    SELECT * 
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE c.name = 'Accessori'`;

    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'Errore lato server INDEX function',
            });

        res.json(results);
    });
}

/*Chiamata per prodotti in offerta*/

function showDiscountedProducts(req, res) {
    const sql = `
    SELECT * 
    FROM products 
    WHERE discounted_price < price`;

    connection.query(sql, (err, results) => {
        if (err)
            return res.status(500).json({
                error: 'Errore lato server INDEX function',
            });

        res.json(results);
    });
}


// Funzione di ricerca che gestisce le richieste GET per cercare prodotti per nome
function search(req, res) {
    // Estrazione del parametro  di ricerca dai parametri dell'URL
    // .term è il dato a cui ci stiamo riferendo dalla router 
    const searchPar = req.params.term;
    // .trim() rimuove gli spazi bianchi all'inizio e alla fine della stringa
    if (!searchPar || searchPar.trim().length === 0) {
        return res.status(400).json({
            error: 'Il parametro di ricerca non può essere vuoto'
        });
    }

    // Limitazione della lunghezza del parametro di ricerca
    if (searchPar.length > 50) {
        return res.status(400).json({
            error: 'Il parametro di ricerca è troppo lungo (massimo 50 caratteri)'
        });
    }

    const sql = 'SELECT * FROM products WHERE name LIKE ? LIMIT 100';
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
        // risposta
        res.json({
            message: `Trovati ${results.length} prodotti`,
            data: results
        });


    })

    
}

function show(req, res) { 
    const {slug} = req.params; // Destruttura slug dai parametri della richiesta

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
        res.json(results[0]); // Restituisci il primo risultato come JSON visto che sarà sempre univoco utilizzando lo slug
    })
}
export { index, showDogsFood, showDogsGames, showCatsFood, showCatsGames, showAccessories, showDiscountedProducts, search, show };

