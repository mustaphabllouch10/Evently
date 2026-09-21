import type { Request, Response } from "express";
import {
  createEvent,
  getEventById,
  getOrganizationEvents,
  updateEvent,
  deleteEvent,
} from "../services/event.service.js";

interface OrganizationParams {
  organizationId: string;
}

interface EventParams {
  eventId: string;
}

export const createOrganizationEvent = async (
  req: Request<OrganizationParams>,
  res: Response
) => {
  try {
    const { organizationId } = req.params;

    const {
      title,
      slug,
      description,
      image,
      location,
      startDate,
      endDate,
    } = req.body;

    if (
      !title ||
      !slug ||
      !location ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message:
          "Title, slug, location, start date and end date are required",
      });
    }

    const event = await createEvent(
      organizationId,
      {
        title,
        slug,
        description,
        image,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      }
    );

    return res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to create event",
    });
  }
};

export const getOrganizationEventList = async (
  req: Request<OrganizationParams>,
  res: Response
) => {
  try {
    const { organizationId } = req.params;

    const events = await getOrganizationEvents(
      organizationId
    );

    return res.status(200).json({
      events,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to get events",
    });
  }
};

export const getEvent = async (
  req: Request<EventParams>,
  res: Response
) => {
  try {
    const { eventId } = req.params;

    const event = await getEventById(eventId);

    return res.status(200).json({
      event,
    });
  } catch (error) {
    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Event not found",
    });
  }
};

export const updateEventDetails = async (
  req: Request<EventParams>,
  res: Response
) => {
  try {
    const { eventId } = req.params;

    const {
      title,
      slug,
      description,
      image,
      location,
      startDate,
      endDate,
      status,
    } = req.body;

    const updateData: {
      title?: string;
      slug?: string;
      description?: string;
      image?: string;
      location?: string;
      startDate?: Date;
      endDate?: Date;
      status?: "draft" | "published" | "cancelled" | "completed";
    } = {};

    if (title !== undefined) {
      updateData.title = title;
    }

    if (slug !== undefined) {
      updateData.slug = slug;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (image !== undefined) {
      updateData.image = image;
    }

    if (location !== undefined) {
      updateData.location = location;
    }

    if (startDate !== undefined) {
      updateData.startDate = new Date(startDate);
    }

    if (endDate !== undefined) {
      updateData.endDate = new Date(endDate);
    }

    if (status !== undefined) {
      updateData.status = status;
    }

    const event = await updateEvent(
      eventId,
      updateData
    );

    return res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error instanceof Error
          ? error.message
          : "Failed to update event",
    });
  }
};


export const removeEvent = async (
  req: Request<EventParams>,
  res: Response
) => {
  try {
    const { eventId } = req.params;

    await deleteEvent(eventId);

    return res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      message:
        error instanceof Error
          ? error.message
          : "Event not found",
    });
  }
};
