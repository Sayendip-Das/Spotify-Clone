import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/album/list`);

      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/album/remove`,
        { id }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p className="text-2xl font-[500]">All Album List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[1fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-[20px] mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action</b>
        </div>

        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-[20px] mr-5"
            >
              <img src={item.image} className="w-[180px]" alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" name="" id="" value={item.bgColour} />
              <p
                onClick={() => removeAlbum(item._id)}
                className="text-[25px] cursor-pointer"
              >
                <MdDelete />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAlbum;
