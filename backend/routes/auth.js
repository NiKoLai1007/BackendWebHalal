import express from 'express';
import { 
    signup, 
    login, 
    testController 
} from '../controllers/authController.js';
import { requireSignin, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/register', signup);

router.post('/login', login);

router.get('/test', requireSignin, isAdmin, testController);

export default router;