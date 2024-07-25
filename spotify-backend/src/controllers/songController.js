import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    //audioUpload.duration / 60 for minutes

    //audioUpload.duration % 60 for seconds

    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    // console.log(name, desc, album, audioUpload, imageUpload);

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = songModel(songData);

    await song.save();

    res.json({
      success: true,
      message: "Song successfully Added!",
      song,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to add a song!",
    });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});

    res.json({ success: true, songs: allSongs });
  } catch (error) {
    res.json({ success: false, message: "Failed to create a song list!" });
  }
};

// Remove Song
const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Successfully removed the song" });
  } catch (error) {
    res.json({ success: false, message: "Failed to remove the song!" });
  }
};

export { addSong, listSong, removeSong };