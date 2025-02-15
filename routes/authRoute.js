import express from "express";
import {
  allOrderController,
  allUserController,
  forgotPasswordController,
  gettokenController,
  loginController,
  orderController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// routes object

const router = express.Router();

// routing

router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);
router.post("/login", loginController);
router.get("/test", requireSignIn, isAdmin, testController);
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/get-token", gettokenController);

router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/order", requireSignIn, orderController);

//get all orders

router.get("/all-order", requireSignIn, isAdmin, allOrderController);

router.get("/all-user", requireSignIn, isAdmin, allUserController);

//  update order status

router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
