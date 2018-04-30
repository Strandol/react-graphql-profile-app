import { Router } from "express";
import passport from 'passport';

const router = Router();

router.post(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send({
      status: true,
      data: req.user
    });
  }
);

export default router;
