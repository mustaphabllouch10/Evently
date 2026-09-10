import Organization from "../models/organization.js";
import type {
  CreateOrganizationInput,
} from "../types/organization.types.js";

export const createOrganization = async (
  data: CreateOrganizationInput,
  userId: string
) => {
  const organization = await Organization.create({
    name: data.name,
    slug: data.name.toLowerCase().replace(/\s+/g, "-"),
    owner: userId,
    members: [userId],
  });

  return organization;
};