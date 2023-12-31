import Image from "next/image";
import React from "react";

function Photocard({ url, onClick }) {
  return (
    <div className=" relative">
      <Image
        src={url}
        alt="images"
        width={60}
        height={60}
        priority
        className="h-[60px] w-[60px] object-cover m-2 mt-4 rounded-sm"
      />
      <div className=" absolute top-2 right-2 cursor-pointer text-white">
        <h2 onClick={onClick}>h</h2>
      </div>
    </div>
  );
}

export default Photocard;
