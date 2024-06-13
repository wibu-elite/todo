const {response} = require('express');
const pool = require('../connection/dbConnection');

// Method Get ALL
exports.authenticate = async(req, res) => {
    const { username, password } = req.body;

    try {
        const userResult = await pool.query(`SELECT * FROM "user" WHERE username = $1`, [username]);
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = userResult.rows[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        req.session.user = { id: user.id, username: user.username };
        res.json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
