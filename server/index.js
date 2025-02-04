const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Permitir cookies desde el frontend

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia por tu usuario de MySQL
  password: '', // Cambia por tu contraseña de MySQL
  database: 'auth_app', // Cambia por el nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});

// Ruta de login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user[0].id }, 'secreto', { expiresIn: '1h' });

    // Enviar el token en una cookie
    res.cookie('token', token, {
      httpOnly: true, // La cookie solo es accesible desde el servidor
      secure: process.env.NODE_ENV === 'production', // Solo enviar cookies en HTTPS en producción
      sameSite: 'strict', // Prevenir ataques CSRF
      maxAge: 3600000, // Tiempo de expiración de la cookie (1 hora)
    });

    // Devolver una respuesta exitosa
    res.json({ message: 'Login exitoso', usuario: user[0].usuario });
  } catch (err) {
    console.error('Error en el login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta de logout
app.post('/api/logout', (req, res) => {
  // Eliminar la cookie
  res.clearCookie('token');
  res.json({ message: 'Logout exitoso' });
});

// Ruta de Check-Auth
app.get('/api/check-auth', (req, res) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.json({ isAuthenticated: false });
    }
  
    // Verificar el token
    jwt.verify(token, 'secreto', (err, decoded) => {
      if (err) {
        return res.json({ isAuthenticated: false });
      }
      res.json({ isAuthenticated: true, usuario: decoded });
    });
  });

// Ruta de Registro  
app.post('/api/register', async (req, res) => {
    const { usuario, email, password } = req.body;
  
    // Validar que todos los campos estén presentes
    if (!usuario || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
  
    try {
      // Verificar si el usuario ya existe
      const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
      if (user.length > 0) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
  
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insertar el nuevo usuario en la base de datos
      await db.promise().query(
        'INSERT INTO users (usuario, email, password) VALUES (?, ?, ?)',
        [usuario, email, hashedPassword]
      );
  
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
      console.error('Error en el registro:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});