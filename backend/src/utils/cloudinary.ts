import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export type ResourceType = "auto" | "video" | "image" | "raw";

export async function uploadOnCloudinary(
  uploadFilePath: string | undefined,
  resourceType: ResourceType,
) {
  if (!uploadFilePath) {
    throw new Error("Local file path is required");
  }

  try {
    const response = await cloudinary.uploader.upload(uploadFilePath, {
      resource_type: resourceType,
    });

    fs.unlink(uploadFilePath, (err) => {
      if (err) {
        console.warn(
          `Failed to delete temp file ${uploadFilePath}:`,
          err.message,
        );
      }
    });

    return response;
  } catch (error) {
    fs.unlink(uploadFilePath, (err) => {
      if (err) {
        console.warn(
          `Failed to delete temp file after error ${uploadFilePath}:`,
          err.message,
        );
      }
    });

    console.error("Cloudinary upload failed:", error);
    throw error;
  }
}
