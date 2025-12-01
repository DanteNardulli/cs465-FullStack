// server.js
require('dotenv').config(); // load .env variables
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const { connectDB } = require('./app_server/config/db');
const travelerRoutes = require('./app_server/routes/travelerRoutes');
const apiRouter = require('./app_api/routes/index');


const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/travlr';

// Handlebars setup
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'app_server', 'views', 'partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Register routes
app.use('/', travelerRoutes);

//API Routes
app.use('/api', apiRouter);


// Connect to MongoDB and start server
(async () => {
    try {
        await connectDB(MONGO_URI); // connect to database
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
})();
