const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');

const equiposRouter = require('./equipos');

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

// Configuración de Multer para subir archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
  },
});

// Sirve los archivos estáticos de la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const upload = multer({ storage });




// Usar las rutas de equipos
app.use('/api/equipos', equiposRouter);

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
    const token = jwt.sign({ id: user[0].id, rol: user[0].rol }, 'secreto', { expiresIn: '1h' });

    // Enviar el token en una cookie
    res.cookie('token', token, {
      httpOnly: true, // La cookie solo es accesible desde el servidor
      secure: process.env.NODE_ENV === 'production', // Solo enviar cookies en HTTPS en producción
      sameSite: 'strict', // Prevenir ataques CSRF
      maxAge: 3600000, // Tiempo de expiración de la cookie (1 hora)
    });

    // Devolver una respuesta exitosa
    res.json({ message: 'Login exitoso',  user: user[0] });
  } catch (err) {
    console.error('Error en el login:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para actualizar el perfil
app.put('/api/perfil/:id', upload.single('foto_perfil'), async (req, res) => {
  const userId = req.params.id;
  const { nombre_completo, ciudad, bio } = req.body;
  const foto_perfil = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Obtener el perfil actual del usuario
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    const updatedNombreCompleto = nombre_completo || user[0].nombre_completo;
    const updatedCiudad = ciudad || user[0].ciudad;
    const updatedBio = bio || user[0].bio;
    const updatedFotoPerfil = foto_perfil || user[0].foto_perfil;

    await db.promise().query(
      'UPDATE users SET nombre_completo = ?, ciudad = ?, bio = ?, foto_perfil = ? WHERE id = ?',
      [updatedNombreCompleto, updatedCiudad, updatedBio, updatedFotoPerfil, userId]
    );

    res.json({ message: 'Perfil actualizado exitosamente', foto_perfil: updatedFotoPerfil });
  } catch (err) {
    console.error('Error actualizando el perfil:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta Eliminar Cuenta

app.delete('/api/perfil/:id', async (req, res) => {
  const userId = req.params.id;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    // Verificar el token y obtener el ID del usuario logueado
    const decoded = jwt.verify(token, 'secreto');
    if (decoded.id !== parseInt(userId)) {
      return res.status(403).json({ error: 'No tienes permisos para eliminar esta cuenta' });
    }

    // Eliminar la cuenta del usuario
    await db.promise().query('DELETE FROM users WHERE id = ?', [userId]);

    // Eliminar la cookie de autenticación
    res.clearCookie('token');

    res.json({ message: 'Cuenta eliminada exitosamente' });
  } catch (err) {
    console.error('Error eliminando la cuenta:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta de logout
app.post('/api/logout', (req, res) => {
  // Eliminar la cookie
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Solo en producción
    sameSite: 'strict',
  });
  res.json({ message: 'Logout exitoso' });
});

// Ruta de Check-Auth
app.get('/api/check-auth', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  jwt.verify(token, 'secreto', (err, decoded) => {
    if (err) {
      return res.json({ isAuthenticated: false });
    }

    // Obtener el usuario de la base de datos
    db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
      if (err || results.length === 0) {
        return res.json({ isAuthenticated: false });
      }

      const user = results[0];
      res.json({ isAuthenticated: true, user }); // Devuelve el usuario con su ID
    });
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
        'INSERT INTO users (usuario, email, password, nombre_completo, ciudad, bio) VALUES (?, ?, ?, ?, ?, ?)',
        [usuario, email, hashedPassword, '', '', '']
      );
  
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (err) {
      console.error('Error en el registro:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  //Middleware para verificar token JWT
const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Obtener el token de las cookies

  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado: Token no proporcionado' });
  }

  jwt.verify(token, 'secreto', (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err); // Log para depuración
      return res.status(401).json({ mensaje: 'No autorizado: Token inválido' });
    }

    // Adjuntar el ID y el rol del usuario al objeto req
    req.userId = decoded.id;
    req.userRole = decoded.rol; // Asegúrate de que el token incluya el rol
    next();
  });
};

// Obtener Perfil

app.get('/api/perfil/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    // Obtener la información del usuario
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Devolver la información del perfil
    res.json({
      usuario: user[0].usuario,
      email: user[0].email,
      nombre_completo: user[0].nombre_completo,
      ciudad: user[0].ciudad,
      bio: user[0].bio,
      foto_perfil: user[0].foto_perfil,
    });
  } catch (err) {
    console.error('Error obteniendo el perfil:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para obtener la lista de usuarios
app.get('/api/usuarios', async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    // Verificar el token y obtener el ID del usuario logueado
    const decoded = jwt.verify(token, 'secreto');

    // Verificar si el usuario es administrador
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [decoded.id]);
    if (user.length === 0 || user[0].rol !== 9) {
      return res.status(403).json({ error: 'No tienes permisos para acceder a esta ruta' });
    }

    // Obtener todos los usuarios
    const [usuarios] = await db.promise().query('SELECT id, usuario, email, rol, nombre_completo, ciudad, foto_perfil FROM users');
    res.json(usuarios);
  } catch (err) {
    console.error('Error obteniendo los usuarios:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.get('/api/usuarios/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user[0]);
  } catch (err) {
    console.error('Error obteniendo el usuario:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
app.put('/api/usuarios/:id', async (req, res) => {
  const userId = req.params.id;
  const { usuario, email, password, rol, nombre_completo, ciudad } = req.body;

  try {
    // Verificar si el usuario existe
    const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar los datos del usuario
    await db.promise().query(
      'UPDATE users SET usuario = ?, email = ?, password = ?, rol = ?, nombre_completo = ?, ciudad = ? WHERE id = ?',
      [usuario, email, password, rol, nombre_completo, ciudad, userId]
    );

    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (err) {
    console.error('Error actualizando el usuario:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.delete('/api/usuarios/:id', verifyToken, async (req, res) => {
  const userId = req.params.id; // ID del usuario que se va a eliminar
  const loggedInUserId = req.userId; // ID del usuario logueado
  const loggedInUserRole = req.userRole; // Rol del usuario logueado

  // Verificar si el usuario logueado es un administrador
  if (loggedInUserRole !== 9 && loggedInUserId !== parseInt(userId)) {
    return res.status(403).json({ error: 'No tienes permisos para eliminar esta cuenta' });
  }

  try {
    // Eliminar la cuenta del usuario
    await db.promise().query('DELETE FROM users WHERE id = ?', [userId]);

    // Si el usuario eliminado es el mismo que está logueado, cerrar sesión
    if (loggedInUserId === parseInt(userId)) {
      res.clearCookie('token'); // Eliminar la cookie de autenticación
    }

    res.json({ message: 'Cuenta eliminada exitosamente' });
  } catch (err) {
    console.error('Error eliminando la cuenta:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


// Ruta para cambiar la contraseña
app.post('/api/cambiar-clave', verifyToken, async (req, res) => {
  const { nuevaClave } = req.body;
  const userId = req.userId;

  if (!nuevaClave) {
    return res.status(400).json({ mensaje: 'La nueva contraseña es requerida' });
  }

  try {
    const hashedPassword = await bcrypt.hash(nuevaClave, 10);

    // Actualizar la contraseña en la base de datos
    await db.promise().query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

    res.json({ mensaje: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});