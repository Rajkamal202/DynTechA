import express from "express"
import { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } from "../controllers/userController"
import auth from "../middleware/auth"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", auth, getUsers)
router.get("/:id", auth, getUserById)
router.put("/:id", auth, updateUser)
router.delete("/:id", auth, deleteUser)

export default router

