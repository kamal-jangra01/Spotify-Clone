import { v2 as cloudinary } from "cloudinary";
import album from "../models/album.model.js";

const addAlbum = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const bgColour = req.body.bgColour;
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
      folder: `${process.env.CLOUDINARY_FOLDER}/albums`,
    });

    const albumData = {
      name,
      desc,
      bgColour,
      image: imageUpload.secure_url,
    };

    const newAlbum = new album(albumData);
    await newAlbum.save();

    res.json({ success: true, message: "album added" });
  } catch (error) {
    res.json({ success: false });
  }
};

const listAlbum = async (req, res) => {
  try {
    const allAlbums = await album.find({});
    res.json({ success: true, albums: allAlbums });
  } catch (error) {
    res.json({ success: false });
  }
};

const removeAlbum = async (req, res) => {
  try {
    await album.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "album removed" });
  } catch (error) {
    res.json({ success: false });
  }
};

export { addAlbum, listAlbum, removeAlbum };
