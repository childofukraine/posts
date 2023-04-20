import express from "express";
import { Controller } from "../controller/controller";

export const router = express.Router();

router.post("/registration", Controller.registration);
router.post("/login", Controller.login);
router.post("/create-post", Controller.createPost);
router.get("/posts", Controller.posts);
router.post("/create-comment", Controller.createComment);
router.get("/post/:postId", Controller.postById);
router.post("/like", Controller.like);
router.post("/dislike", Controller.dislike);
