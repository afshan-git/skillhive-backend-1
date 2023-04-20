import prisma from "../utils/db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  //we need two try catches for 2 different async functions
  try {
    const user = await prisma.user.create({
      data: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  const isValid = await comparePasswords(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ message: "Password Not Valid" });
    return;
  }
  const token = createJWT(user);
  res.json({ token });
};

export const getUser = async (req, res, next) => {
  //we need two try catches for 2 different async functions
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: user });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};

export const deleteUser = async (req, res, next) => {
  //we need two try catches for 2 different async functions
  try {
    const user = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({ data: user });
  } catch (e) {
    e.type = "input";
    next(e);
  }
};
