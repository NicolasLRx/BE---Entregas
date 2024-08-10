import { createToken } from "../utils/jwt.js";

const register = async (req, res) => {
  try {
    res.status(201).json({ status: "success", msg: "Usuario Creado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const user = req.user;
    const token = createToken(user);

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({ status: "success", payload: user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const loginGoogle = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const current = async (req, res) => {
  try {
    return res.status(200).json({ status: "success", payload: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy();

    res.status(200).json({ status: "success", payload: "Sesion cerrada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Internal Server Error" });
  }
};

export default {
  register,
  login,
  loginGoogle,
  current,
  logout,
};
