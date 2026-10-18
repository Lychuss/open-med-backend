import express from "express";
import { requireAuth } from "../middlewares/authentication.middlewares.ts";
import { approvedDoctorController, rejectedDoctorController } from "../controllers/admin.controller.ts";

const adminRouter = express.Router();

adminRouter.put("/admin/doctors/status/:applicationId/approved", requireAuth, approvedDoctorController);
adminRouter.put("/admin/doctors/status/:applicationId/rejected", requireAuth, rejectedDoctorController);

export default adminRouter;
