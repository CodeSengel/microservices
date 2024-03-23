const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv'); // Importez dotenv
dotenv.config(); // Chargez les variables d'environnement à partir du fichier .env

// Middleware pour activer CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Montez les routes des tâches
app.use('/', authRoutes);


// Route de test
app.get('/', (req, res) => {
  res.send('authservice !');
});
console.log('voici le port recupere', process.env.AUTHSERVICE_PORT)
// Démarrez le serveur
const PORT = process.env.AUTHSERVICE_PORT;
app.listen(PORT, () => {
  console.log(`Gateway démarrée sur le port ${PORT} et on laisse passer ${process.env.FRONTEND_URL}`);
});
