const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer')

const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');
const UploadController = require('./controllers/UploadController');
const RatingController = require('./controllers/RatingController');

const routes = express.Router();
const TechController = require('./controllers/TechController');

const verifyJWT = require('./services/verifyJWT');

// Login
routes.post('/sessions', SessionController.create);


// Users routes
routes.post('/users', UserController.create);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update)

// Project routes
routes.post('/projects', verifyJWT, ProjectController.create);
routes.get('/projects', ProjectController.index);
routes.delete('/projects/:id', verifyJWT, ProjectController.delete);
routes.put('/projects/:id', verifyJWT, ProjectController.update);
routes.get('/projectsToggle/:id', verifyJWT, ProjectController.togglePublic);

// Profile
routes.get('/profile', verifyJWT, ProfileController.index);
routes.get('/profile/project/:id', verifyJWT, ProfileController.indexOne);

// Tech
routes.post('/tech', verifyJWT, TechController.create);
routes.get('/tech', TechController.index);
routes.delete('/tech/:id', verifyJWT, TechController.delete);
routes.put('/tech/:id', verifyJWT, (req, res) => TechController.complete(req, res));

// Archives
routes.post('/postImageVideo', verifyJWT, multer(multerConfig).single("file"), UploadController.create)
routes.get('/postImageVideo', UploadController.list)
routes.delete('/postImageVideo/:id', verifyJWT, UploadController.delete)

// Ratings
routes.post('/rating', RatingController.create)
routes.get('/rating', RatingController.index)
routes.delete('/rating/:id', RatingController.delete)


module.exports = routes;