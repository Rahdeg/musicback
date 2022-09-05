const { Album } = require("../models/album.model");

exports.addAlbum = async function (req, res) {
  const data = req.body;
  try {
    const album = new Album(data);
    album.save();
    return res.status(201).json(album);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error });
  }
};

exports.getAlbums = async function (req, res) {
  try {
    const option={
      sort:{
        createdAt:1,
      },
    }
    data = await Album.find(option);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error });
  }
};

exports.getAlbum = async function (req, res) {
  try {
    const data = await Album.findById({_id:req.params.id});
    if (!data) {
      return res.status(404).json({ msg: "Not Found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
    if (error.name == "CastError") {
      return res.status(400).json(error.message);
    }
    return res.status(500).json(error);
  }
};

exports.deleteAlbum = async function (req, res) {
  try {
    const album = await Album.findByIdAndDelete({_id:req.params.id});
    if (!album) {
      return res
        .status(404)
        .json({ msg: `No album with id ${req.params.id}` });
    } else {
      return res
        .status(200)
        .json({ msg: "album Deleted Successfully", data: null });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateAlbum= async (req,res)=>{
  const data = req.body;
 Album.findByIdAndUpdate(req.params.id,data ,{new:true}, (err, data)=>{
     if (data) {
         return  res.status(200).send({success:true, album:data}); 
     }
     if (err) {
         return  res.status(400).send({success:false, msg:'data not found'});
     }
 })

}