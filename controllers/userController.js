const users = require("../models/userModel");

let nextId = 1;

const createUser = (req, res) => {
    const { name, email } = req.body || {};

if (typeof name !== "string" || name.trim() === "") {
  return res.status(400).json({
    message: "Valid name is required"
  });
}
if (typeof email !== "string" || email.trim() === "") {
  return res.status(400).json({
    message: "Valid email is required"
  });
}

const newUser = {
  id: nextId,
  name: name.trim(),
  email: email.trim()
};

nextId++;

users.push(newUser);

return res.status(201).json(newUser);

};

const getAllUsers = (req, res) => {
  return res.status(200).json(users);
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid user ID"
    });
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return res.status(200).json(users[i]);
    }
  }

  return res.status(404).json({
    message: "User not found"
  });
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name, email } = req.body || {};

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid user ID"
    });
  }

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof email !== "string" ||
    email.trim() === ""
  ) {
    return res.status(400).json({
      message: "Valid name and email are required"
    });
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users[i].name = name.trim();
      users[i].email = email.trim();

      return res.status(200).json(users[i]);
    }
  }

  return res.status(404).json({
    message: "User not found"
  });
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "Invalid user ID"
    });
  }

  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);

      return res.status(200).json({
        message: "User deleted successfully"
      });
    }
  }

  return res.status(404).json({
    message: "User not found"
  });
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };