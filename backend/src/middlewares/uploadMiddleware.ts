import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "pathshala", // Stores files inside 'pathshala' folder
      public_id: file.originalname.replace(/\s+/g, "_"), // Removes spaces in filename
      format: file.mimetype.split("/")[1], // Extracts format dynamically
    };
  },
});

const upload = multer({ storage });

export default upload;
