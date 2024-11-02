require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Handlebars
app.engine('hbs', engine({ // Cambia aquí
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    defaultLayout: 'main',
    extname: 'hbs',
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Carpeta pública para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Ruta de inicio
app.get('/', (req, res) => res.render('pages/home'));

app.get('/about', (req, res) => res.render('pages/about'));

app.get('/skills', (req, res) => res.render('pages/skills'));

app.get('/contact', (req, res) => res.render('pages/contact'));

app.get('/projects', (req, res) => res.render('pages/projects'));

//rutas de proyectos individuales
app.get('/projects/mini-piano', (req, res) => res.render('projects/mini-piano'));
app.get('/projects/encuesta-estudiantes', (req, res) => res.render('projects/encuesta-estudiantes'));
app.get('/projects/desarrollo-humano', (req, res) => res.render('projects/desarrollo-humano'));


//ruta para recibir el formulario de contacto
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Mensaje de ${name} <${email}>: ${message}`);
    res.send('¡Tu mensaje ha sido enviado! Nos pondremos en contacto contigo pronto.');
});


// Servidor escuchando
app.listen(PORT, () => console.log(`Servidor iniciado en http://localhost:${PORT}`));
