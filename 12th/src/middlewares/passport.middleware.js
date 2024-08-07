import { request, response } from "express";
import passport from "passport";
import { Strategy } from "passport-local";

export const passportCall = (Strategy) => {
  return async (req = request, res = response, next) => {
    passport.authenticate(Strategy, { session: false }, (error, user, info) => {
      if (error) return next(error);
      if (!user)
        return res
          .status(401)
          .json({
            status: "error",
            msg: info.message ? info.message : info.toString(),
          });

      req.user = user;

      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req = request, res = response, next) => {
    if (!req.user)
      return res.status(401).json({ status: "error", msg: "Unauthorized" });
    if (req.user.role !== role)
      return res
        .status(401)
        .json({ status: "error", msg: "Unauthorized user" });

    next();
  };
};
