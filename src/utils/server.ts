import express from "express";
import morgan from "morgan";
import router from "./routes";
import { protect } from "../modules/auth";
import { createNewUser, signin } from "../handlers/users";
import { body } from "express-validator";
import { handleInputErrors } from "../modules/middlewares";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hola" });
});

app.use("/api", protect, router);

app.use(
  "/signup",
  body("firstname").isString(),
  body("lastname").isString(),
  body("email").isString().isEmail(),
  body("password").isString(),
  handleInputErrors,
  createNewUser
);
app.post(
  "/login",
  body("email").isString().isEmail(),
  body("password").isString(),
  handleInputErrors,
  signin
);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.type === "input") {
    res.status(401).json({ message: `invalid inputsss ${err}` });
  } else {
    res.status(500).json({ message: "Some errors", err });
  }
});

export default app;
