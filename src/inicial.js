const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodoverride = require('method-override');
const session= require('express-session');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('hbs');
const flash = require('connect-flash');

// Initializations

const inicial = express();
require('./database');

// Settings

inicial.set('port', process.env.PORT || 27017);
inicial.set('views', path.join(__dirname, 'views'));
inicial.engine('.hbs', exphbs.engine({    
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: path.join(inicial.get('views'), 'layouts'),
    partialsDir: path.join(inicial.get('views'), 'partials'),
    extname: '.hbs', 
}));

inicial.set('view engine', '.hbs');

// Middlewares

inicial.use(express.urlencoded({ extended: false }));
inicial.use(methodoverride('_method'));
inicial.use(session({
    secret: 'mysecretapp',
    resave: 'true',
    saveUninitialized: 'true',
}));
inicial.use(flash());

// Global Variables

inicial.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

//Routes

inicial.use(require('./routes/index'));
inicial.use('/cienciaficcion', require('./routes/books/cienciaficcionbooks'));
inicial.use('/biografia', require('./routes/books/biografiabooks'));
inicial.use('/drama', require('./routes/books/dramabooks'));
inicial.use('/historia', require('./routes/books/historiabooks'));
inicial.use('/infantil', require('./routes/books/infantilbooks'));
inicial.use('/juvenil', require('./routes/books/juvenilbooks'));
inicial.use('/misterio', require('./routes/books/misteriobooks'));
inicial.use('/poesia', require('./routes/books/poesiabooks'));
inicial.use('/romance', require('./routes/books/romancebooks'));
inicial.use('/terror', require('./routes/books/terrorbooks'));
inicial.use(require('./routes/categories'));


// Static Files

inicial.use(express.static(path.join(__dirname, 'public')));

// Server Is Listening


inicial.listen(inicial.get('port'), () => { console.log(`servidor en puerto ${inicial.get('port')}`) });
