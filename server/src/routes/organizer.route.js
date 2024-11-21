import { Router } from 'express';
import { createEvent, editEvent } from '../controllers/organizer.controller.js';

const router = Router();

router.post('/event', createEvent);
router.put('/event', editEvent);

export default router;
