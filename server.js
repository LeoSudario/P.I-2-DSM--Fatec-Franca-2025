const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change this to your MySQL username
  password: '11111', // Change this to your MySQL password
  database: 'user_auth' // The name of your database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

// Signup Route
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists!' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into database
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.query(query, [username, hashedPassword], (err, result) => {
        if (err) throw err;

        res.status(201).json({ message: 'Signup successful!' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        return res.status(400).json({ message: 'No user found with that username!' });
      }

      const user = results[0];

      // Compare password with hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password!' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

      res.status(200).json({ message: 'Login successful!', token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to protect routes
const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized' });
  }
};

// Protected Route Example
app.get('/api/protected', protect, (req, res) => {
  res.status(200).json({ message: 'You are authorized!', user: req.user });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

Login = () => {
    document.getElementById('loginForm').onsubmit = async function(e) {  
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;
  
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Login successful!');
          localStorage.setItem('token', data.token);  // Save JWT token
          window.location.href = 'index.html'; 
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred.');
      }
    };
  };
  