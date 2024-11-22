import { Router } from 'express';
import { changeSeatInventory, createEvent, editEvent } from '../controllers/organizer.controller.js';

const router = Router();

router.post('/events', createEvent);
router.put('/events/:eventId', editEvent);
router.put('/events/inventory/:eventId', changeSeatInventory);

export default router;
