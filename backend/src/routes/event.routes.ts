import { Router } from "express";
import {
  createOrganizationEvent,
  getOrganizationEventList,
  getEvent,
  updateEventDetails,
  removeEvent,
} from "../controllers/event.controller.js";

const router = Router();

// Organization events
router.post(
  "/organizations/:organizationId/events",
  createOrganizationEvent
);

router.get(
  "/organizations/:organizationId/events",
  getOrganizationEventList
);

// Single event
router.get(
  "/events/:eventId",
  getEvent
);

router.patch(
  "/events/:eventId",
  updateEventDetails
);

router.delete(
  "/events/:eventId",
  removeEvent
);

export default router;
