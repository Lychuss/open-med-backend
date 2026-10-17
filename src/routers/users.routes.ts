import express from 'express';
import { getDoctors } from '../controllers/users.controller.ts';
import { requireAuth } from '../middlewares/authentication.middlewares.ts';

const usersRouter = express.Router();

usersRouter.get("doctors/:expertiseTitle/", requireAuth, getDoctors);

export default usersRouter;