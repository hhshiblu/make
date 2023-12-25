import shortid from "shortid";
import slugify from "slugify";
import SubmitButton from "@/component/sub";
import connectToDB from "@/lib/connect";
import Link from "next/link";
import { revalidatePath } from "next/cache";

const getcategory = async () => {
  const db = await connectToDB();
  const collection = db.collection("categori");

  const category = await collection.find({}).toArray();
  return category;
};

const addCategory = async (FormData) => {
  "use server";
  try {
    const db = await connectToDB();
    const collection = db.collection("categori");

    const name = FormData.get("name");
    const parentId = FormData.get("parentId");

    const categoryObj = {
      name: name,
      slug: `${slugify(name)}-${shortid.generate()}`,
    };
    if (parentId !== "select category") {
      categoryObj.parentId = parentId;
    } else {
      categoryObj.parentId = null;
    }
    const cate = await collection.insertOne(categoryObj);
    console.log(cate);
    if (cate.acknowledged == true) {
      revalidatePath("/add-new");
    }
  } catch (error) {
    return error.message;
  }
};

async function Page() {
  const data = await getcategory();

  return (
    <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
      <Link href="/dynamic/898874erw8e87887"> dynamic</Link>
      <Link href="/"> home</Link>
      <div className="w-[90%] md:w-[60%] min-h-[20vh] bg-white rounded shadow p-5">
        <div className="w-full flex justify-end cursor-pointer">
          {/* <RxCross1 size={25} onClick={() => setConfirm(false)} /> */}
        </div>
        <h3 className="text-[20px] text-center py-5 font-Poppins text-[#000000cb]">
          Add Category
        </h3>

        <form action={addCategory} encType="multipart/form-data">
          <div className="flex  flex-col md:flex-row gap-4">
            <div className="md:w-[50%]">
              <label className="pb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder={`Category Name`}
                required
                className="my-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="md:w-[50%]">
              <label className="pb-2 block">
                Select Parent Category <span className="text-red-500">*</span>
              </label>
              <select
                className="p-[7px] pl-4 rounded-md w-[100%] "
                type="text"
                name="parentId"
              >
                <option>select category</option>
                {data &&
                  data?.map((option, i) => (
                    <option key={i} value={option._id}>
                      {option.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <br />

          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
