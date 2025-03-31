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

// Funzione di ricerca che gestisce le richieste GET per cercare prodotti per nome
function search (req, res) {
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
    export  {index, search}