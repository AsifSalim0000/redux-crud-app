import express from 'express';
const router = express.Router();
import {
  authAdmin,
  createUser,
  updateUser,
  deleteUser,
  listUsers
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/auth', authAdmin);
router.get('/users', protect, admin, listUsers);
router.post('/users', protect, admin, createUser);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);

export default router;
