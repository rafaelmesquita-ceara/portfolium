const express = require('express');

const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');


const routes = express.Router();
const TechController = require('./controllers/TechController');






// Login
routes.post('/sessions', SessionController.create);


// Users routes
routes.post('/users', UserController.create);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update)

// Project routes
routes.post('/projects', ProjectController.create);
routes.get('/projects', ProjectController.index);
routes.delete('/projects/:id', ProjectController.delete);
routes.put('/projects/:id', ProjectController.update);

// Profile
routes.get('/profile', ProfileController.index);

// Tech
routes.post('/tech', TechController.create);
routes.get('/tech', TechController.index);
routes.delete('/tech/:id', TechController.delete);
routes.put('/tech/:id', (req, res) => TechController.complete(req, res));


module.exports = routes;