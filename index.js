const express = require('express')
const methodOverride = require('method-override')
const ejsLayouts = require('express-ejs-layouts')
const db = require('./models')

const app = express()

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname+'/static'))
app.use(methodOverride('_method'))

// WRITE YOUR ROUTES HERE /////////////

// display all widgets
app.get('/', (req,res) => {
    db.widget.findAll()
    .then( widgets => {
        console.log('here are widgets:', widgets)
        res.render('index', {widgets})
    })
    .catch( error => {
        console.error
    })
})

// delete a widget
app.delete('/:id', (req,res) => {
    db.widget.destroy({where: {id: req.params.id}})
    .then( deletedWidget => {
        res.redirect('/')
    })
    .catch( error => {
        console.error
    })
})

// add a widget
app.post('/', (req,res) => {
    db.widget.create({
        description: req.body.description,
        quantity: req.body.quantity
    })
    .then(widget => {
        res.redirect('/')
    })
    .catch(error => {
        console.error
    })
})


// YOUR ROUTES ABOVE THIS COMMENT /////

app.listen(3000)