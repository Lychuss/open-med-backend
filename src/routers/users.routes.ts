import express from 'express';
import { getDoctors } from '../controllers/users.controller';
import { requireAuth } from '../middlewares/authentication.middlewares';

const usersRouter = express.Router();

usersRouter.get("doctors/:expertiseTitle/", requireAuth, getDoctors);

export default usersRouter;