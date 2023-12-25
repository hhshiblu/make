import connectToDB from "@/lib/connect";
import React from "react";
const getcategory = async () => {
  const db = await connectToDB();
  const collection = db.collection("categori");

  const category = await collection.find({}).toArray();
  return category;
};
async function page() {
  const data = await getcategory();
  return (
    <div>
      {data &&
        data?.map((option, i) => (
          <option key={i} value={option._id}>
            {option.name}
          </option>
        ))}
    </div>
  );
}

export default page;
