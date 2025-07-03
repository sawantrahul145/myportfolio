const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// GET login
router.get('/login', (req, res) => {
  res.render('login');
});

// POST login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) throw err;
    if (results.length && await bcrypt.compare(password, results[0].password)) {
      req.session.user = results[0];
      res.redirect('/');
    } else {
      res.redirect('Invalid credentials');
    }
  });
});

// GET register
router.get('/register', (req, res) => {
  res.render('register');
});

// POST register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users SET ?', { name, email, password: hashedPassword }, (err) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.send('User already exists');
      throw err;
    }
    res.redirect('/login');
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
