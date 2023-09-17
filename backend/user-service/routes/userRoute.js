const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const {
  validateUser,
  validateNewPassword,
} = require("../middleware/userValidator");
const authenticateJwt = require("../middleware/authenticateJwt");

userRouter.post("/register", validateUser(), userController.createUser);

userRouter.post("/login", userController.loginUser);

userRouter.get("/verifytoken", authenticateJwt, userController.success);

userRouter.put(
  "/update/password",
  authenticateJwt,
  validateNewPassword(),
  userController.updatePassword
);

userRouter.delete("/deregister", authenticateJwt, userController.deleteUser);

module.exports = userRouter;
