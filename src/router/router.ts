import express from "express";
import { Controller } from "../controller/controller";

export const router = express.Router();

router.post('/registration',Controller.registration)
router.post('/login',Controller.login)