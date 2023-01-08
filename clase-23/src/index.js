import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

// Cookies
const claveSecreta = 'miClaveSecreta';

app.use(cookieParser(claveSecreta));
app.use(express.json());

// Seteo de cookie antes de responder al cliente
app.get('/set-normal-cookie', (req, res) => {
  res.cookie('idioma', 'ingles').json({ msg: 'ok' });
});

// Seteo de cookie firmada antes de responder al cliente
app.get('/set-signed-cookie', (req, res) => {
  res.cookie('nombre', 'Aldo', { signed: true }).json({ msg: 'ok' });
});

// Seteo de cookie con tiempo de expiración
app.get('/set-expiration-cookie', (req, res) => {
  res.cookie('equipo', 'boca-juniors', { maxAge: 60000 }).json({ msg: 'ok' });
});

// Accedo a las cookies almacenadas
app.get('/get-cookies', (req, res) => {
  res.json({
    cookies: req.cookies,
    signedCookies: req.signedCookies.lugar,
  });
});

// Ejemplo de uso de las cookies
app.get('/saludar', (req, res) => {
  const message = req.cookies.idioma == 'ingles' ? 'Hello!!' : 'Hola amigos';
  res.json({
    msg: message,
  });
});

// Limpieza de cookies
app.get('/limpiar', (req, res) => {
  const cookies = req.cookies;
  const signedCookies = req.signedCookies;

  const keys = Object.keys(cookies);
  const signedKeys = Object.keys(signedCookies);

  // Elimina todas las cookies sin firmar
  keys.forEach((key) => {
    res.clearCookie(key);
  });

  // Elimina todas las cookies firmadas
  signedKeys.forEach((key) => {
    res.clearCookie(key, { signed: true });
  });

  res.json({
    msg: 'Las cookies han sido eliminadas',
  });
});

// Manejo de sesiones
// Configuración de objeto de sesión con clave secreta
app.use(
  session({
    secret: 'MySecret',
    cookie: { maxAge: 60000 },
    saveUninitialized: true,
    resave: false,
  })
);

const users = [
  {
    username: 'aldocape',
    password: '123456',
    admin: true,
  },
  {
    username: 'pepito',
    password: '1234',
    admin: false,
  },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const index = users.findIndex(
    (usuario) => usuario.username === username && usuario.password === password
  );

  if (index < 0) {
    res.status(401).json({
      msg: 'No estas autorizado',
    });
  } else {
    const user = users[index];
    req.session.info = {
      loggedIn: true,
      counter: 1,
      admin: user.admin,
    };
    res.json({
      msg: 'Bienvenido',
    });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({
    msg: 'Session destroyed',
  });
});

const validateLogin = (req, res, next) => {
  if (req.session.info && req.session.info.loggedIn) next();
  else res.status(401).json({ msg: 'No estás autorizado' });
};

const isAdmin = (req, res, next) => {
  if (req.session.info && req.session.info.loggedIn && req.session.info.admin)
    next();
  else res.status(401).json({ msg: 'No estás autorizado' });
};

app.get('/secret-endpoint', validateLogin, (req, res) => {
  req.session.info.counter++;
  res.json({
    msg: 'Información ultra secreta',
    counter: req.session.info.counter,
    session: req.session,
  });
});

app.get('/admin-secret-endpoint', validateLogin, isAdmin, (req, res) => {
  req.session.info.counter++;
  res.json({
    msg: 'Información ultra secreta',
    counter: req.session.info.counter,
    session: req.session,
  });
});

app.get('/', (req, res) => {
  res.json({
    msg: 'ok',
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
