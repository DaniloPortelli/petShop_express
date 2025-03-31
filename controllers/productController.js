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
export { index, showDogsFood, showDogsGames, showCatsFood, showCatsGames, showAccessories, showDiscountedProducts };