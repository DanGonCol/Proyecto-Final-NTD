require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Inicializar Express
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Conectar a MongoDB Atlas
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado exitosamente a MongoDB Atlas'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Definir rutas
const estudianteRoutes = require('./routes/estudianteRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const tutoriaRoutes = require('./routes/tutoriaRoutes');

app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/tutores', tutorRoutes);
app.use('/api/tutorias', tutoriaRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

module.exports = app;
