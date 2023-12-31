"use client";
import React, { useState } from "react";
import SubmitButton from "./button";
import Photocard from "./photocard";

function page() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const newFiles = [...files].filter((file) => {
      if (file.size < 1024 * 1024 && file.type.startsWith("image/")) {
        return file;
      }
    });
    setImages((prev) => [...newFiles, ...prev]);
  };

  async function handelDeleteFile(index) {
    const newFiles = images.filter((_, i) => i !== index);
    setImages(newFiles);
  }

  const HandelSubmit = async () => {
    if (images.length > 5) return alert("upload up to 5 image files");

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    let res = await imageUpload(newForm);
  };

  return (
    <div>
      <form action={HandelSubmit}>
        <hr />
        <br />

        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((files, index) => (
                <Photocard
                  key={index}
                  url={URL.createObjectURL(files)}
                  onClick={() => handelDeleteFile(index)}
                />
              ))}
          </div>
          <br />
          <div>
            <SubmitButton />
          </div>
        </div>
      </form>
    </div>
  );
}

export default page;
