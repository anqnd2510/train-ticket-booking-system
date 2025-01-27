const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /auths/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with email and password, then return an access token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 example: yourpassword
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       400:
 *         description: Invalid email or password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid email or password.
 */
router.post("/login", authController.loginAccount);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user account
 *     description: Creates a new user account with a unique username and email. Returns an access token upon successful registration.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *                 description: Unique username for the account.
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *                 description: Unique email address for the account.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPassword123
 *                 description: Password for the account (minimum 6 characters).
 *               phoneNumbers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["123456789", "987654321"]
 *                 description: Optional array of phone numbers.
 *               address:
 *                 type: string
 *                 example: "123 Main Street, Springfield"
 *                 description: Optional address of the user.
 *     responses:
 *       201:
 *         description: Account created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: "Account created successfully"
 *       400:
 *         description: Bad Request. Possible errors include duplicate email or username.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Email is already registered."
 */

router.post("/register", authController.registerAccount);
module.exports = router;
