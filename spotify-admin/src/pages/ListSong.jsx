import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get(`https://spotify-clone-backend-9nd3.onrender.com/api/song/list`);
      // console.log(response.data);

      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  const removeSong = async (id) => {
    try {
      const response = await axios.post(
        `https://spotify-clone-backend-9nd3.onrender.com/api/song/remove`,
        { id }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        await fetchSongs();
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p className="text-2xl font-[500]">All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[1fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-[20px] mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
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
              <p>{item.album}</p>
              <p>{item.duration}</p>
              <p
                className="text-[25px] cursor-pointer"
                onClick={() => removeSong(item._id)}
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

export default ListSong;
