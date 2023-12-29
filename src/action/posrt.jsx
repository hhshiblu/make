import connectToDB from "@/lib/connect";

export const getcategory = async () => {
  const db = await connectToDB();
  const collection = db.collection("categori");

  const category = await collection.find({}).toArray();
  return category;
};
