import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lms/videos",
    resource_type: "video",
  } as any,
});

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "lms/thumbnails",
    resource_type: "image",
  } as any,
});

export const uploadLessonAssets = multer({
  storage: multer.diskStorage({}),
});
