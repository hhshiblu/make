import connectToDB from "@/lib/connect";
import { ObjectId } from "mongodb";
import React from "react";
const getsingle = async (id) => {
  const db = await connectToDB();
  const collection = db.collection("categori");

  const singleOrder = await collection.findOne({ _id: new ObjectId(id) });
  return singleOrder;
};
async function page({ params }) {
  const data = await getsingle(params.id);
  return <div>{data.name}</div>;
}

export default page;
