import connectToDB from "@/lib/connect";
import Link from "next/link";
import React from "react";

const getcategory = async () => {
  const db = await connectToDB();
  const collection = db.collection("categori");

  const category = await collection.find({}).toArray();
  return category;
};
export const dynamic = "force-dynamic";

async function Page() {
  const data = await getcategory();
  return (
    <div>
      {data &&
        data.map((option, i) => (
          <div key={i}>
            <Link href={`/dynamic/${option._id}`}>{option.name}</Link>
          </div>
        ))}
    </div>
  );
}

export default Page;
