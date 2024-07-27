import { body, validationResult } from "express-validator";

export const userLoginValidator = [
  body("email")
    .isEmail().withMessage("El correo debe ser un email valido")
    .notEmpty().withMessage("El correo es obligatorio"),
  body("password").notEmpty().withMessage("El password es obligatorio"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {


        const formatErrors = errors.array().map( e => ({ msg: e.msg, data: e.path }));

      return res.status(400).json({ status: "error", payload: formatErrors });
    }

    next();
  },
];
