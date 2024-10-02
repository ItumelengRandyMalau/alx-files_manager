import express from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';

const router = express.Router();

// Route to get the status of Redis and MongoDB clients
router.get('/status', AppController.getStatus);

// Route to get the statistics of the application
router.get('/stats', AppController.getStat);

// Route to create a new user
router.post('/users', AppController.createUser);

// Route to find a user by email
router.get('/users', AppController.findUser);

// Route to Authenticate user with token
router.get('/connect', AuthController.getConnect);

// Route to Logout or disconnect User by token
router.get('/disconnect', AuthController.getDisconnect);

// Route to get User
router.get('/users/me', UsersController.getMe);

// Route to post files
router.post('/files', FilesController.postUpload);

export default (app) => {
  // Use the defined routes in the express application
  app.use('/', router);
};
