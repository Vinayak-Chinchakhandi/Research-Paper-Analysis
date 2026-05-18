import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import pool from "../db/db.js";

/* REGISTER */
export const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    /* Check existing user */
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {

      return res.status(400).json({
        message: "User already exists",
      });
    }

    /* Hash password */
    const hashedPassword =
      await bcrypt.hash(password, 10);

    /* Insert user */
    const result = await pool.query(
      `
      INSERT INTO users
      (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
      `,
      [name, email, hashedPassword]
    );

    const user = result.rows[0];

    /* JWT token */
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};

/* LOGIN */
export const loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    /* Find user */
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {

      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    /* Compare password */
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    /* Generate JWT */
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Login failed",
    });
  }
};