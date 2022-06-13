//=========================================
// Import dependencies
//=========================================
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const bankAccRouter = require('./controllers/bankaccc');
const notesRouter = require('./controllers/notes');
const userRouter = require('./controllers/users');
const session = require('express-session');
const Mogostore = require('connect-mongo')
const rowdy = require('rowdy-logger');
const MongoStore = require('connect-mongo');

//=========================================
// Create Express App Obj Bind Liquid Templating Engine
//=========================================
const app = require('liquid-express-views')(express(), {root: [path.resolve(__dirname, 'views')]});
const routesReport = rowdy.begin(app);

//=========================================
// Middleware
//=========================================
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false
}))

//=========================================
// Routes
//=========================================
// app.use('/bankAcc', bankAccRouter);
// app.use('/notes', notesRouter);
// app.use('/user', userRouter);

app.get('/', (req, res) => {
    // res.send('I will be the front index page later')
    res.render('index');
})

//=========================================
// Server listener
//=========================================
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
    routesReport.print();
})