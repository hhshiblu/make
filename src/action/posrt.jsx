import connectToDB from "@/lib/connect";
import {
  savePhotoLocal,
  uploadImages,
  uploadImagesToCloudinary,
} from "@/lib/uploadImage";

export const getcategory = async () => {
  const db = await connectToDB();
  const collection = db.collection("categori");

  const category = await collection.find({}).toArray();
  return category;
};

// export async function imageUpload(formData) {
//   const db = await connectToDB();
//   const collection = db.collection("products");
//   const images = formData.getAll("images");
//   const newFiles = await savePhotoLocal(images);
//   const photos = await uploadImagesToCloudinary(newFiles);
//   newFiles.map((file) => fs.unlink(file.filepath));
//   const newPhotos = photos.map((photo) => {
//     const newphoto = {
//       public_id: photo.public_id,
//       secure_url: photo.secure_url,
//     };
//     return newphoto;
//   });
//   console.log(newPhotos);
// }
