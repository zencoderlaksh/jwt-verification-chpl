const mongoose = require("mongoose");
const Joi = require("joi");

// Define Admin schema
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: "admin",
    enum: ["admin", "superadmin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Admin model
const Admin = mongoose.model("Admin", adminSchema);

// Validation schema using Joi
const validateAdmin = (admin) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "superadmin").optional(),
  });
  return schema.validate(admin);
};

module.exports = { Admin, validateAdmin };
