const express = require("express");
const router = express.Router();

const accountController = require("../controllers/account.controller");
const authMiddleware = require("../middlewares/auth.middleware");
/**
 * @swagger
 * /accounts/profile:
 *   get:
 *     summary: Get authenticated user's profile
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d0fe4f5311236168a109ca
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
router.get(
  "/profile",
  authMiddleware.auth,
  accountController.getAccountProfile
);

module.exports = router;
