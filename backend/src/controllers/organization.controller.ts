import type { Request, Response } from "express";

import {
    createOrganization ,
    getOrganizations,
    getMyOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization ,
    addMember , 
    removeMember
 } from "../services/organization.service.js";

export const createOrganizationController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const organization = await createOrganization(
      req.body,
      userId
    );

    res.status(201).json({
      message: "Organization created successfully",
      organization,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create organization",
    });
  }
};

export const getOrganizationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const organizations = await getOrganizations();
    res.status(200).json({
      message: "Organizations retrieved successfully",
      organizations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve organizations",
    });
  }
};

export const getMyOrganizationsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.userId;
    const organizations = await getMyOrganizations(userId as string);

    res.status(200).json({
      message: "My organizations retrieved successfully",
      organizations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve my organizations",
    });
  }
};


export const getOrganizationByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const organization = await getOrganizationById(req.params.id as string);
    return res.status(200).json({
      message: "Organization retrieved successfully",
      organization,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to retrieve organization",
    });
  }
};

export const updateOrganizationController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.userId;
    const organization = await updateOrganization(
      userId as string,
      req.body 
    );

    res.status(200).json({
      message: "Organization updated successfully",
      organization,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update organization",
    });
  }
};

export const deleteOrganizationController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.userId;
    const organization = await deleteOrganization(
      userId as string
    );

    res.status(200).json({
      message: "Organization deleted successfully",
      organization,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete organization",
    });
  }
};

export const addMemberController = async ( 
    req:Request ,
    res:Response
    ) => {
        try {
            const userId = req.user?.userId ;
            const { organizationId } = req.params ;

            const newMember = await addMember( organizationId as string , userId as string ) ;
            
            res.status(200).json({
                message: "Member added successfully",
                newMember,
            });

        } catch(error) {

            console.error(error);

            res.status(500).json({
            message: "Failed to add Member",
            });

        }
    }


export const removeMemberController = async ( 
    req:Request , 
    res:Response
) => {

        try {
            const userId = req.user?.userId ;
            const { organizationId } = req.params ;

            const newMember = await removeMember( organizationId as string , userId as string ) ;
            
            res.status(200).json({
                message: "Member removed successfully",
                newMember,
            });

        } catch(error) {

            console.error(error);

            res.status(500).json({
            message: "Failed to remove Member",
            });

        }

}


