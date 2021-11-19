const express = require('express');
const { projects } = require('./data.json');
const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) =>{
    res.render('index', projects);
})

// error test route
//
// app.get('/error', (req, res, next) => {
//     const err = new Error('Server error!')
//     err.status = 500;
//     next(err);
// })

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/projects/:id', (req, res) => {
    const project = projects.find(project => project.id === req.params.id)
    if(project) {
    res.render('project', project)
    } else {
        res.redirect('/');
    }
})
app.use((req, res, next) => {
    const err = new Error('Page does not exist!')
    err.status = 404;
    next(err);
} )
app.use((err, req, res, next) => {
    const status = err.status ? err.status : 500;
    const message = err.message ? err.message : "Something went wrong!";
    res.status(status)
    res.send(`${status}: ${message}`)
})


app.listen(3000, () => {
    console.log("App has Started!")
})