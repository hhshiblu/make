import { getcategory } from "@/action/posrt";
import Link from "next/link";
import React from "react";
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
