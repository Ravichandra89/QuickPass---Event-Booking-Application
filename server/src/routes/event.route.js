import { Router } from "express";
import {getAllEvents , getFilteredEvents , getEventById ,createEvent,updateEventById,deleteEvent} from '../controllers/event.controller.js'

const router = Router();

router.post("/create",createEvent);
router.delete('/delete',deleteEvent);

export default router;