import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("#121212");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColour", colour);

      const response = await axios.post(
        `https://spotify-clone-backend-9nd3.onrender.com/api/album/add`,
        formData
      );

      // console.log(response);

      if (response.data.success) {
        toast.success("Album Added");

        console.log(response);

        setName("");
        setDesc("");
        setImage(false);
        setColour("#121212");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error occured");
    }

    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh] ">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      className="flex flex-col items-start gap-8 text-gray-600"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4">
        <p className="text-2xl">Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            className="w-[170px] cursor-pointer"
            alt=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="text-[18px]">Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,500px)]"
          type="text"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="text-[18px]">Album Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,500px)]"
          type="text"
          name=""
          id=""
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[18px]">Background color</p>
        <input
          type="color"
          onChange={(e) => setColour(e.target.value)}
          value={colour}
        />
      </div>

      <button
        className="text-[20px] bg-black text-white py-2.5 px-14 cursor-pointer "
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddAlbum;
