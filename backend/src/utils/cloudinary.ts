import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export async function uploadOnCloudinary(uploadFilePath: string | undefined) {
  try {
    if (!uploadFilePath) return "Local file path is not found";
    const response = await cloudinary.uploader.upload(uploadFilePath, {
      resource_type: "auto",
    });
    if (!response) {
      return null;
    }
    fs.unlinkSync(uploadFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload failed", error);
  }
}
