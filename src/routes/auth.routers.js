import { Router } from "express"
import { createUser } from "../controllers/auth.controllers"
//import { validateSchema } from "../middlewares/validateSchema.middleware.js"
//import { validateToken } from "../middlewares/validateToken.middleware.js"
//import { signupSchema } from "../schemas/signup.model.js"
//import { signinSchema } from "../schemas/signin.model.js"



const router = Router()


router.post("/signup", createUser)
//router.post("/signin", validateSchema(signinSchema), userLogin)
//router.get("/users/me", validateToken, userMe)
//router.get("/ranking", rankingUsers)


export default router
