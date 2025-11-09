const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars setup
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'app_server', 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register routes
const travelerRoutes = require('./app_server/routes/travelerRoutes');
app.use('/', travelerRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
