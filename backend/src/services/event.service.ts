import Event from "../models/event.js";

export const createEvent = async (
  organizationId: string,
  data: {
    title: string;
    slug: string;
    description?: string;
    image?: string;
    location: string;
    startDate: Date;
    endDate: Date;
  }
) => {
  if (data.startDate >= data.endDate) {
    throw new Error("Start date must be before end date");
  }

  const existingEvent = await Event.findOne({
    organization: organizationId,
    slug: data.slug,
  });

  if (existingEvent) {
    throw new Error("An event with this slug already exists");
  }

  const event = await Event.create({
    organization: organizationId,
    ...data,
  });

  return event;
};

export const getEventById = async (eventId: string) => {
  const event = await Event.findById(eventId)
    .populate("organization", "name slug");

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};

export const getOrganizationEvents = async (
  organizationId: string
) => {
  const events = await Event.find({
    organization: organizationId,
  }).sort({
    startDate: 1,
  });

  return events;
};

export const updateEvent = async (
  eventId: string,
  data: {
    title?: string;
    slug?: string;
    description?: string;
    image?: string;
    location?: string;
    startDate?: Date;
    endDate?: Date;
    status?: "draft" | "published" | "cancelled" | "completed";
  }
) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  const startDate = data.startDate ?? event.startDate;
  const endDate = data.endDate ?? event.endDate;

  if (startDate >= endDate) {
    throw new Error("Start date must be before end date");
  }

  if (data.slug && data.slug !== event.slug) {
    const existingEvent = await Event.findOne({
      organization: event.organization,
      slug: data.slug,
      _id: { $ne: eventId },
    });

    if (existingEvent) {
      throw new Error("An event with this slug already exists");
    }
  }

  Object.assign(event, data);

  await event.save();

  return event;
};

export const deleteEvent = async (eventId: string) => {
  const event = await Event.findByIdAndDelete(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};
