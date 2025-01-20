const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, validateUser } = require("../models/userModel");

// Register a user
exports.registerUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already registered.");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT token after user creation
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET, // Use secret key from environment variables
      { expiresIn: "1h" }
    );

    res.status(201).send({
      message: "User registered successfully!",
      token, // Send the token as part of the response
    });
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid email or password.");

    // Generate JWT token
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET, // Use secret key from environment variables
      { expiresIn: "1h" }
    );

    res.status(200).send({ token }); // Return the token in the response
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
};
