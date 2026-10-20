import express from 'express';
import { doctorsApplicationController, findExpertDoctorsController } from '../controllers/users.controller.ts';
import { requireAuth } from '../middlewares/authentication.middlewares.ts';

const usersRouter = express.Router();

usersRouter.post("/users/doctor/doctor-applications/verify", requireAuth, doctorsApplicationController);
usersRouter.post("/users/doctor/category/:expertise", requireAuth, findExpertDoctorsController);

export default usersRouter;