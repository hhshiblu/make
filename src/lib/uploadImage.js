"use server";

import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import os from "os";

import cloudinary from "cloudinary";

export async function savePhotoLocal(formData) {
  const multibuffer = formData.map((file) =>
    file.arrayBuffer().then((data) => {
      const buffer = Buffer.from(data);
      const name = uuidv4();
      const ext = file.type.split("/")[1];
      const tempdir = os.tmpdir();

      const uploadDir = path.join(tempdir, `/${name}.${ext}`);

      fs.writeFile(uploadDir, buffer);
      return { filepath: uploadDir, filename: file.name };
    })
  );
  return await Promise.all(multibuffer);
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export async function uploadImagesToCloudinary(newFiles) {
  const multiplePhotos = newFiles.map((file) =>
    cloudinary.v2.uploader.upload(file.filepath, { folder: "rajdhola" })
  );
  return await Promise.all(multiplePhotos);
}

export async function deleteImagesFromCloudinary() {}
