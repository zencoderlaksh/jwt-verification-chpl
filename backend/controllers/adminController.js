const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Admin, validateAdmin } = require("../models/adminModel");

// Register an admin
exports.registerAdmin = async (req, res) => {
  try {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, email, password, role } = req.body;

    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).send("Admin already registered.");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the admin
    admin = new Admin({ name, email, password: hashedPassword, role });
    await admin.save();

    res.status(201).send({ message: "Admin registered successfully!" });
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
};

// Login an admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).send("Invalid email or password.");

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).send("Invalid email or password.");

    // Generate JWT
    const token = jwt.sign(
      { _id: admin._id, email: admin.email, role: admin.role },
      "your-secret-key",
      { expiresIn: "1h" }
    );
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
};
