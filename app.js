const express = require('express');
const { projects } = require('./data.json');
const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));

app.get('/', (req, res) =>{
    res.render('index', { projects });
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
        res.render('project', { project })
    } else {
        res.status(404).send("404 Page not Found!");
    }
})

//404 error handler
app.use((req, res) => {
    res.status(404).send("404 Page not Found!");

} )

// General error handler
app.use((err, req, res, next) => {
    const status = err.status ? err.status : 500;
    const message = err.message ? err.message : "Something went wrong!";
    res.status(status)
    res.send(`${status}: ${message}`)
})


app.listen(3000, () => {
    console.log("App has Started!")
})