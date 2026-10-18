import express from 'express';
import { doctorsApplication } from '../controllers/users.controller.ts';
import { requireAuth } from '../middlewares/authentication.middlewares.ts';

const usersRouter = express.Router();

usersRouter.post("/users/doctor/doctor-applications/verify", requireAuth, doctorsApplication);

export default usersRouter;