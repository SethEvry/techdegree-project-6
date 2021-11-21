const express = require("express");
const { projects } = require("./data.json");
const app = express();

app.set("view engine", "pug");

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
	res.render("index", {
		projects,
	});
});

// error test route
//
app.get('/error', (req, res, next) => {
    const err = new Error('Server error!')
    err.status = 500;
    next(err);
})

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/projects/:id", (req, res, next) => {
	const project = projects.find((project) => project.id === req.params.id);
	if (project) {
		res.render("project", {
			project,
		});
	} else {
		const err = new Error();
		err.status = 404;
		err.message = "Sorry, that project does not exist.";
		next(err);
	}
});

//404 error handler
app.use((req, res, next) => {
	console.log("404 error handler engaged");
    res.status(404).render("page-not-found")
});

// General error handler
app.use((err, req, res, next) => {
	if (err.status === 404) {
		console.log("404 error handler engaged");
		res.status(404).render("page-not-found", { err });
	} else {
		console.log("General error handler engaged")
		err.status = err.status ? err.status : 500;
		err.message = err.message ? err.message : "Something went wrong!";
		res.status(err.status);
		res.render("error", {
			err,
		});
	}
});

app.listen(3000, () => {
	console.log("App has Started!");
});
