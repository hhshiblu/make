import connectToDB from "@/lib/connect";
import React from "react";
const getcategory = async () => {
  const db = await connectToDB();
  const collection = db.collection("categori");

  const category = await collection.find({}).toArray();
  return category;
};
async function page({ id }) {
  const data = await getcategory();
  return <div>{id}</div>;
}

export default page;
