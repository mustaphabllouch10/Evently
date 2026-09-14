import Organization from "../models/organization.js";
import type {
  CreateOrganizationInput,
  UpdateOrganizationInput,
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

export const getOrganizations = async () => {
  const organizations = await Organization.find();
  return organizations;
};

export const getMyOrganizations = async (userId: string) => {
  const organizations = await Organization.find({
    members: userId,
  });   
  return organizations;
};

export const getOrganizationById = async (id: string) => {
  const organization = await Organization.findById(id); 
  return organization;
};

export const updateOrganization = async (
  id: string,
  data: Partial<UpdateOrganizationInput>
) => {
  const organization = await Organization.findByIdAndUpdate(id, data, {
    new: true,
  });
  return organization;
};

export const deleteOrganization = async (id: string) => {
  const organization = await Organization.findByIdAndDelete(id);
  return organization;
}
