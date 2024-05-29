// routes/poesia.js

const express = require('express');
const router = express.Router();
const Ciencia_FiccionBook = require('../../models/Poesia');

// Ruta para crear un nuevo libro
router.get('/new', (req, res) => {
    res.render('books/new-books', { categoria: 'poesia' });
});

// Ruta para guardar un nuevo libro
router.post('/new-book', async (req, res) => {
    const { nombre, sinopsis, autor, paginas, año, editorial, cantidad } = req.body;
    const errors = [];
    if (!nombre || !sinopsis || !autor || !paginas || !año || !editorial || !cantidad) {
        errors.push({ text: 'Por favor, rellene correctamente todos los campos' });
    }

    if (errors.length > 0) {
        res.render('books/new-books', {
            errors,
            nombre,
            sinopsis,
            autor,
            paginas,
            año,
            editorial,
            cantidad,
            categoria: 'poesia'
        });
    } else {
        const newBook = new Ciencia_FiccionBook({
            Nombre_Libro: nombre,
            Sinopsis: sinopsis,
            Autor: autor,
            Paginas: paginas,
            Año: año,
            Editorial: editorial,
            Cantidad: cantidad
        });
        await newBook.save();
        req.flash('success_msg', 'Libro de Ciencia Ficción agregado correctamente');
        res.redirect('/poesia');
    }
});

// Ruta para mostrar todos los libros
router.get('/', async (req, res) => {
    const libros = await Ciencia_FiccionBook.find().sort({Nombre_Libro: 1}).lean();
    res.render('books/all-books', { libros, categoria: 'poesia' });
});

// Ruta para editar un libro
router.get('/edit/:id', async (req, res) => {
    const editb = await Ciencia_FiccionBook.findById(req.params.id).lean();
    res.render('books/edit', { editb , categoria:'poesia'});
});

// Ruta para manejar el formulario de edición de libro
router.put('/edit/:id', async (req, res) => {
    const { nombre, sinopsis, autor, paginas, año, editorial, cantidad } = req.body;
    
    try {
        await Ciencia_FiccionBook.findByIdAndUpdate(req.params.id, {
            Nombre_Libro: nombre,
            Sinopsis: sinopsis,
            Autor: autor,
            Paginas: paginas,
            Año: año,
            Editorial: editorial,
            Cantidad: cantidad
        });
        res.redirect("/poesia");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el libro');
    }
});

// Ruta para eliminar un libro
router.delete('/delete/:id', async (req, res) => {
    
    await Ciencia_FiccionBook.findByIdAndDelete(req.params.id);
    res.redirect("/poesia");
});

module.exports = router;
